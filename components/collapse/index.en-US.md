---
category: Components
type: Views
title: Collapse
---

A content area which can be collapsed and expanded.

## When to use

- Can be used to group or hide complex regions to keep the page clean.
- `Accordion` is a special kind of `Collapse`, which allows only one panel to be expanded at a time.

## API

### Collapse

| Property     | Description           | Type     | Default       |
|----------|----------------|----------|--------------|
| activeKey    | key of the active panel | Array or String   | No default value. In `accordion` mode, it's the key of the first panel.  |
| defaultActiveKey    | key of the initialized active panel | String   | - |
| onChange | a callback function, which can be executed when you switch the panels | Function   |  -  |

### Collapse.Panel

| Property     | Description           | Type     | Default       |
|----------|----------------|----------|--------------|
| key    | corresponds to the `activeKey` | String   |  -  |
| header    | title of the panel | React.Element or String   | - |

