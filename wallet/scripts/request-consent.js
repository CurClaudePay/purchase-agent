// Sends a sample /consent request to a running wallet, as a merchant would,
// so the fingerprint screen opens. Usage: npm run consent -- [amount] [shop name]

const port = Number(process.env.WALLET_PORT ?? 3003);
const [amount = '19.95', ...shop] = process.argv.slice(2);

const res = await fetch(`http://localhost:${port}/consent`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'single-immediate-payment',
    merchant: { id: 'merchant-001', shopName: shop.join(' ') || 'Fictional Office Coffee Supplies' },
    amount: { amount, currency: 'EUR' },
    authenticationMethod: 'fingerprint',
  }),
});
console.log(res.status, JSON.stringify(await res.json(), null, 2));
