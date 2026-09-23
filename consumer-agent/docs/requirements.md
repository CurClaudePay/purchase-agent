# Consumer Agent requirements

## Functional

1. Accept a consumer instruction in plain language.
2. Draft a mandate from the instruction that conforms to `contracts/mandate.schema.json`,
   and show it to the consumer for confirmation before it is used.
3. Detect a need to buy (the coffee machine in `mock-data/` reports low beans).
4. Request the catalogue and an offer from the merchant.
5. Check the offer against the mandate before asking for authorisation.
6. Request an authorisation from the Trust Layer, identifying itself with its agent identity.
7. On approval, trigger payment through the wallet; on refusal, stop and tell the consumer why.
8. Report the result (order, amount, delivery) back to the consumer.

## Non-functional

- Never pay without an approved authorisation.
- Never widen the mandate on its own; any change goes back to the consumer.
- Every request it makes can be traced in the Trust Layer audit trail.
- Uses only fictional data from `mock-data/`.
