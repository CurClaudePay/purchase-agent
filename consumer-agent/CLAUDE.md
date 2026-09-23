# Consumer agent: team notes

Read the root `CLAUDE.md` first. This file adds what is specific to this team.

## What this team builds

- **Instruction**: how the consumer states the goal and limits, for example
  "keep the office coffee machine stocked with beans and milk and book
  maintenance when due; at most EUR 100 per order and EUR 250 per month, only
  from approved merchants".
- **Mandate request**: turning that instruction into a mandate that matches
  `contracts/mandate`, and getting it signed by the consumer.
- **The agent**: watches the coffee machine, decides when beans, milk or
  maintenance are needed, asks the merchant for an offer, checks it against
  the mandate and places the order.

## Language model

The agent calls its language model through one interface. Mistral is the
default; Claude runs alongside it as a comparison until the choice on
Wednesday 7 October. Model keys come from environment variables and are never
committed.

## Stack

To be decided. Record language, framework and version here once chosen.

## Owners

To be filled in: names or roles of the people on this team.

## How to run

To be filled in once there is code.

## Docs

- [`docs/requirements.md`](docs/requirements.md): what the agent must do
- [`docs/scope.md`](docs/scope.md): what is in and out of this PoC
- [`docs/dependencies.md`](docs/dependencies.md): what we need from other teams
