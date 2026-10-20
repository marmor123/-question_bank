# Domain docs

## Layout

This repository uses a single domain context:

- CONTEXT.md: domain glossary at the repository root.
- docs/adr/: architectural decisions, created lazily when needed.
- docs/game-design.md: agreed game behavior, open decisions, and provisional playtest choices.

## Before exploring

Read CONTEXT.md and ADRs relevant to the work.
If a CONTEXT-MAP.md is introduced later, follow it to the relevant context glossaries and ADR directories.
If a glossary or ADR directory is absent, proceed without flagging it or creating placeholders. The domain-modeling skill creates documentation when terms or decisions are resolved.

## Vocabulary and decisions

Use glossary terms consistently in code discussions, issues, and specifications.
Flag missing or conflicting concepts for domain-modeling.
Keep implementation detail and design notes out of the glossary.
Surface conflicts with existing ADRs rather than silently overriding them.
Preserve the distinction between agreed behavior and provisional choices in the game design notes.
