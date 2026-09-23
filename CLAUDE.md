# Wero agentic payments PoC

Read this file at the start of every session. Team folders may add their own
`CLAUDE.md` with stack and run notes; those add to this file, they do not replace it.

## The case

A household coffee machine runs low on beans. The consumer's agent notices,
finds a replacement at a merchant, and pays with Wero within limits the
consumer set in advance (the **mandate**). The consumer is not asked to approve
each purchase, but every step must be traceable to that mandate.

The demo covers one happy path end to end, plus the refusals that prove the
controls work (over limit, expired mandate, unknown agent, wrong merchant).

## Flow

1. **Consumer agent** receives the instruction ("keep me in coffee, max EUR 40 a month")
   and asks the consumer for a mandate.
2. **Trust Layer** registers the mandate and the agent identity.
3. The agent requests a catalogue and an offer from the **Merchant**.
4. The agent asks the **Trust Layer** for an authorisation against the mandate.
5. The **Wallet** checks funds and limits and settles on the sandbox.
6. The **Merchant** confirms the order and delivery.
7. Every step is written to the **Trust Layer** audit trail.

## Teams and folders

| Folder            | Team           | Owns                                                        |
|-------------------|----------------|-------------------------------------------------------------|
| `contracts/`      | Trust Layer    | Mandate, agent identity and authorisation schemas           |
| `consumer-agent/` | Consumer Agent | The instruction, the mandate request and the acting agent   |
| `merchant/`       | Merchant       | Catalogue, offer, order and delivery                        |
| `trust-layer/`    | Trust Layer    | Mandate validation and the audit trail                      |
| `wallet/`         | Wallet         | Funds, limits and settlement on the sandbox                 |
| `mock-data/`      | Shared         | Fictional data used by every team                           |

## Rules

- **Stay in your folder.** Change another team's folder only when that team asks you to.
- **Contracts belong to the Trust Layer.** Every team reads `contracts/`. Changes
  need Trust Layer review. Do not copy a schema into a team folder; reference it.
- **Fictional data only.** No real names, IBANs, phone numbers, card numbers,
  credentials or customer data anywhere in the repo. New data goes in `mock-data/`.
- **Sandbox only.** Nothing in this repo moves real money or calls a production endpoint.
- **No secrets in git.** Keys and tokens go in local `.env` files, which are ignored.
- **Fail closed.** If a mandate, identity or authorisation can't be validated, refuse
  the payment and log why.
- **Everything is audited.** Every decision that affects a payment writes an audit event.
- **Amounts are integer minor units** (cents) with an ISO 4217 currency code; timestamps are ISO 8601 UTC.
