// One interface for the bank accounts linked to the wallet.
// The mock reads fictional data from disk; a real sandbox provider can
// replace it later as long as it exposes the same two async methods.
//
// interface BankAccountProvider {
//   getWallet(): Promise<{ walletId, ownerId, ownerName }>
//   listAccounts(): Promise<Array<{ id, bankName, label, iban,
//                                   balance: { amount, currency }, updatedAt }>>
// }

import { readFile } from 'node:fs/promises';

export class MockBankAccountProvider {
  constructor(dataPath) {
    this.dataPath = dataPath;
  }

  async #load() {
    return JSON.parse(await readFile(this.dataPath, 'utf8'));
  }

  async getWallet() {
    const { walletId, ownerId, ownerName } = await this.#load();
    return { walletId, ownerId, ownerName };
  }

  async listAccounts() {
    return (await this.#load()).linkedBankAccounts;
  }
}
