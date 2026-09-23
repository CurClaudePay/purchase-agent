# Wero agentic payments PoC

Read by Claude at the start of every session. Keep it short and current.

## The case

A household owns a connected coffee machine. When it runs low on beans, a
**consumer agent** acting for the household orders a refill from a
**merchant**, and pays with **Wero** from the household's **wallet**. The
agent can only spend within a **mandate** the consumer approved up front
(what, from whom, how much, how often, until when). A **trust layer** checks
every payment against that mandate and keeps an audit trail.

Demo story, end to end:

1. The coffee machine reports low stock.
2. The consumer agent turns that into a purchase instruction.
3. The agent asks the merchant for an offer (product, price, delivery).
4. The agent asks the trust layer to authorise the purchase under the mandate.
5. The wallet settles the payment on the sandbox.
6. The merchant confirms the order and delivery.
7. Every step lands in the audit trail.

## The teams

| Folder            | Team           | Owns                                                   |
|-------------------|----------------|--------------------------------------------------------|
| `contracts/`      | Trust Layer    | Mandate, agent identity and authorisation schemas      |
| `consumer-agent/` | Consumer Agent | The instruction, the mandate request, the acting agent |
| `merchant/`       | Merchant       | Catalogue, offer, order and delivery                   |
| `trust-layer/`    | Trust Layer    | Mandate validation and the audit trail                 |
| `wallet/`         | Wallet         | Funds, limits and settlement on the sandbox            |
| `mock-data/`      | Shared         | Fictional coffee machine, products and accounts        |

Each team folder may have its own `CLAUDE.md` with stack, owners and run notes.
Read it before changing code in that folder.

## The rules

- **Fictional data only.** No real names, IBANs, card numbers, phone numbers
  or addresses. Use and extend `mock-data/`.
- **Sandbox only.** Never call a production payment endpoint. No real
  credentials in the repo; use environment variables and `.env.example`.
- **No payment without a valid mandate.** Every payment goes through the
  trust layer first. An agent never talks to the wallet directly to move money.
- **Contracts are the interface.** Teams integrate only through the schemas in
  `contracts/`. Changing a contract needs the Trust Layer team's agreement;
  make it backwards compatible or bump its version.
- **Everything is audited.** Every mandate check, authorisation, payment and
  refusal writes an audit event.
- **Stay in your folder.** Change another team's folder only when asked; say
  so in the commit message.
