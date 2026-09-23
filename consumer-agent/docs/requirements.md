# Requirements: consumer agent

## Functional

1. The consumer can state an instruction with a purpose, allowed categories
   (beans, milk, maintenance), a per-order limit, a per-period limit and a list
   of allowed merchants.
2. The instruction is turned into a mandate that matches `contracts/mandate`
   and is signed by the consumer.
3. The agent reacts to "beans low", "milk low" and "maintenance due" events
   from the mock coffee machine.
4. The agent requests an offer from an allowed merchant.
5. Before ordering, the agent checks the offer against the mandate
   (merchant, category, amount, remaining period budget, validity).
6. The agent places the order only if the check passes, and presents its
   agent identity and mandate reference with the order.
7. When an order needs the consumer's approval, the consumer receives an
   approval notification and the agent waits for the answer.
8. If the Trust Layer or Wallet rejects the payment (limit exceeded, mandate
   revoked, agent not authorised), the agent stops and reports why. It does
   not retry with different terms.
9. Every decision (order yes/no, offer chosen, order placed, rejection)
   produces an audit event.
10. The agent calls its language model through one interface, so Mistral and
    Claude can be swapped by configuration.

## Non-functional

- Uses only sandbox endpoints and `mock-data/`.
- No secrets, keys or tokens in code, prompts or commits.
- The agent's decisions can be explained from the audit trail.
