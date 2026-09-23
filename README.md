# Wero agentic commerce PoC

An agent holds a bounded mandate to look after the office coffee machine and
buys beans, milk and maintenance when needed, paying with Wero on the sandbox.
Final demo to leadership: Wednesday 28 October.
See [`CLAUDE.md`](CLAUDE.md) for the case, the rules, the demo bar and the model setup.

## Repository layout

```
CLAUDE.md        the case, the teams and the rules, read by Claude every session
contracts/       shared schemas: mandate, agent identity, authorisation (owned by Trust Layer)
consumer-agent/  the instruction, the mandate request and the agent that acts on it
merchant/        catalogue, offer, order and delivery
trust-layer/     mandate validation, agent identity, authorisation, audit trail
wallet/          funds, limits and settlement on the sandbox
mock-data/       shared fictional data: the coffee machine, products, accounts, mandates
```

Each component folder has its own `CLAUDE.md` with its stack and how to run it.

## Running the demo

> Status: scaffold. Components are not implemented yet; each team fills in its
> run steps in its own `CLAUDE.md` as it lands its week 1 skeleton.

1. Put the model keys (Mistral, and Claude for comparison) in environment
   variables. Never commit them.
2. Start the Trust Layer, Wallet and Merchant components.
3. Start the consumer agent.
4. Trigger the scenario: the machine in `mock-data/coffee-machine.json` is low
   on beans (milk and maintenance are also tracked).
5. Follow the agent through mandate, offer, authorisation, settlement and order.
6. Read the audit trail from the Trust Layer.

### Failure scenarios (week 4)

| Scenario           | Mock data                          | Expected result                       |
|--------------------|------------------------------------|---------------------------------------|
| Limit exceeded     | order above `mand-001` limits      | Trust Layer refuses the authorisation |
| Revocation         | `mand-002` (revoked)               | Trust Layer refuses the authorisation |
| Unauthorised agent | `agent-999` (not registered)       | Trust Layer refuses the agent         |

## Contributing

Small commits, one change each, with the reason in the message. Changes to
`contracts/` go through a pull request for the Trust Layer.
