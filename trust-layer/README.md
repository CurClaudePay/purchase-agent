# Trust Layer

Mandate validation and the audit trail. Also owns `contracts/`.

- **Mandate validation**: checks the signature and validity of a mandate.
- **Authorisation**: checks an order against the mandate (merchant, amount,
  period budget, validity) and the agent's identity; returns approve or reject
  with a reason.
- **Audit trail**: stores the audit events from every team and makes the full
  story of a purchase readable for the consumer.
