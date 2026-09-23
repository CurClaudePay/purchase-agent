# Wero agentic commerce PoC

Proof of concept: a consumer's agent reorders coffee capsules for a connected
coffee machine and pays with Wero, within a mandate the consumer set up front.

See [`CLAUDE.md`](CLAUDE.md) for the case, the teams and the rules.

## Repository layout

```
CLAUDE.md            the case, the teams and the rules, read by Claude every session
README.md            how to run the demo
contracts/           mandate, agent identity, authorisation (owned by Trust Layer)
consumer-agent/      the instruction, the mandate request and the agent that acts on it
  CLAUDE.md          team-specific notes: stack, owners, how to run
  docs/              requirements.md, scope.md, dependencies.md
merchant/            catalogue, offer, order and delivery
trust-layer/         mandate validation and the audit trail
wallet/              funds, limits and settlement on the sandbox
mock-data/           shared fictional data: the coffee machine, products, accounts
```

## Running the demo

> The components are not built yet. This section will be filled in as each
> team delivers its part.

Intended flow:

1. Start the merchant, Trust Layer and wallet services (sandbox mode).
2. Load the fictional data from `mock-data/`.
3. Create a mandate for the consumer (`consumer-agent/`).
4. Trigger a "capsules low" event from the mock coffee machine.
5. Watch the agent place an order, the Trust Layer authorise it, the wallet
   settle it and the merchant confirm delivery.
6. Inspect the audit trail (`trust-layer/`).

## Rules in short

- Only the Wero sandbox and fictional data. No real money, people or secrets.
- Teams integrate only through `contracts/`.
- The agent never acts outside its mandate.
