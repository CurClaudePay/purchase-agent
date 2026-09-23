# Trust Layer

Mandate validation, agent identity, authorisation and the audit trail. Also
owns `contracts/`.

- **Mandate validation**: checks the signature, validity and revocation status
  of a mandate.
- **Agent identity**: verifies that the agent is who it says it is and acts for
  the consumer named in the mandate.
- **Authorisation**: checks an order against the mandate (merchant, category,
  amount, period budget, validity) and returns approve or reject with a reason.
  Nothing settles without this approval.
- **Audit trail**: stores the audit events from every team and makes the full
  story of a purchase visible for the consumer.
