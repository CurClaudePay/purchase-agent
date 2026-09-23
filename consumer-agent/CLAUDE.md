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

Python 3.11 or newer, standard library only: no framework and nothing to
install.

## Owners

To be filled in: names or roles of the people on this team.

## How to run

From the repository root:

```bash
python3 consumer-agent/src/coffee_machine.py
curl http://127.0.0.1:8000/coffee-machine   # in a second terminal, or open it in a browser
```

The first command serves the mock office coffee machine from
`mock-data/coffee-machine.json`. The file is reread on every request, so
editing it changes the response without a restart. Stop the server with
Ctrl+C. Change `PORT` in the file if 8000 is taken. On Windows, use `py`
instead of `python3`.

## Docs

- [`docs/requirements.md`](docs/requirements.md): what the agent must do
- [`docs/scope.md`](docs/scope.md): what is in and out of this PoC
- [`docs/dependencies.md`](docs/dependencies.md): what we need from other teams
