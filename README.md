# Wero agentic payments PoC

A proof of concept in which an AI agent reorders coffee for a connected coffee
machine and pays with Wero, within limits the consumer set in a mandate.
See `CLAUDE.md` for the case, the teams and the rules.

## Layout

```
contracts/        mandate, agent identity, authorisation (Trust Layer)
consumer-agent/   the instruction, the mandate request, the acting agent
merchant/         catalogue, offer, order and delivery
trust-layer/      mandate validation and the audit trail
wallet/           funds, limits and settlement on the sandbox
mock-data/        shared fictional data
```

## Running the demo

Not wired up yet. Each component will document its own start command in its
folder's `CLAUDE.md`. The target flow:

1. Start the wallet sandbox, the trust layer and the merchant.
2. Load `mock-data/`.
3. Trigger a low-stock event from the fictional coffee machine
   (`mock-data/coffee-machine.json`).
4. Watch the consumer agent get an offer, obtain authorisation and pay.
5. Inspect the audit trail in the trust layer.

## Status

Scaffold only: folder structure, contracts and mock data. No runnable code yet.
