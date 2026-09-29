import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { sum } from './money.js';

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
};

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

export function createHandler({ provider, publicDir }) {
  return async (req, res) => {
    const { pathname } = new URL(req.url, 'http://localhost');
    try {
      if (req.method !== 'GET') return sendJson(res, 405, { error: 'Method not allowed' });

      if (pathname === '/api/wallet') {
        const [wallet, accounts] = await Promise.all([provider.getWallet(), provider.listAccounts()]);
        return sendJson(res, 200, {
          ...wallet,
          accounts,
          total: sum(accounts.map((a) => a.balance)),
        });
      }

      const accountMatch = /^\/api\/accounts\/([\w-]+)$/.exec(pathname);
      if (accountMatch) {
        const account = (await provider.listAccounts()).find((a) => a.id === accountMatch[1]);
        return account ? sendJson(res, 200, account) : sendJson(res, 404, { error: 'Account not found' });
      }

      const file = normalize(pathname === '/' ? '/index.html' : pathname);
      const type = CONTENT_TYPES[extname(file)];
      if (!type || file.includes('..')) return sendJson(res, 404, { error: 'Not found' });
      const body = await readFile(join(publicDir, file)).catch(() => null);
      if (!body) return sendJson(res, 404, { error: 'Not found' });
      res.writeHead(200, { 'Content-Type': type });
      return res.end(body);
    } catch (err) {
      console.error(err);
      return sendJson(res, 500, { error: 'Internal error' });
    }
  };
}
