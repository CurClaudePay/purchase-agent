// Amounts travel as decimal strings ("1250.40") to match mock-data/.
// Arithmetic happens in integer cents to avoid floating point drift.

export function toCents(amount) {
  const match = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(amount);
  if (!match) throw new Error(`Invalid amount: ${amount}`);
  const [, sign, whole, frac = ''] = match;
  const cents = Number(whole) * 100 + Number(frac.padEnd(2, '0'));
  return sign ? -cents : cents;
}

export function fromCents(cents) {
  const sign = cents < 0 ? '-' : '';
  const abs = Math.abs(cents);
  return `${sign}${Math.floor(abs / 100)}.${String(abs % 100).padStart(2, '0')}`;
}

export function sum(balances, currency = 'EUR') {
  let cents = 0;
  for (const b of balances) {
    if (b.currency !== currency) throw new Error(`Currency mismatch: ${b.currency}`);
    cents += toCents(b.amount);
  }
  return { amount: fromCents(cents), currency };
}
