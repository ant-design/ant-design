---
group:
  title: AI
  order: 0.9
order: 4
title: CLI
tag: New
---

This guide explains how to use `@ant-design/cli` to query Ant Design component knowledge, analyze project usage, and guide migrations from the command line.

## What is Ant Design CLI?

[`@ant-design/cli`](https://github.com/ant-design/ant-design-cli) is an official command-line tool that brings Ant Design knowledge to your terminal. It ships all metadata locally — every prop, token, demo, and changelog entry for antd v3 / v4 / v5 / v6 — queryable in milliseconds, fully offline.

## Highlights

- **Fully offline** — All metadata ships with the package. No network calls, no latency, no API keys.
- **Version-accurate** — 55+ per-minor snapshots across v3/v4/v5/v6. Query the exact API surface of any version.
- **Agent-optimized** — `--format json` on every command. Structured errors with codes and suggestions.
- **Bilingual** — Every component name, description, and doc has both English and Chinese. Switch with `--lang zh`.
- **Smart matching** — Typo `Buttn`? The CLI suggests `Button` using Levenshtein distance.
- **18 commands** — From prop lookup to project-wide lint, from design tokens to MCP/Skill setup.

## Install

```bash
npm install -g @ant-design/cli
```

Requires Node.js `>=20.0.0`. You can also install globally with `pnpm add -g @ant-design/cli` or `bun add -g @ant-design/cli`.

## Quick Start

```bash
antd list                           # All components with versions
antd info Button                    # Component props, types, defaults
antd doc Button                     # Full markdown documentation
antd demo Select basic              # Runnable demo source code
antd token DatePicker               # Design Token values (v5+)
antd design.md                      # Design-language document (design.md)
antd semantic Table                 # classNames / styles structure
antd changelog 4.24.0 5.0.0 Select  # API diff across versions
antd doctor                         # Diagnose project issues
antd env                            # Collect env info for bug reports
antd usage ./src                    # Analyze antd imports in project
antd lint ./src                     # Check deprecated APIs & best practices
antd migrate 3 4                    # v3 to v4 migration guide
antd migrate 4 5 --apply ./src      # Agent-ready migration prompt
antd mcp                            # Start MCP server for IDE integration
antd setup --client claude          # Set up MCP/Skill for AI agents
antd upgrade                        # Upgrade CLI to latest version
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
| `antd design.md` | Design-language document for AI design tools |
| `antd semantic <Component>` | Semantic `classNames` / `styles` structure with usage examples |
| `antd changelog [v1] [v2] [component]` | Changelog entries, version ranges, or cross-version API diff |

#### antd design.md {#design-md}

`antd design.md` outputs the design language description file for Ant Design, conformant with the [google-labs-code/design.md](https://github.com/google-labs-code/design.md) specification. This file is intended for AI design tools (Figma Make, Google Stitch, etc.) so they can generate UI that follows Ant Design's visual language.

```bash
antd design.md                # Output the full design.md content
antd design.md --format json  # JSON format output
antd design.md --lang zh      # Chinese descriptions
```

The file includes:

- **YAML front-matter** — Structured token definitions for colors, typography, rounded corners, spacing, and core components, with `{path.to.token}` reference syntax
- **Overview** — Ant Design's four design values (Natural, Certain, Meaningful, Growing)
- **Colors** — Functional colors, preset palette, and why neutrals use `rgba()`
- **Typography** — 14px base font size, font stack, two-weight constraint
- **Layout** — 4px grid, spacing scale, three-layer surface model
- **Elevation & Depth** — Four shadow tiers, motion durations and easings
- **Shapes** — 6px default radius and per-component classifications
- **Components** — Style descriptions for core component archetypes and states
- **Do's and Don'ts** — Design guidance rules

The file is also published at [ant.design/design.md](https://ant.design/design.md) and can be read directly by AI tools via URL.

### Project Analysis

| Command | Description |
| --- | --- |
| `antd doctor` | 10 diagnostic checks: React compat, duplicates, peer deps, SSR, babel plugins |
| `antd env [dir]` | Collect all antd-related environment information for bug reports or AI diagnosis |
| `antd usage [dir]` | Import stats, sub-component breakdown (`Form.Item`), non-component exports |
| `antd lint [target]` | Deprecated APIs, accessibility gaps, performance issues, best practices |
| `antd migrate <from> <to>` | Migration checklist with auto-fixable/manual split and `--apply` agent prompt |

### Issue Reporting

| Command        | Description                                   |
| -------------- | --------------------------------------------- |
| `antd bug`     | Submit a bug to the ant-design repository     |
| `antd bug-cli` | Submit a bug to the ant-design-cli repository |

### CLI Management

| Command | Description |
| --- | --- |
| `antd mcp` | Start an MCP server with 8 tools and 2 prompts for IDE integration (Claude Code, Cursor, VS Code, etc.) |
| `antd setup` | Set up Ant Design MCP/Skill for Claude Code, Cursor, VS Code, or Codex |
| `antd upgrade` | Upgrade the CLI to the latest version |

The `antd mcp` command launches a [Model Context Protocol](https://modelcontextprotocol.io/) server, allowing AI assistants to access Ant Design knowledge directly. See the [MCP Server](/docs/react/mcp) guide for full details and configuration.

The `antd setup` command can write MCP configuration, install the bundled Ant Design skill, or both:

```bash
antd setup --client claude
antd setup --client cursor --mode both
antd setup --client vscode --write-instructions
antd setup --client codex
antd setup --client claude --dry-run
antd setup --client claude --check
```

### Global Flags

| Flag                            | Description                         | Default     |
| ------------------------------- | ----------------------------------- | ----------- |
| `--format json\|text\|markdown` | Output format                       | `text`      |
| `--version <v>`                 | Target antd version (e.g. `5.20.0`) | auto-detect |
| `--lang en\|zh`                 | Output language                     | `en`        |
| `--detail`                      | Include extended information        | `false`     |
| `-V, --cli-version`             | Print the CLI version               | -           |

Version auto-detection order: `--version` flag, `node_modules/antd`, `package.json` dependencies, then fallback.

### Environment Variables

| Variable                | Description                                                       |
| ----------------------- | ----------------------------------------------------------------- |
| `ANTD_NO_AUTO_REPORT=1` | Disable AI-agent bug-reporting suggestions                        |
| `NO_UPDATE_CHECK=1`     | Skip the silent version update check                              |
| `CI=1`                  | Skip the silent version update check, same as `NO_UPDATE_CHECK=1` |

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
- [Ant Design LLMs.txt Guide](/docs/react/llms)
- [Ant Design MCP Server](/docs/react/mcp)
