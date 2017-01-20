---
category: Components
type: Navigation
title: Tabs
---

Tabs make it easy to switch between different views.

### When To Use

Ant Design has 3 types Tabs for different situation.

- Card Tabs: for managing too many closeable views.
- Normal Tabs: for functional aspects of a page.
- [RadioButton](/components/radio/#components-radio-demo-radiobutton): for secondary tabs.

## API

### Tabs

| Property     | Description           | Type     | Default      |
|--------------|-----------------------|----------|--------------|
| activeKey    | Current TabPane's key| string   | _             |
| defaultActiveKey | Default actived tabPanel's key, if activeKey is not setted. | - |
| onChange     | Callback when tab is switched | Function | - |
| onTabClick   | Callback when tab is clicked | Function | - |
| tabBarExtraContent | Extra element in tab bar | React.ReactNode | - |
| type         | Basic style of tabs. Options: line, card & editable-card | string | line |
| size         | Tab bar size. Options: default, small. Only works while `type="line"`. | string | default |
| tabPosition  | Position of tabs. Options: top, right, bottom & left | string | top |
| onEdit       | Callback when tab is added or removed, which is executing when set type as editable-card | (targetKey, action): void | - |
| hideAdd      | Hide plus icon or not, which is effective when set type as editable-card | boolean | false |
| animated | Whether to change tabs with animation, this property only works with `tabPosition=top|bottom` | boolean | true |

### Tabs.TabPane
| Property     | Description           | Type     | Default      |
|--------------|-----------------------|----------|--------------|
| key          | TabPane's key         | string   | _            |
| tab          | Show text in TabPane's head | string\|ReactNode | _ |
