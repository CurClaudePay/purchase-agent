# Consumer Agent requirements

## Functional

1. Accept a consumer instruction in plain language.
2. Draft a mandate from the instruction that conforms to `contracts/mandate.schema.json`,
   and show it to the consumer for confirmation before it is used.
3. Detect a need to buy: low beans, low milk or maintenance due on the coffee machine in `mock-data/`.
4. Request the catalogue and an offer from the merchant.
5. Check the offer against the mandate before asking for authorisation.
6. Request an authorisation from the Trust Layer, identifying itself with its agent identity.
7. On approval, trigger payment through the wallet; on refusal, stop and tell the consumer why.
8. Notify the consumer of each approval and report the result (order, amount, delivery).
9. Call its language model only through the model interface (Mistral default, Claude for comparison).

## Non-functional

- Never pay without an approved authorisation.
- Never widen the mandate on its own; any change goes back to the consumer.
- Every request it makes can be traced in the Trust Layer audit trail.
- Uses only fictional data from `mock-data/`.
- Model keys come from environment variables, never from the repository.
- Where a contract or service is not ready, stub it behind one interface so the real one can be swapped in.
