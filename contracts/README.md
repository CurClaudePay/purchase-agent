# Contracts

Owned by the Trust Layer team. These JSON Schemas are the only interface
between teams. Change them only with Trust Layer's agreement, and keep changes
backwards compatible or bump `version`.

| File                        | Describes                                                  |
|-----------------------------|------------------------------------------------------------|
| `mandate.schema.json`       | What the consumer allows the agent to buy, and within what limits |
| `agent-identity.schema.json`| Who the agent is and on whose behalf it acts               |
| `authorisation.schema.json` | A request to pay under a mandate and the trust layer's decision |
