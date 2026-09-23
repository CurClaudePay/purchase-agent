# Contracts

Owned by **Trust Layer**. The shared schemas every team builds against.

Other teams read these contracts and never edit them directly. To change one,
open a pull request for the Trust Layer team to review.

Contracts (JSON Schema, draft 2020-12, version 0.1.0):

| Contract                      | Describes                                                                    |
|-------------------------------|------------------------------------------------------------------------------|
| `mandate.schema.json`         | Who authorises what: consumer, agent, purpose, merchants, per-order and per-period limits, validity, revocation, signature |
| `agent-identity.schema.json`  | How an agent identifies itself and proves it acts for a given consumer       |
| `authorisation.schema.json`   | Request and response for checking an order against a mandate                 |
| `audit-event.schema.json`     | The shape of every logged step in the flow                                   |
| `money.schema.json`           | Shared amount format, as in `mock-data/` (`"19.95"`, `EUR`)                  |

`examples/` holds one valid instance of each, using the IDs in `mock-data/`.

Until a contract exists, teams stub it behind one interface so the real
component can be swapped in later.
