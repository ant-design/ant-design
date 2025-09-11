---
group:
  title: Advanced
order: 7
title: LLMs.txt
tag: New
---

This guide explains how to enable AI tools like Cursor, Windsurf, GitHub Copilot, ChatGPT, and Claude to better understand Ant Design.

## What is LLMs.txt?

We support [LLMs.txt](https://llmstxt.org/) files for making the Ant Design documentation available to large language models (LLMs). This feature helps AI tools better understand our component library, its APIs, and usage patterns.

## Available Routes

We provide several LLMs.txt routes to help AI tools access our documentation:

- [llms.txt](https://ant.design/llms.txt) - Contains a structured overview of all components and their documentation links
- [llms-full.txt](https://ant.design/llms-full.txt) - Provides comprehensive documentation including implementation details and examples

## Usage with AI Tools

### Cursor

Use the `@Docs` feature in Cursor to include the LLMs.txt files in your project. This helps Cursor provide more accurate code suggestions and documentation for Ant Design components.

[Read more about @Docs in Cursor](https://docs.cursor.com/context/@-symbols/@-docs)

### Windsurf

Reference the LLMs.txt files using `@` or in your `.windsurfrules` files to enhance Windsurf's understanding of Ant Design components.

[Read more about Windsurf Memories](https://docs.codeium.com/windsurf/memories#memories-and-rules)

### Other AI Tools

Any AI tool that supports LLMs.txt can use these routes to better understand Ant Design. Simply point your tool to any of the routes above.
