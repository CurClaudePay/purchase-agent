# Consumer Agent

Read the root `CLAUDE.md` first; this file adds to it.

## What this team builds

- **The instruction**: how the consumer tells the agent what they want
  ("keep the office coffee machine running, max EUR 150 a month").
- **The mandate request**: turning that instruction into a mandate
  (`contracts/mandate.schema.json`) for the consumer to confirm.
- **The agent**: watches the office coffee machine (beans, milk, maintenance),
  picks an offer from the merchant, asks the Trust Layer for an authorisation and
  triggers payment through the wallet.

## Model interface

The agent calls its language model through one interface, so the provider can
be swapped by configuration. Mistral is the default; Claude runs alongside it
as a comparison until the choice on Wednesday 7 October. Keys come from
environment variables only.

## Stack

TBD. Record the language and framework here.

## Owners

TBD. List the team members and the contact for Trust Layer contract questions.

## How to run

TBD. Add the commands to install, configure (`.env.example`) and start the agent.

## Docs

- [`docs/requirements.md`](docs/requirements.md): what the agent must do
- [`docs/scope.md`](docs/scope.md): what is in and out of the PoC
- [`docs/dependencies.md`](docs/dependencies.md): what we need from other teams
