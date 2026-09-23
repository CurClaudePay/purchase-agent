# Trust Layer

Validates mandates and authorises payments against them, and keeps the audit
trail. Owns `contracts/`. Every check, approval and refusal writes an audit
event; refusals use the reasons enumerated in `contracts/authorisation.schema.json`.
