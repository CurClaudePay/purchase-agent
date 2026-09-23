# Requirements: consumer agent

## Functional

1. The consumer can state an instruction with a purpose, a per-order limit, a
   per-period limit and a list of allowed merchants.
2. The instruction is turned into a mandate that matches `contracts/mandate`
   and is signed by the consumer.
3. The agent reacts to a "capsules low" event from the mock coffee machine.
4. The agent requests an offer from an allowed merchant.
5. Before ordering, the agent checks the offer against the mandate
   (merchant, amount, remaining period budget, validity).
6. The agent places the order only if the check passes, and presents its
   agent identity and mandate reference with the order.
7. If the Trust Layer or Wallet rejects the payment, the agent stops and
   reports why. It does not retry with different terms.
8. Every decision (reorder yes/no, offer chosen, order placed, rejection)
   produces an audit event.

## Non-functional

- Uses only sandbox endpoints and `mock-data/`.
- No secrets in the repository.
- The agent's decisions can be explained from the audit trail.
