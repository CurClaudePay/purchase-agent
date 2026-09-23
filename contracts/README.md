# Contracts

Owned by **Trust Layer**. The shared schemas every team builds against.

Planned contracts:

| Contract            | Describes                                                                    |
|---------------------|------------------------------------------------------------------------------|
| `mandate`           | Who authorises what: consumer, agent, purpose, merchants, per-order and per-period limits, validity, signature |
| `agent-identity`    | How an agent identifies itself and proves it acts for a given consumer       |
| `authorisation`     | Request and response for checking an order against a mandate                 |
| `audit-event`       | The shape of every logged step in the flow                                   |

Changes to a contract go through the Trust Layer team and must be announced to
all consuming teams (see the rules in the root `CLAUDE.md`).
