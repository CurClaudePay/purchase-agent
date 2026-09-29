import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { createHandler } from './app.js';
import { MockBankAccountProvider } from './bank-accounts.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const port = Number(process.env.WALLET_PORT ?? 3003);

const provider = new MockBankAccountProvider(`${root}data/linked-bank-accounts.json`);
const server = createServer(createHandler({ provider, publicDir: `${root}public` }));

server.listen(port, () => {
  console.log(`Wallet (sandbox) running at http://localhost:${port}`);
});
