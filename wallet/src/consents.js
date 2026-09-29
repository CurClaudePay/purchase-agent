// Consent requests for a single immediate payment to a merchant.
// Authorising a consent records which account the user chose; it does not
// move funds. Settlement stays behind a valid Trust Layer mandate.

import { randomUUID } from 'node:crypto';
import { toCents } from './money.js';

export const CONSENT_TYPE = 'single-immediate-payment';
export const Status = {
  AWAITING_AUTHENTICATION: 'awaiting_authentication',
  AUTHORISED: 'authorised',
  REJECTED: 'rejected',
};

export class ConsentError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function validateRequest(body) {
  if (body?.type !== CONSENT_TYPE) throw new ConsentError(400, `type must be "${CONSENT_TYPE}"`);
  const shopName = body.merchant?.shopName;
  if (typeof shopName !== 'string' || !shopName.trim()) {
    throw new ConsentError(400, 'merchant.shopName is required');
  }
  const { amount, currency } = body.amount ?? {};
  if (currency !== 'EUR') throw new ConsentError(400, 'amount.currency must be "EUR"');
  let cents;
  try {
    cents = toCents(String(amount));
  } catch {
    throw new ConsentError(400, 'amount.amount must be a decimal string such as "19.95"');
  }
  if (cents <= 0) throw new ConsentError(400, 'amount.amount must be greater than zero');
  if (body.authenticationMethod !== 'fingerprint') {
    throw new ConsentError(422, 'Only authenticationMethod "fingerprint" is supported');
  }
}

export class ConsentStore {
  #consents = new Map();

  constructor({ provider, verifier, now = () => new Date() }) {
    this.provider = provider;
    this.verifier = verifier;
    this.now = now;
  }

  create(body) {
    validateRequest(body);
    const timestamp = this.now().toISOString();
    const consent = {
      id: `consent-${randomUUID()}`,
      type: CONSENT_TYPE,
      merchant: { id: body.merchant.id ?? null, shopName: body.merchant.shopName.trim() },
      amount: { amount: body.amount.amount, currency: body.amount.currency },
      authenticationMethod: 'fingerprint',
      status: Status.AWAITING_AUTHENTICATION,
      debtorAccountId: null,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.#consents.set(consent.id, consent);
    return consent;
  }

  get(id) {
    const consent = this.#consents.get(id);
    if (!consent) throw new ConsentError(404, 'Consent not found');
    return consent;
  }

  list(status) {
    return [...this.#consents.values()].filter((c) => !status || c.status === status);
  }

  #pending(id) {
    const consent = this.get(id);
    if (consent.status !== Status.AWAITING_AUTHENTICATION) {
      throw new ConsentError(409, `Consent is already ${consent.status}`);
    }
    return consent;
  }

  async authorise(id, { accountId, authentication } = {}) {
    const consent = this.#pending(id);
    const account = (await this.provider.listAccounts()).find((a) => a.id === accountId);
    if (!account) throw new ConsentError(400, 'accountId must be one of the linked bank accounts');
    if (account.balance.currency !== consent.amount.currency) {
      throw new ConsentError(422, 'Account currency does not match the payment');
    }
    if (toCents(account.balance.amount) < toCents(consent.amount.amount)) {
      throw new ConsentError(422, 'Insufficient balance on the selected account');
    }
    if (!(await this.verifier.verify(authentication))) {
      throw new ConsentError(401, 'Fingerprint not recognised');
    }
    return Object.assign(consent, {
      status: Status.AUTHORISED,
      debtorAccountId: account.id,
      updatedAt: this.now().toISOString(),
    });
  }

  reject(id) {
    return Object.assign(this.#pending(id), {
      status: Status.REJECTED,
      updatedAt: this.now().toISOString(),
    });
  }
}
