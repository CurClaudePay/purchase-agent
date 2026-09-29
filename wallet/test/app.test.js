import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { createHandler } from '../src/app.js';
import { MockBankAccountProvider } from '../src/bank-accounts.js';

const root = fileURLToPath(new URL('..', import.meta.url));
let server;
let base;

before(async () => {
  const provider = new MockBankAccountProvider(`${root}data/linked-bank-accounts.json`);
  server = createServer(createHandler({ provider, publicDir: `${root}public` }));
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
