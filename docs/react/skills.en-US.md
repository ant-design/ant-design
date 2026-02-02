---
group:
  title: AI
  order: 0.9
order: 2
title: SKILL.md
tag: New
---

<SkillsDocActions> </SkillsDocActions>

This guide explains the Ant Design skill package and how to use it.

## What is SKILL.md? {#what-is-skill-md}

`SKILL.md` is the entry file of a skill and contains its name, description, and usage notes. A skill package typically includes:

- `SKILL.md`
- `references/` (optional, for advanced topics)
- `scripts/` or other assets (optional)

## Use in Cursor {#use-in-cursor}

Cursor automatically loads skills from skill directories (see [Cursor Skills docs](https://cursor.com/cn/docs/context/skills)).

### Install (project scope)

1. Create `.cursor/skills/ant-design/`
2. Add `SKILL.md` and `references/` files
3. Reopen the project or refresh indexing

### Install (user scope)

Place the skill in `~/.cursor/skills/ant-design/` to reuse across projects.

### Trigger

- Auto trigger: when the request mentions antd v6, ConfigProvider, tokens, SSR, Form, or Table.

### Examples

- “In Next.js SSR, antd styles are out of order. How should ConfigProvider and StyleProvider be set?”
- “How should I handle cross-field linkage in Form?”

## Usage tips {#usage-tips}

- Keep `SKILL.md` concise and move advanced content to `references/`.
- When a request hits complex conditions, refer to the matching reference.
