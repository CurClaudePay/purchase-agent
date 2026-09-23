# Dependencies: consumer agent

What this team needs from other teams. Keep this list current. Where a
dependency is not ready, stub it behind one interface.

| From        | What we need                                                   | Status |
|-------------|----------------------------------------------------------------|--------|
| Trust Layer | `contracts/mandate` schema, including revocation               | open   |
| Trust Layer | `contracts/agent-identity` schema                              | open   |
| Trust Layer | Authorisation endpoint, see `contracts/authorisation`          | open   |
| Trust Layer | `contracts/audit-event` schema                                 | open   |
| Merchant    | Catalogue and offer API for beans, milk and maintenance        | open   |
| Merchant    | Order API that accepts an agent identity and mandate reference | open   |
| Wallet      | Sandbox account for the fictional consumer                     | open   |
| Shared      | Office coffee machine and consumer in `mock-data/`             | open   |
