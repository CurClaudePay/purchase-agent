# Wero agentic commerce PoC

Proof of concept: an agent keeps an eye on the office coffee machine and, within
a bounded mandate, orders new beans, milk or maintenance and pays with Wero on
the sandbox. Final demo to leadership on Wednesday 28 October.

See [`CLAUDE.md`](CLAUDE.md) for the case, the teams, the rules and the demo bar.

## Repository layout

```
CLAUDE.md            the case, the teams and the rules, read by Claude every session
README.md            how to run the demo
contracts/           mandate, agent identity, authorisation (owned by Trust Layer)
consumer-agent/      the instruction, the mandate request and the agent that acts on it
  CLAUDE.md          team-specific notes: stack, owners, how to run
  docs/              requirements.md, scope.md, dependencies.md
merchant/            catalogue, offer, order and delivery
trust-layer/         mandate validation, agent identity, authorisation, audit trail
wallet/              funds, limits and settlement on the sandbox
mock-data/           shared fictional data: the coffee machine, products, accounts
```

## Running the demo

> The components are not built yet. Each team adds its run instructions to its
> own `CLAUDE.md`; this section will link them into one end-to-end run.

Intended flow:

1. Start the merchant, Trust Layer and wallet components (sandbox mode, stubs allowed).
2. Load the fictional data from `mock-data/`.
3. Create a mandate for the consumer (`consumer-agent/`).
4. Trigger a "beans low", "milk low" or "maintenance due" event from the mock
   coffee machine.
5. Watch the agent place an order, the Trust Layer authorise it, the wallet
   settle it and the merchant confirm delivery.
6. Inspect the audit trail (`trust-layer/`).

## Rules in short

- Mock data only. No real iDEAL, customer or payment data, and no secrets.
- Build against `contracts/`; stub missing contracts behind one interface.
- Nothing settles without a valid mandate from the Trust Layer.
