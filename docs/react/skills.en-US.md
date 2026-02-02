---
group:
  title: AI
  order: 0.9
order: 2
title: SKILL.md
tag: New
---

<SkillsDocActions> </SkillsDocActions>

This guide describes the Ant Design skill package, its structure, and usage.

## What is SKILL.md? {#what-is-skill-md}

`SKILL.md` is the entry file of a skill. It defines scope, usage conditions, and expected outputs. A skill package typically includes:

- `SKILL.md`
- `references/` (optional, for advanced topics)
- `scripts/` or other assets (optional)

## Available resources {#available-resources}

Skill content in this repository:

- `antd-skill/skills/ant-design/SKILL.md`
- `antd-skill/skills/ant-design/references/`

## Use in Cursor {#use-in-cursor}

Cursor automatically loads skills from skill directories (see [Cursor Skills docs](https://cursor.com/cn/docs/context/skills)).

### Install (project scope)

1. Create `.cursor/skills/ant-design/`
2. Add `SKILL.md` and `references/`
3. Reopen the project or refresh indexing

### Install (user scope)

Place the skill in `~/.cursor/skills/ant-design/` to reuse across projects.

### Trigger

- Auto trigger: when the request mentions antd v6, ConfigProvider, tokens, SSR, Form, or Table.

## Use in Claude Code {#use-in-claude-code}

Claude Code supports skill directories and `SKILL.md` (see [Claude Code Skills docs](https://code.claude.com/docs/en/skills#extend-claude-with-skills)).

### Install (project scope)

1. Create `.claude/skills/ant-design/`
2. Add `SKILL.md` and `references/`
3. Reopen the project or refresh indexing

### Install (user scope)

Place the skill in `~/.claude/skills/ant-design/` to reuse across projects.

### Trigger

- Auto trigger: when the request matches the skill description.
- Manual trigger: invoke `/ant-design`.

## Use in Trae {#use-in-trae}

Trae provides a skills mechanism and directory conventions (see [Trae Skills docs](https://docs.trae.ai/ide/skills?_lang=zh)).

### Install

Place the skill directory in Trae's skills path with `SKILL.md` and `references/`.

### Trigger

- Auto trigger: when the request matches the skill description.
- Manual trigger: use Trae's skill invocation entry.

## Use in Qoder {#use-in-qoder}

Qoder CLI supports skills with `SKILL.md` (see [Qoder Skills docs](https://docs.qoder.com/cli/Skills#skills)).

### Install (project scope)

1. Create `.qoder/skills/ant-design/`
2. Add `SKILL.md` and `references/`
3. Restart Qoder CLI or refresh the session

### Install (user scope)

Place the skill in `~/.qoder/skills/ant-design/` to reuse across projects.

### Trigger

- Auto trigger: when the request matches the skill description.
- Manual trigger: invoke `/ant-design`.

## How to use {#usage}

### Main skill

- For component selection, provider/theme decisions, SSR setup, and common risks.
- Complex cases should link to references for details.

### References

- For complex interaction, async, or large-data scenarios.
- Use them when implementation details are required.

### Examples

- “In Next.js SSR, antd styles are out of order. How should ConfigProvider and StyleProvider be set?”
- “How should I handle cross-field linkage in Form?”

## Usage tips {#usage-tips}

- Keep `SKILL.md` concise and move advanced content to `references/`.
- When a request hits complex conditions, refer to the matching reference.
