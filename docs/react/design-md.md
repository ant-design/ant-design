---
group:
  title: AI
  order: 0.9
order: 1
title: design.md
tag: New
---

This guide explains how to use Ant Design's `design.md` to help AI design tools understand Ant Design's visual language.

## What is design.md?

[`design.md`](https://ant.design/design.md) is a design-language description file for AI design tools, conformant with the [google-labs-code/design.md](https://github.com/google-labs-code/design.md) format.

It describes the visual language, component archetypes, and theme tokens of Ant Design's default light theme, helping AI design tools such as Figma Make and Stitch generate interfaces that better match the Ant Design system.

## Read Online

AI tools can read it directly:

```text
https://ant.design/design.md
```

You can use this prompt in AI design tools:

```text
Read https://ant.design/design.md and generate UI following Ant Design's visual language.
```

## Use the CLI

If a tool cannot read URLs directly, you can get the same content through [`@ant-design/cli`](/docs/react/cli):

```bash
antd design.md
```

Common options:

```bash
antd design.md --format json  # JSON format output
antd design.md --lang zh      # Chinese descriptions
```

## What's Included

`design.md` includes:

- Visual rules for colors, typography, border radius, spacing, shadows, and other default light theme decisions.
- Visual archetypes and usage guidance for common components.
- Notes about theme capabilities such as `ConfigProvider.theme`, algorithm composition, component tokens, `cssVar`, and `zeroRuntime`.
- Misuse patterns AI design tools should avoid when generating Ant Design interfaces.

## Use Cases

- Generate UI drafts in AI design tools that better follow the Ant Design visual system.
- Help design agents understand Ant Design's default theme and component usage.
- Use Ant Design's design language as a constraint for project UI generation.

## Related

- [For Agents](/docs/react/for-agents)
- [LLMs.txt](/docs/react/llms)
- [Ant Design CLI](/docs/react/cli)
