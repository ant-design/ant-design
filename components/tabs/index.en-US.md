---
category: Components
type: Data Display
title: Tabs
cols: 1
---

Tabs make it easy to switch between different views.

### When To Use

Ant Design has 3 types of Tabs for different situations.

- Card Tabs: for managing too many closeable views.
- Normal Tabs: for functional aspects of a page.
- [RadioButton](/components/radio/#components-radio-demo-radiobutton): for secondary tabs.

## API

### Tabs

| Property     | Description           | Type     | Default      |
|--------------|-----------------------|----------|--------------|
| activeKey    | Current TabPane's key| string   | - |
| defaultActiveKey | Initial active TabPane's key, if `activeKey` is not set. | string | - |
| onChange     | Callback executed when active tab is changed | Function | - |
| onTabClick   | Callback executed when tab is clicked | Function | - |
| onPrevClick  | Callback executed when prev button is clicked | Function | - |
| onNextClick  | Callback executed when next button is clicked | Function | - |
| tabBarExtraContent | Extra content in tab bar | React.ReactNode | - |
| tabBarStyle  | Tab bar style object           | object   | - |
| type         | Basic style of tabs | `line` \| `card` \| `editable-card` | `line` |
| size         | Tab bar size. Only works while `type="line"`. | `default` \| `small` | `default` |
| tabPosition  | Position of tabs | `top` \| `right` \| `bottom` \| `left` | `top` |
| onEdit       | Callback executed when tab is added or removed. Only works while `type="editable-card"` | (targetKey, action): void | - |
| hideAdd      | Hide plus icon or not. Only works while `type="editable-card"` | boolean | `false` |
| animated | Whether to change tabs with animation. Only works while `tabPosition="top"\|"bottom"` | boolean \| {inkBar:boolean, tabPane:boolean} | `true`, `false` when `type="card"` |

### Tabs.TabPane
| Property     | Description           | Type     | Default      |
|--------------|-----------------------|----------|--------------|
| key          | TabPane's key         | string   | - |
| tab          | Show text in TabPane's head | string\|ReactNode | - |
