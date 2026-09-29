# Wallet: team notes

Read the root `CLAUDE.md` first. This file adds what is specific to this team.

## What is built so far

A sandbox wallet app that shows the consumer the balances of the two
fictional bank accounts linked to their wallet, plus the total, in euros.

- `data/linked-bank-accounts.json`: fictional linked accounts (mock data only,
  IBANs are deliberately invalid `NL00 FAKE ...` values)
- `src/bank-accounts.js`: the `BankAccountProvider` interface and its mock.
  Swap in a real sandbox provider here without touching the rest.
- `src/money.js`: amounts as decimal strings, arithmetic in integer cents
- `src/app.js`: HTTP handler for the API and the static UI
- `public/`: the user interface (plain HTML, CSS and JavaScript)

## API

| Method | Path                 | Returns                                        |
|--------|----------------------|------------------------------------------------|
| GET    | `/api/wallet`        | owner, wallet id, linked accounts and total    |
| GET    | `/api/accounts/:id`  | one linked account, or 404                     |

## Stack

- Node.js 20 or later, no external dependencies
- Tests use the built-in `node:test` runner

## How to run

```sh
cd wallet
npm start        # http://localhost:3003, override with WALLET_PORT
npm test
```

## Not built yet

Limits, reservation and settlement against a Trust Layer mandate.
