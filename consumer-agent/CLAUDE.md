# Consumer Agent

Read the root `CLAUDE.md` first; this file adds to it.

## What this team builds

- **The instruction**: how the consumer tells the agent what they want
  ("keep me in coffee, max EUR 40 a month").
- **The mandate request**: turning that instruction into a mandate
  (`contracts/mandate.schema.json`) for the consumer to confirm.
- **The agent**: watches the coffee machine, picks an offer from the merchant,
  asks the Trust Layer for an authorisation and triggers payment through the wallet.

## Stack

TBD. Record the language, framework and model choices here once decided.

## Owners

TBD. List the team members and the contact for Trust Layer contract questions.

## How to run

TBD. Add the commands to install, configure (`.env.example`) and start the agent.

## Docs

- [`docs/requirements.md`](docs/requirements.md): what the agent must do
- [`docs/scope.md`](docs/scope.md): what is in and out of the PoC
- [`docs/dependencies.md`](docs/dependencies.md): what we need from other teams
