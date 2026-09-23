# Contracts

Owned by **Trust Layer**. The shared schemas every team builds against.

Other teams read these contracts and never edit them directly. To change one,
open a pull request for the Trust Layer team to review.

Planned contracts:

| Contract            | Describes                                                                    |
|---------------------|------------------------------------------------------------------------------|
| `mandate`           | Who authorises what: consumer, agent, purpose, merchants, per-order and per-period limits, validity, revocation, signature |
| `agent-identity`    | How an agent identifies itself and proves it acts for a given consumer       |
| `authorisation`     | Request and response for checking an order against a mandate                 |
| `audit-event`       | The shape of every logged step in the flow                                   |

Until a contract exists, teams stub it behind one interface so the real
component can be swapped in later.
