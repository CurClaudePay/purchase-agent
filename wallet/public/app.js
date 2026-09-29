import { format } from './money-format.js';

const CONSENT_POLL_MS = 2000;

const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

function renderAccount(account) {
  const item = el('li', 'account');
  const info = el('div');
  info.append(
    el('p', 'name', `${account.label} · ${account.bankName}`),
    el('p', 'iban', account.iban),
    el('p', 'muted', `Updated ${new Date(account.updatedAt).toLocaleString('en-GB')}`),
  );
  item.append(info, el('p', 'balance', format(account.balance)));
  return item;
}

async function load() {
  const error = document.getElementById('error');
  error.hidden = true;
  try {
    const res = await fetch('/api/wallet');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const wallet = await res.json();
    document.getElementById('owner').textContent = `${wallet.ownerName} · ${wallet.walletId}`;
    document.getElementById('total').textContent = format(wallet.total);
    document.getElementById('accounts').replaceChildren(...wallet.accounts.map(renderAccount));
  } catch (err) {
    error.textContent = `Could not load balances (${err.message}).`;
    error.hidden = false;
  }
}

// Open the fingerprint screen as soon as a payment consent is waiting.
async function checkConsents() {
  try {
    const res = await fetch('/consent?status=awaiting_authentication');
    const [pending] = res.ok ? await res.json() : [];
    if (pending) location.assign(`/authenticate.html?consent=${encodeURIComponent(pending.id)}`);
  } catch {
    // Try again on the next poll.
  }
}

document.getElementById('refresh').addEventListener('click', load);
load();
checkConsents();
setInterval(checkConsents, CONSENT_POLL_MS);
