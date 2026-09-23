# Requirements: consumer agent

## The instruction
- R1. Detect low stock when `beanHopper.currentGrams` is at or below
  `reorderThresholdGrams` (`mock-data/coffee-machine.json`).
- R2. Turn that into a purchase instruction for the preferred product.

## The mandate request
- R3. If there is no active mandate, ask the consumer for one, with merchant,
  product category, limits and validity per `contracts/mandate.schema.json`.
- R4. Never act on a mandate that is `pending`, `revoked` or `expired`.

## Acting on it
- R5. Request an offer from the merchant for the instruction.
- R6. Submit an authorisation request (`contracts/authorisation.schema.json`)
  to the trust layer before any payment.
- R7. On `approved`, pass the authorisation token to the wallet to settle; on
  `refused`, stop and tell the consumer the reason.
- R8. Confirm the order with the merchant only after settlement succeeds.
- R9. Never place more than one order for the same low-stock event.
