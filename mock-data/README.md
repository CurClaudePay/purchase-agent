# Mock data

Shared, fictional data used by every team. Everything here is invented: no real iDEAL data, no real
people, IBANs, phone numbers or accounts. Add new data here rather than in team folders.

| File                  | Contents                                   |
|-----------------------|--------------------------------------------|
| `coffee-machine.json` | The office coffee machine: usage assumptions (100 cups a day), cupboard stock and reorder points for beans and milk, maintenance counter. Beans start below the reorder point so the agent acts straight away |
| `products.json`       | The merchant's catalogue: coffee, milk, maintenance, plus one out-of-scope item (grinder) for refusal tests |
| `accounts.json`       | Consumer, agent and merchant accounts with sandbox balances |
| `mandates.json`       | Example mandates: one active, one revoked (conform to `contracts/mandate.schema.json`) |
