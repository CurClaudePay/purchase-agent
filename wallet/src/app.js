import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { ConsentError } from './consents.js';
import { sum } from './money.js';

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
};
const MAX_BODY_BYTES = 10_000;

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new ConsentError(413, 'Request body too large');
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new ConsentError(400, 'Request body must be valid JSON');
  }
}

async function handleConsent(req, res, pathname, searchParams, consents) {
  const [, , id, action, ...rest] = pathname.split('/');
  if (rest.length) return sendJson(res, 404, { error: 'Not found' });

  if (!id) {
    if (req.method === 'POST') return sendJson(res, 201, consents.create(await readJson(req)));
    if (req.method === 'GET') return sendJson(res, 200, consents.list(searchParams.get('status')));
  } else if (!action && req.method === 'GET') {
    return sendJson(res, 200, consents.get(id));
  } else if (action === 'authorise' && req.method === 'POST') {
    return sendJson(res, 200, await consents.authorise(id, await readJson(req)));
  } else if (action === 'reject' && req.method === 'POST') {
    return sendJson(res, 200, consents.reject(id));
  }
  return sendJson(res, 405, { error: 'Method not allowed' });
}

export function createHandler({ provider, consents, publicDir }) {
  return async (req, res) => {
    const { pathname, searchParams } = new URL(req.url, 'http://localhost');
    try {
      if (pathname === '/consent' || pathname.startsWith('/consent/')) {
        return await handleConsent(req, res, pathname, searchParams, consents);
      }

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
      if (err instanceof ConsentError) return sendJson(res, err.status, { error: err.message });
      console.error(err);
      return sendJson(res, 500, { error: 'Internal error' });
    }
  };
}
