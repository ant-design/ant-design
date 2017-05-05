---
category: Components
type: Data Display
title: Collapse
cols: 1
---

A content area which can be collapsed and expanded.

## When To Use

- Can be used to group or hide complex regions to keep the page clean.
- `Accordion` is a special kind of `Collapse`, which allows only one panel to be expanded at a time.

## API

### Collapse

| Property     | Description           | Type     | Default       |
|----------|----------------|----------|--------------|
| activeKey    | key of the active panel | string[]\|string   | No default value. In `accordion` mode, it's the key of the first panel.  |
| defaultActiveKey    | key of the initialized active panel | string   | - |
| onChange | a callback function, which can be executed when you switch the panels | Function   |  -  |

### Collapse.Panel

| Property     | Description           | Type     | Default       |
|----------|----------------|----------|--------------|
| key    | corresponds to the `activeKey` | string   |  -  |
| header    | title of the panel | string\|ReactNode   | - |
