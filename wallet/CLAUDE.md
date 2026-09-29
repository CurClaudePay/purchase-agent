# Wallet: team notes

Read the root `CLAUDE.md` first. This file adds what is specific to this team.

## What is built so far

A sandbox wallet app that shows the consumer the balances of the two
fictional bank accounts linked to their wallet, plus the total, in euros.

When a `/consent` request for a single immediate payment to a merchant
arrives with `authenticationMethod: "fingerprint"`, the wallet opens an
authentication screen. It shows the merchant's shop name and the amount,
lets the user pick one of the linked accounts (with its balance; accounts
without enough balance cannot be chosen) and asks for a fingerprint by
touching and holding the sensor. Authorising records the chosen account on
the consent; it does not move funds.

- `data/linked-bank-accounts.json`: fictional linked accounts (mock data only,
  IBANs are deliberately invalid `NL00 FAKE ...` values)
- `src/bank-accounts.js`: the `BankAccountProvider` interface and its mock.
  Swap in a real sandbox provider here without touching the rest.
- `src/consents.js`: consent requests, validation and status changes
- `src/fingerprint.js`: the `FingerprintVerifier` interface and its mock. The
  sandbox simulates a fingerprint match; swap in a real verifier here.
- `src/money.js`: amounts as decimal strings, arithmetic in integer cents
- `src/app.js`: HTTP handler for the API and the static UI
- `public/`: the user interface (plain HTML, CSS and JavaScript);
  `authenticate.html` is the fingerprint screen
- `scripts/request-consent.js`: sends a sample `/consent` request for demos

## API

| Method | Path                 | Returns                                        |
|--------|----------------------|------------------------------------------------|
| GET    | `/api/wallet`        | owner, wallet id, linked accounts and total    |
| GET    | `/api/accounts/:id`  | one linked account, or 404                     |
| POST   | `/consent`           | creates a consent, status `awaiting_authentication` |
| GET    | `/consent?status=`   | consents, optionally filtered by status        |
| GET    | `/consent/:id`       | one consent, or 404                            |
| POST   | `/consent/:id/authorise` | `{ accountId, authentication }`, status `authorised` |
| POST   | `/consent/:id/reject`    | status `rejected`                          |

A consent request looks like this:

```json
{
  "type": "single-immediate-payment",
  "merchant": { "id": "merchant-001", "shopName": "Fictional Office Coffee Supplies" },
  "amount": { "amount": "19.95", "currency": "EUR" },
  "authenticationMethod": "fingerprint"
}
```

Consents live in memory and are lost on restart. There is no contract for
this yet in `contracts/`; when the Trust Layer publishes `authorisation`,
align this shape with it.

## Stack

- Node.js 20 or later, no external dependencies
- Tests use the built-in `node:test` runner

## How to run

```sh
cd wallet
npm start        # http://localhost:3003, override with WALLET_PORT
npm test

# in a second terminal, with the wallet open in the browser:
npm run consent                          # EUR 19.95 to the fictional merchant
npm run consent -- 1500.00 Some Shop     # only the savings account can pay
```

## Not built yet

Limits, reservation and settlement against a Trust Layer mandate.
