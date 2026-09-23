# Wero agentic commerce PoC

## The case
A consumer gives an agent a bounded mandate to keep an eye on the office
coffee machine and to act when needed: new coffee beans, milk, maintenance.
The goal is one complete agentic purchase, end to end, on the sandbox,
demonstrated to leadership on Wednesday 28 October.

## Teams and folders
- consumer-agent/  the instruction, the mandate request and the agent that acts on it
- merchant/        catalogue, offer, order and delivery
- trust-layer/     mandate validation, agent identity, authorisation, audit trail
- wallet/          funds, limits and settlement on the sandbox
- contracts/       shared schemas, owned by the Trust Layer. Other teams read
                   them and never edit them directly; propose changes in a pull
                   request for the Trust Layer.
- mock-data/       shared fictional data

## Rules
- Mock data only. No real iDEAL, customer or payment data.
- No secrets, keys or tokens in code, prompts or commits.
- Nothing settles without a valid mandate from the Trust Layer.
- Build against contracts/. Where a contract does not exist yet, stub it
  behind one interface so the real component can be swapped in later.
- Small commits, one change each, with the reason in the message.

## Demo bar
- Week 1 (30 Sep): a working skeleton per component with mock data
- Week 2 (7 Oct): one purchase across the chain on the happy path, stubs allowed
- Week 3 (14 Oct): real integration, mandate limits enforced, approval notification works
- Week 4 (21 Oct): failure scenarios (limit exceeded, revocation, unauthorised agent)
  and a visible audit trail, then feature freeze
- Week 5 (28 Oct): final presentation

## Models
- Building: Claude Code is the development tool for every team.
- Running: the agent inside the product calls its language model through one
  interface. Mistral is the default, in line with the European stack. Claude
  runs alongside it as a comparison until the choice on Wednesday 7 October.
- Model keys live in environment variables, never in the repository.

## Stack
Each team records its language, framework and how to run its component in
its own CLAUDE.md.
