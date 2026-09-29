import { format, toCents } from './money-format.js';

const HOLD_MS = 900;
const consentId = new URLSearchParams(location.search).get('consent');
const $ = (id) => document.getElementById(id);

// Stand-in for the device fingerprint sensor. A real wallet app would ask the
// platform authenticator here; the sandbox reports a simulated match.
const fingerprintSensor = {
  async scan() {
    return { method: 'fingerprint', result: 'match' };
  },
};

function showError(message) {
  $('error').textContent = message;
  $('error').hidden = false;
}

function showResult(title, detail) {
  $('consent-form').hidden = true;
  $('result-title').textContent = title;
  $('result-detail').textContent = detail;
  $('result').hidden = false;
}

async function api(path, options) {
  const res = await fetch(path, options);
  const body = await res.json();
  if (!res.ok) throw new Error(body.error ?? `HTTP ${res.status}`);
  return body;
}

const post = (path, body) =>
  api(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body ?? {}) });

function renderAccounts(accounts, consent) {
  const needed = toCents(consent.amount.amount);
  let firstEligible = null;
  const options = accounts.map((account) => {
    const enough = account.balance.currency === consent.amount.currency && toCents(account.balance.amount) >= needed;
    const label = document.createElement('label');
    label.className = 'account selectable';
    label.innerHTML = `
      <input type="radio" name="account">
      <span class="info">
        <span class="name"></span>
        <span class="iban"></span>
        <span class="warning" hidden>Insufficient balance</span>
      </span>
      <span class="balance"></span>`;
    const input = label.querySelector('input');
    input.value = account.id;
    input.disabled = !enough;
    label.querySelector('.name').textContent = `${account.label} · ${account.bankName}`;
    label.querySelector('.iban').textContent = account.iban;
    label.querySelector('.balance').textContent = format(account.balance);
    label.querySelector('.warning').hidden = enough;
    if (enough && !firstEligible) firstEligible = input;
    return label;
  });
  $('accounts').replaceChildren(...options);
  if (firstEligible) firstEligible.checked = true;
  return Boolean(firstEligible);
}

function setupSensor(onConfirmed) {
  const sensor = $('fingerprint');
  let timer = null;
  const stop = () => {
    clearTimeout(timer);
    sensor.classList.remove('holding');
  };
  const start = (event) => {
    event.preventDefault();
    if (sensor.disabled) return;
    sensor.classList.add('holding');
    timer = setTimeout(() => {
      stop();
      onConfirmed();
    }, HOLD_MS);
  };
  sensor.addEventListener('pointerdown', start);
  ['pointerup', 'pointerleave', 'pointercancel'].forEach((e) => sensor.addEventListener(e, stop));
  // Keyboard users hold Space or Enter.
  sensor.addEventListener('keydown', (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) start(e);
  });
  sensor.addEventListener('keyup', stop);
}

async function init() {
  if (!consentId) return showError('No consent request to confirm.');
  let consent;
  let wallet;
  try {
    [consent, wallet] = await Promise.all([api(`/consent/${encodeURIComponent(consentId)}`), api('/api/wallet')]);
  } catch (err) {
    return showError(`Could not load the payment request (${err.message}).`);
  }

  $('shop').textContent = consent.merchant.shopName;
  $('amount').textContent = format(consent.amount);
  $('request').hidden = false;

  if (consent.status !== 'awaiting_authentication') {
    return showResult('Nothing to confirm', `This payment request is already ${consent.status.replace('_', ' ')}.`);
  }

  $('consent-form').hidden = false;
  if (!renderAccounts(wallet.accounts, consent)) {
    $('fingerprint').disabled = true;
    showError('None of your accounts has enough balance for this payment.');
  }

  setupSensor(async () => {
    const accountId = document.querySelector('input[name="account"]:checked')?.value;
    if (!accountId) return showError('Select an account to pay from.');
    $('fingerprint').disabled = true;
    $('error').hidden = true;
    try {
      const authentication = await fingerprintSensor.scan();
      const done = await post(`/consent/${encodeURIComponent(consentId)}/authorise`, { accountId, authentication });
      const account = wallet.accounts.find((a) => a.id === done.debtorAccountId);
      showResult('Payment approved', `${format(done.amount)} to ${done.merchant.shopName} from your ${account.label.toLowerCase()}.`);
    } catch (err) {
      $('fingerprint').disabled = false;
      showError(err.message);
    }
  });

  $('cancel').addEventListener('click', async () => {
    try {
      await post(`/consent/${encodeURIComponent(consentId)}/reject`);
      showResult('Payment cancelled', `Nothing was paid to ${consent.merchant.shopName}.`);
    } catch (err) {
      showError(err.message);
    }
  });
}

init();
