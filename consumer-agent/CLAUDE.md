# Consumer agent: team notes

Read the root `CLAUDE.md` first. This file adds what is specific to this team.

## What this team builds

- **Instruction**: how the consumer states the goal and limits
  ("reorder capsules, max EUR 40 per order, EUR 80 per month").
- **Mandate request**: turning that instruction into a mandate that matches
  `contracts/mandate`, and getting it signed by the consumer.
- **The agent**: watches the coffee machine, decides when to reorder, asks the
  merchant for an offer, checks it against the mandate and places the order.

## Stack

To be decided. Record the choice here once made.

## Owners

To be filled in: names or roles of the people on this team.

## How to run

To be filled in once there is code.

## Docs

- [`docs/requirements.md`](docs/requirements.md): what the agent must do
- [`docs/scope.md`](docs/scope.md): what is in and out of this PoC
- [`docs/dependencies.md`](docs/dependencies.md): what we need from other teams
