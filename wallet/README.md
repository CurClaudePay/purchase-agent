# Wallet

Funds, limits and settlement on the Wero sandbox.

- **Funds**: sandbox balances for the fictional accounts in `mock-data/`.
- **Limits**: enforces wallet-side limits in addition to the mandate.
- **Settlement**: reserves and settles a payment only after the Trust Layer
  has authorised it against a valid mandate; emits audit events for each step.

Sandbox and mock data only. No real iDEAL data, accounts or credentials in this
repository.
