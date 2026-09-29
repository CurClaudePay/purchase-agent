import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { createHandler } from '../src/app.js';
import { MockBankAccountProvider } from '../src/bank-accounts.js';
import { ConsentStore } from '../src/consents.js';
import { MockFingerprintVerifier } from '../src/fingerprint.js';

const root = fileURLToPath(new URL('..', import.meta.url));
let server;
let base;

before(async () => {
  const provider = new MockBankAccountProvider(`${root}data/linked-bank-accounts.json`);
  const consents = new ConsentStore({ provider, verifier: new MockFingerprintVerifier() });
  server = createServer(createHandler({ provider, consents, publicDir: `${root}public` }));
  await new Promise((resolve) => server.listen(0, resolve));
  base = `http://localhost:${server.address().port}`;
});

after(() => server.close());

test('GET /api/wallet returns both linked accounts and their total', async () => {
  const res = await fetch(`${base}/api/wallet`);
  assert.equal(res.status, 200);
  const wallet = await res.json();
  assert.equal(wallet.accounts.length, 2);
  assert.ok(wallet.accounts.every((a) => a.balance.currency === 'EUR'));
  assert.deepEqual(wallet.total, { amount: '5631.15', currency: 'EUR' });
});

test('GET /api/accounts/:id returns one account or 404', async () => {
  const ok = await fetch(`${base}/api/accounts/bank-acc-002`);
  assert.equal(ok.status, 200);
  assert.equal((await ok.json()).balance.amount, '4380.75');
  assert.equal((await fetch(`${base}/api/accounts/nope`)).status, 404);
});

test('serves the UI and refuses path traversal', async () => {
  const page = await fetch(`${base}/`);
  assert.equal(page.status, 200);
  assert.match(await page.text(), /Linked bank accounts/);
  assert.equal((await fetch(`${base}/..%2Fdata%2Flinked-bank-accounts.json`)).status, 404);
});

const post = (path, body) =>
  fetch(`${base}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

const consentRequest = (amount = '19.95') => ({
  type: 'single-immediate-payment',
  merchant: { id: 'merchant-001', shopName: 'Fictional Office Coffee Supplies' },
  amount: { amount, currency: 'EUR' },
  authenticationMethod: 'fingerprint',
});

const fingerprint = { method: 'fingerprint', result: 'match' };

test('POST /consent creates a consent awaiting fingerprint authentication', async () => {
  const res = await post('/consent', consentRequest());
  assert.equal(res.status, 201);
  const consent = await res.json();
  assert.equal(consent.status, 'awaiting_authentication');
  assert.equal(consent.merchant.shopName, 'Fictional Office Coffee Supplies');

  const pending = await (await fetch(`${base}/consent?status=awaiting_authentication`)).json();
  assert.ok(pending.some((c) => c.id === consent.id));
});

test('POST /consent rejects invalid requests', async () => {
  assert.equal((await post('/consent', { ...consentRequest(), amount: { amount: '0', currency: 'EUR' } })).status, 400);
  assert.equal((await post('/consent', { ...consentRequest(), merchant: { shopName: ' ' } })).status, 400);
  assert.equal((await post('/consent', { ...consentRequest(), authenticationMethod: 'pin' })).status, 422);
  const badJson = await fetch(`${base}/consent`, { method: 'POST', body: '{' });
  assert.equal(badJson.status, 400);
});

test('authorising with a fingerprint records the chosen account once', async () => {
  const { id } = await (await post('/consent', consentRequest())).json();
  const res = await post(`/consent/${id}/authorise`, { accountId: 'bank-acc-002', authentication: fingerprint });
  assert.equal(res.status, 200);
  const consent = await res.json();
  assert.equal(consent.status, 'authorised');
  assert.equal(consent.debtorAccountId, 'bank-acc-002');

  const again = await post(`/consent/${id}/authorise`, { accountId: 'bank-acc-002', authentication: fingerprint });
  assert.equal(again.status, 409);
});

test('authorisation fails without a fingerprint match, unknown account or enough balance', async () => {
  const { id } = await (await post('/consent', consentRequest('2000.00'))).json();
  const noMatch = await post(`/consent/${id}/authorise`, {
    accountId: 'bank-acc-002',
    authentication: { method: 'fingerprint', result: 'no_match' },
  });
  assert.equal(noMatch.status, 401);
  assert.equal((await post(`/consent/${id}/authorise`, { accountId: 'nope', authentication: fingerprint })).status, 400);
  const tooLow = await post(`/consent/${id}/authorise`, { accountId: 'bank-acc-001', authentication: fingerprint });
  assert.equal(tooLow.status, 422);
  const consent = await (await fetch(`${base}/consent/${id}`)).json();
  assert.equal(consent.status, 'awaiting_authentication');
});

test('a consent can be rejected, and unknown consents return 404', async () => {
  const { id } = await (await post('/consent', consentRequest())).json();
  assert.equal((await (await post(`/consent/${id}/reject`, {})).json()).status, 'rejected');
  assert.equal((await fetch(`${base}/consent/consent-unknown`)).status, 404);
});
