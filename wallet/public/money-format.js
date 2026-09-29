export const format = ({ amount, currency }) =>
  new Intl.NumberFormat('nl-NL', { style: 'currency', currency }).format(Number(amount));

export function toCents(amount) {
  const [whole, frac = ''] = String(amount).replace('-', '').split('.');
  const cents = Number(whole) * 100 + Number(frac.padEnd(2, '0').slice(0, 2));
  return String(amount).startsWith('-') ? -cents : cents;
}
