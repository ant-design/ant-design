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

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| activeKey | Current TabPane's key | string | - |  |
| animated | Whether to change tabs with animation. Only works while `tabPosition="top"\|"bottom"` | boolean \| {inkBar:boolean, tabPane:boolean} | `true`, `false` when `type="card"` |  |
| renderTabBar | replace the TabBar | (props: DefaultTabBarProps, DefaultTabBar: React.ReactNode) => React.ReactNode | - | 3.9.0 |
| defaultActiveKey | Initial active TabPane's key, if `activeKey` is not set. | string | - |  |
| hideAdd | Hide plus icon or not. Only works while `type="editable-card"` | boolean | `false` |  |
| size | preset tab bar size | `large` \| `default` \| `small` | `default` |  |
| tabBarExtraContent | Extra content in tab bar | React.ReactNode | - |  |
| tabBarGutter | The gap between tabs | number | - | 3.2.0 |
| tabBarStyle | Tab bar style object | object | - |  |
| tabPosition | Position of tabs | `top` \| `right` \| `bottom` \| `left` | `top` |  |
| type | Basic style of tabs | `line` \| `card` \| `editable-card` | `line` |  |
| onChange | Callback executed when active tab is changed | Function(activeKey) {} | - |  |
| onEdit | Callback executed when tab is added or removed. Only works while `type="editable-card"` | (targetKey, action): void | - |  |
| onNextClick | Callback executed when next button is clicked | Function | - |  |
| onPrevClick | Callback executed when prev button is clicked | Function | - |  |
| onTabClick | Callback executed when tab is clicked | Function(key: string, event: MouseEvent) | - |  |

More option at [rc-tabs option](https://github.com/react-component/tabs#tabs)

### Tabs.TabPane

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| forceRender | Forced render of content in tabs, not lazy render after clicking on tabs | boolean | false |  |
| key | TabPane's key | string | - |  |
| tab | Show text in TabPane's head | string\|ReactNode | - |  |

More option at [rc-tabs option](https://github.com/react-component/tabs#tabpane)
