---
group:
  title: AI
  order: 0.9
order: 3
title: CLI
tag: New
---

This guide explains how to use `@ant-design/cli` to query Ant Design component knowledge, analyze project usage, and guide migrations from the command line.

## What is Ant Design CLI?

[`@ant-design/cli`](https://github.com/ant-design/ant-design-cli) is an official command-line tool that brings Ant Design knowledge to your terminal. It ships all metadata locally — every prop, token, demo, and changelog entry for antd v4 / v5 / v6 — queryable in milliseconds, fully offline.

## Highlights

- **Fully offline** — All metadata ships with the package. No network calls, no latency, no API keys.
- **Version-accurate** — 55+ per-minor snapshots across v4/v5/v6. Query the exact API surface of any version.
- **Agent-optimized** — `--format json` on every command. Structured errors with codes and suggestions.
- **Bilingual** — Every component name, description, and doc has both English and Chinese. Switch with `--lang zh`.
- **Smart matching** — Typo `Buttn`? The CLI suggests `Button` using Levenshtein distance.

## Install

```bash
npm install -g @ant-design/cli
```

## Quick Start

```bash
antd info Button                    # Component props, types, defaults
antd demo Select basic              # Runnable demo source code
antd token DatePicker               # Design Token values (v5+)
antd semantic Table                 # classNames / styles structure
antd changelog 4.24.0 5.0.0 Select  # API diff across versions
antd doctor                         # Diagnose project issues
antd lint ./src                     # Check deprecated APIs & best practices
antd migrate 4 5 --apply ./src      # Agent-ready migration prompt
```

## Commands

### Knowledge Query

| Command | Description |
| --- | --- |
| `antd list` | List all components with bilingual names, categories, and `since` versions |
| `antd info <Component>` | Props table with types, defaults, `since`, and deprecated status |
| `antd doc <Component>` | Full markdown documentation for a component |
| `antd demo <Component> [name]` | Runnable demo source code (TSX) |
| `antd token [Component]` | Global or component-level Design Tokens |
| `antd semantic <Component>` | Semantic `classNames` / `styles` structure with usage examples |
| `antd changelog [v1] [v2] [component]` | Changelog entries, version ranges, or cross-version API diff |

### Project Analysis

| Command | Description |
| --- | --- |
| `antd doctor` | 10 diagnostic checks: React compat, duplicates, peer deps, SSR, babel plugins |
| `antd usage [dir]` | Import stats, sub-component breakdown (`Form.Item`), non-component exports |
| `antd lint [target]` | Deprecated APIs, accessibility gaps, performance issues, best practices |
| `antd migrate <from> <to>` | Migration checklist with auto-fixable/manual split and `--apply` agent prompt |

### Global Flags

| Flag                            | Description                         | Default     |
| ------------------------------- | ----------------------------------- | ----------- |
| `--format json\|text\|markdown` | Output format                       | `text`      |
| `--version <v>`                 | Target antd version (e.g. `5.20.0`) | auto-detect |
| `--lang en\|zh`                 | Output language                     | `en`        |
| `--detail`                      | Include extended information        | `false`     |

### MCP Server

| Command    | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| `antd mcp` | Start an MCP server with 7 tools and 2 prompts for IDE integration |

The `antd mcp` command launches a [Model Context Protocol](https://modelcontextprotocol.io/) server, allowing AI assistants to access Ant Design knowledge directly. See the [MCP Server](/docs/react/mcp-en-US) guide for full details and configuration.

## Usage with AI Tools

The CLI ships with a built-in [skill file](https://github.com/ant-design/ant-design-cli/blob/main/skills/antd/SKILL.md) that teaches code agents when and how to use each command:

```bash
npx skills add ant-design/ant-design-cli
```

| Tool | Description |
| --- | --- |
| **Claude Code** | Install as agent skill or use `antd` commands directly in terminal. [Documentation](https://docs.anthropic.com/en/docs/claude-code) |
| **Cursor** | Install skill, the agent will call CLI commands automatically. [Documentation](https://docs.cursor.com/context/@-symbols/@-docs) |
| **Codex** | Install skill to enable agent access. [Documentation](https://github.com/openai/codex) |
| **Gemini CLI** | Install skill for automatic command invocation. [Documentation](https://github.com/google-gemini/gemini-cli) |

Works with any agent supporting the [skills](https://github.com/nicepkg/agent-skills) protocol.

## Learn More

- [@ant-design/cli on GitHub](https://github.com/ant-design/ant-design-cli)
- [@ant-design/cli on npm](https://www.npmjs.com/package/@ant-design/cli)
- [Ant Design LLMs.txt Guide](/docs/react/llms-en-US)
- [Ant Design MCP Server](/docs/react/mcp-en-US)
