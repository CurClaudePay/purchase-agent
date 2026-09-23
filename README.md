# Wero agentic payments PoC

A proof of concept where a consumer's agent buys coffee beans for a coffee
machine and pays with Wero under a mandate the consumer set in advance.
See [`CLAUDE.md`](CLAUDE.md) for the case, the teams and the rules.

## Repository layout

```
contracts/       mandate, agent identity, authorisation (owned by Trust Layer)
consumer-agent/  the instruction, the mandate request and the agent that acts on it
merchant/        catalogue, offer, order and delivery
trust-layer/     mandate validation and the audit trail
wallet/          funds, limits and settlement on the sandbox
mock-data/       shared fictional data: the coffee machine, products, accounts
```

## Running the demo

> Status: scaffold. The components are not implemented yet; this section
> describes the intended run and will be filled in as each team lands its part.

1. Start the Trust Layer, Wallet and Merchant services (see each folder's README).
2. Start the consumer agent (see `consumer-agent/CLAUDE.md`).
3. Trigger the scenario: the coffee machine in `mock-data/coffee-machine.json`
   reports low beans.
4. Watch the agent request a mandate, pick an offer, get an authorisation and pay.
5. Read the audit trail from the Trust Layer to follow every step.

### Refusal scenarios

| Scenario            | Expected result                                  |
|---------------------|--------------------------------------------------|
| Over mandate limit  | Trust Layer refuses the authorisation            |
| Expired mandate     | Trust Layer refuses the authorisation            |
| Unknown agent       | Trust Layer refuses the agent identity           |
| Merchant not allowed| Trust Layer refuses the authorisation            |
| Insufficient funds  | Wallet refuses settlement                        |
