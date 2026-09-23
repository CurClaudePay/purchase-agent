# Dependencies: consumer agent

| From        | What we need                                               | Contract |
|-------------|------------------------------------------------------------|----------|
| Trust Layer | Mandate creation and lookup; authorisation decisions       | `mandate.schema.json`, `authorisation.schema.json` |
| Trust Layer | Registration of our agent identity                         | `agent-identity.schema.json` |
| Merchant    | Catalogue lookup, offer for a product, order confirmation  | TODO: offer/order contract |
| Wallet      | Settlement given an authorisation token                    | TODO: settlement contract |
| Shared      | Coffee machine, product and account fixtures               | `mock-data/` |
