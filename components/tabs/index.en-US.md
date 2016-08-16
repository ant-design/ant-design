---
category: Components
type: Navigation
english: Tabs
---

Tabs make it easy to switch between different views.

### When to use

Ant Design has 3 types Tabs for different situation.

- Card Tabs: for managing too many closeable views.

- Normall Tabs: for functional aspects of a page.

- RadioButton: for secondary tabs.

## API

### Tabs

| Property     | Description           | Type     | Default      |
|--------------|-----------------------|----------|--------------|
| activeKey    | Current TabPane's key| String   | _             |
| defaultActiveKey | Default actived tabPanel's key, if activeKey is not setted. | - |
| onChange     | Callback when tab is switched | Function | - |
| onTabClick   | Callback when tab is clicked | Function | - |
| tabBarExtraContent | Extra element in tab bar | React Node | - |
| type         | Basic style of tabs. Options: line, card & editable-card | String | line |
| size         | Tab bar size. Options: default, small | String | default |
| tabPosition  | Position of tabs. Options: top, right, bottom & left | String | top |
| onEdit       | Callback when tab is added or removed, which is executing when set type as editable-card | Function(targetKey, action) | - |
| hideAdd      | Hide plus icon or not, which is effective when set type as editable-card | Boolean | false |

### Tabs.TabPane
| Property     | Description           | Type     | Default      |
|--------------|-----------------------|----------|--------------|
| key          | TabPane's key         | String   | _            |
| tab          | Show text in TabPane's head | React.Element or String | _ |