---
group:
  title: AI
  order: 0.9
order: 1
title: LLMs.txt
tag: New
---

This guide explains how to enable AI tools to better understand Ant Design.

## What is LLMs.txt?

We support [LLMs.txt](https://llmstxt.org/) files for making the Ant Design documentation available to large language models (LLMs). This feature helps AI tools better understand our component library, its APIs, and usage patterns.

## Available Resources

### LLMs.txt Aggregated Files

We provide several aggregated files to help AI tools access our documentation:

| File | Description |
| --- | --- |
| [llms.txt](https://ant.design/llms.txt) | Navigation file with links to all documentation and components |
| [llms-full.txt](https://ant.design/llms-full.txt) | Complete component documentation (English) with implementation details and examples |
| [llms-full-cn.txt](https://ant.design/llms-full-cn.txt) | Complete component documentation (Chinese) |
| [llms-semantic.md](https://ant.design/llms-semantic.md) | Semantic component descriptions (English) with DOM structure and usage patterns |
| [llms-semantic-cn.md](https://ant.design/llms-semantic-cn.md) | Semantic component descriptions (Chinese) |

### Single Component Documentation

Access individual component documentation with `.md` suffix:

- `https://ant.design/components/button.md` (English)
- `https://ant.design/components/button-cn.md` (Chinese)

### Semantic Documentation

Each component has a semantic description file:

- `https://ant.design/components/button/semantic.md` (English)
- `https://ant.design/components/button-cn/semantic.md` (Chinese)

Semantic documentation includes:
- Component parts and their purposes
- Usage examples and best practices
- DOM structure overview

## Usage with AI Tools

| Tool | Description | Prompt |
| --- | --- | --- |
| **Cursor** | Use `@Docs` feature to include LLMs.txt, or add prompt to `.cursor/rules`. [Documentation](https://docs.cursor.com/context/@-symbols/@-docs) | `Read https://ant.design/llms-full.txt and understand Ant Design components. Use this knowledge when writing code with Ant Design.` |
| **Windsurf** | Add prompt to `.windsurf/rules` or use cascade memories. [Documentation](https://docs.windsurf.com/windsurf/cascade/memories) | `Read https://ant.design/llms-full.txt and understand Ant Design components. Use this knowledge when writing code with Ant Design.` |
| **Claude Code** | Add to CLAUDE.md or use `/memory` to persist. [Documentation](https://docs.anthropic.com/en/docs/claude-code) | `Read https://ant.design/llms-full.txt and understand Ant Design components. Use this knowledge when writing code with Ant Design.` |
| **Codex** | Add to `.codex/settings.json` or AGENTS.md. [Documentation](https://github.com/openai/codex) | `Read https://ant.design/llms-full.txt and understand Ant Design components. Use this knowledge when writing code with Ant Design.` |
| **Gemini CLI** | Use `--context` parameter or add to `.gemini/config.json`. [Documentation](https://ai.google.dev/gemini-api/docs?hl=en) | `Read https://ant.design/llms-full.txt and understand Ant Design components. Use this knowledge when writing code with Ant Design.` |
| **Trae** | Add to project's knowledge sources in settings. [Documentation](https://trae.ai/docs) | `Read https://ant.design/llms-full.txt and understand Ant Design components. Use this knowledge when writing code with Ant Design.` |
| **Qoder** | Add to `.qoder/config.yml` or use `@docs` in conversation. [Documentation](https://docs.qoder.com/) | `Read https://ant.design/llms-full.txt and understand Ant Design components. Use this knowledge when writing code with Ant Design.` |
| **Neovate Code** | Run `neovate` and describe task with prompt. [Documentation](https://github.com/neovateai/neovate-code) | `Read https://ant.design/llms-full.txt and understand Ant Design components. Use this knowledge when writing code with Ant Design.` |

