# Contracts

Owned by the **Trust Layer** team. Every other team reads these; changes need
Trust Layer review.

| File                          | Describes                                                          |
|-------------------------------|--------------------------------------------------------------------|
| `mandate.schema.json`         | What the consumer allows the agent to buy, from whom, up to how much, until when |
| `agent-identity.schema.json`  | Who the agent is, who it acts for and how it is verified           |
| `authorisation.schema.json`   | A single payment approved (or refused) against a mandate           |

Schemas use JSON Schema draft 2020-12. Amounts are integer minor units with an
ISO 4217 currency; timestamps are ISO 8601 UTC.
