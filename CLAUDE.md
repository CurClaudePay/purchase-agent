# Wero agentic commerce PoC

Read this file at the start of every session. It describes the case, the teams
and the rules that apply across the whole repository. Each team folder may add
its own `CLAUDE.md` with stack, owners and run instructions.

## The case

A consumer owns a connected coffee machine. When the machine runs low on
capsules, the consumer's **agent** orders a refill from a **merchant** and pays
with **Wero**, without the consumer confirming each purchase.

This is only allowed within a **mandate** the consumer gave up front, for example:

> "Reorder capsules for my coffee machine, at most EUR 40 per order and
> EUR 80 per month, only from approved merchants."

The PoC shows that the whole chain works and can be verified:

1. **Instruction**: the consumer sets the goal and the limits.
2. **Mandate**: the limits are captured in a signed, machine-readable mandate.
3. **Action**: the agent detects the need, selects an offer and places an order.
4. **Authorisation**: the Trust Layer checks the order against the mandate and
   the agent's identity.
5. **Payment**: the Wallet reserves and settles funds on the sandbox.
6. **Fulfilment**: the merchant confirms the order and delivery.
7. **Audit**: every step is logged so the consumer can see what happened and why.

## Teams and folders

| Folder            | Team            | Owns                                                         |
|-------------------|-----------------|--------------------------------------------------------------|
| `contracts/`      | Trust Layer     | Shared schemas: mandate, agent identity, authorisation       |
| `consumer-agent/` | Consumer Agent  | The instruction, the mandate request, the acting agent       |
| `merchant/`       | Merchant        | Catalogue, offer, order and delivery                         |
| `trust-layer/`    | Trust Layer     | Mandate validation and the audit trail                       |
| `wallet/`         | Wallet          | Funds, limits and settlement on the sandbox                  |
| `mock-data/`      | Shared          | Fictional coffee machine, products and accounts              |

## Rules

1. **Contracts first.** Teams talk to each other only through the schemas in
   `contracts/`. A change to a contract goes through the Trust Layer team and
   must be announced to every team that consumes it.
2. **Stay in your folder.** Change files only in your own team's folder. If you
   need something from another team, write it down in your
   `docs/dependencies.md` (or equivalent) and raise it with that team.
3. **No real money, no real people.** Use only the Wero sandbox and the data in
   `mock-data/`. Never commit real IBANs, card numbers, names, addresses,
   keys or tokens. Secrets go in local `.env` files, which are not committed.
4. **The mandate is the boundary.** The agent must never place an order that
   exceeds or falls outside its mandate. Every payment must be authorised by
   the Trust Layer before the Wallet settles it.
5. **Everything is audited.** Every decision the agent, Trust Layer, Wallet or
   merchant makes produces an audit event (see `contracts/`).
6. **Keep the demo runnable.** `README.md` describes how to run the end-to-end
   demo. If your change affects that, update the README in the same commit.
7. **Small, explained commits.** One logical change per commit, with a message
   that says what changed and why.
