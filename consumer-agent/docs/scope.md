# Scope: consumer agent

## In scope

- One consumer, one coffee machine, one product type (capsules).
- One active mandate at a time.
- Reorder triggered by a mock "capsules low" event.
- Happy path and the main rejections: over the per-order limit, over the
  period budget, merchant not allowed, mandate expired.

## Out of scope

- Real devices, real payments, real consumers.
- Price comparison across many merchants.
- Changing or revoking a mandate from a UI (may be done by editing mock data).
- Returns, refunds and disputes.
