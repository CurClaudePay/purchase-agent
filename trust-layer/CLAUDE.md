# Trust Layer

Read the root `CLAUDE.md` first; this file adds to it. This team also owns
`contracts/`: review pull requests from other teams that propose changes there.

## What this team builds

- **Mandate validation**: registers mandates and checks them for scope, limits,
  validity and revocation.
- **Agent identity**: registers agents and verifies who is making a request.
- **Authorisation**: decides each payment request against the mandate; refusal
  reasons are listed in `contracts/authorisation.schema.json`.
- **Audit trail**: an append-only log of every mandate, identity, authorisation,
  payment and order event, visible in the week 4 demo.

## Stack

TBD. Record the language and framework here.

## Owners

TBD.

## How to run

TBD. Add install, configuration and start commands.
