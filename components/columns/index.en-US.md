---
category: Components
type: Layout
title: Columns
cols: 1
cover: https://allenai.org/favicon.ico
---

Convenience wrapper of Grid.
Given a breakpoint, on small screens, degrades to a single column.

## When To Use

When you need a simple grid or a grid that degrades to a single column on smaller screens.

## API

| Property            | Description                                    | Type                                          | Default   |
| ------------------- | ---------------------------------------------- | --------------------------------------------- | --------- |
| count               | number of equal sized columns                  | number                                        | undefined |
| gridTemplateColumns | specific column count and sizes                | string                                        | undefined |
| breakpoint          | breakpoint at which we drop to a single column | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xl2' | undefined |
