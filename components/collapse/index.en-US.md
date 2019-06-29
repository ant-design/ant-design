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

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| activeKey | Key of the active panel | string\[]\|string | No default value. In `accordion` mode, it's the key of the first panel. | 3.0.0 |
| defaultActiveKey | Key of the initial active panel | string | - | 3.0.0 |
| bordered | Toggles rendering of the border around the collapse block | boolean | `true` | 3.6.5 |
| accordion | If `true`, `Collapse` renders as `Accordion` | boolean | `false` | 3.6.5 |
| onChange | Callback function executed when active panel is changed | Function | - | 3.0.0 |
| expandIcon | allow to customize collapse icon | (panelProps) => ReactNode | - | 3.13.0 |
| expandIconPosition | Set expand icon position: `left`, `right` | `left` | - | 3.17.0 |
| destroyInactivePanel | Destroy Inactive Panel | boolean | `false` | 3.6.5 |

### Collapse.Panel

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| disabled | If `true`, panel cannot be opened or closed | boolean | `false` | 3.0.0 |
| forceRender | Forced render of content on panel, instead of lazy rending after clicking on header | boolean | `false` | 3.2.0 |
| header | Title of the panel | string\|ReactNode | - | 3.0.0 |
| key | Unique key identifying the panel from among its siblings | string | - | 3.0.0 |
| showArrow | If `false`, panel will not show arrow icon | boolean | `true` | 3.1.0 |
| extra | extra element in the corner | ReactNode | - | 3.14.0 |
