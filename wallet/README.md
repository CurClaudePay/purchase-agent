# Wallet

Funds, limits and settlement on the sandbox. Settles a payment only when given
a valid authorisation token from the trust layer, and enforces the wallet's
own limits (`dailyLimit` in `mock-data/accounts.json`) on top of the mandate.
