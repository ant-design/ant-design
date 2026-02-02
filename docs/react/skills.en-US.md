---
group:
  title: AI
  order: 0.9
order: 2
title: SKILL.md
tag: New
---

This guide describes the Ant Design skill package, its structure, and usage. It helps you decide when to use the skill, where to start reading, and what outputs to expect.

## What is SKILL.md? {#what-is-skill-md}

`SKILL.md` is the entry file of a skill. It defines scope, usage conditions, and expected outputs. A skill package typically includes:

- `SKILL.md`
- `references/` (optional, for advanced topics)
- `scripts/` or other assets (optional)

## Scope {#scope}

In scope:

- antd 6.x with React 18/19: component selection and behavior
- theming and tokens; ConfigProvider and StyleProvider setup
- SSR, style order, and hydration issues
- common interaction and accessibility checks

## When to use this skill {#when-to-use}

- You need guidance on antd component selection or usage
- Theming or styles are conflicting and you want a stable approach
- SSR or style injection order is incorrect
- You only need decisions, not a full tutorial

## Triggers {#triggers}

- Cross-component or cross-field linkage
- SSR/hydration or style order issues
- Picking between multiple valid options

## Available resources {#available-resources}

Skill content in this repository:

- `antd-skill/skills/ant-design/SKILL.md`
- `antd-skill/skills/ant-design/references/`

## Expected outputs {#expected-output}

Outputs usually include (as needed):

- recommended components with short reasoning
- minimal provider setup guidance
- risks and mitigations
- reference path for complex cases

## Install {#install}

Prefer installing via CLI:

```bash
pnpx skills add ant-design/antd-skill
# or
npx skills add ant-design/antd-skill
```

## Use in editors {#use-in-editors}

For manual setup, refer to each editor's official skills docs:

- Cursor Skills docs: https://cursor.com/cn/docs/context/skills
- Claude Code Skills docs: https://code.claude.com/docs/en/skills#extend-claude-with-skills
- Trae Skills docs: https://docs.trae.ai/ide/skills?_lang=zh
- Qoder Skills docs: https://docs.qoder.com/cli/Skills#skills

## How to use {#usage}

1. Pick a skill: `ant-design` / `ant-design-pro` / `ant-design-x`.
2. Open `skills/<skill>/SKILL.md` to check scope and expected outputs.
3. For complex cases, read `skills/<skill>/references/*.md`.
4. If you only need decisions, the main `SKILL.md` is enough; it is not a tutorial.

## Use cases {#cases}

These questions are good triggers for this skill:

- “I need to customize antd theme. Should I prefer tokens or local styles?”
- “In Next.js SSR, antd styles are out of order. How should ConfigProvider and StyleProvider be set?”
- “For cross-field validation in Form, should I use dependencies or useWatch?”
- “For server-side sorting/paging in Table, which reference should I start with?”
- “I need a controlled Upload with fileList and custom request. What is the recommended flow?”
- “How should I handle cross-field linkage in Form?”

## Common entry points {#entry-points}

- Form linkage and dynamic lists: `references/form-advanced.md`
- Table paging/sort/virtual: `references/table-advanced.md`
- Remote search and custom rendering: `references/select-advanced.md`
- Controlled upload and custom request: `references/upload-advanced.md`
- Async tree and check strategy: `references/tree-advanced.md`

## FAQ {#faq}

- **Do I need code?** If you only want decisions, usually no. Use references for complex cases.
- **Version not stated?** Assume antd 6.x; call out older versions explicitly.
- **Too many states/links?** Jump to the matching reference.

## Usage tips {#usage-tips}

- Keep `SKILL.md` concise and move advanced content to `references/`.
- When a request hits complex conditions, refer to the matching reference.
