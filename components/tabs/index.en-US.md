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

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| activeKey | Current TabPane's key | string | - | 3.0.0 |
| animated | Whether to change tabs with animation. Only works while `tabPosition="top"\|"bottom"` | boolean \| {inkBar:boolean, tabPane:boolean} | `true`, `false` when `type="card"` | 3.0.0 |
| renderTabBar | replace the TabBar | (props: DefaultTabBarProps, DefaultTabBar: React.ReactNode) => React.ReactNode | - | 3.9.0 |
| defaultActiveKey | Initial active TabPane's key, if `activeKey` is not set. | string | - | 3.0.0 |
| hideAdd | Hide plus icon or not. Only works while `type="editable-card"` | boolean | `false` | 3.0.0 |
| size | preset tab bar size | `large` \| `default` \| `small` | `default` | 3.0.0 |
| tabBarExtraContent | Extra content in tab bar | React.ReactNode | - | 3.0.0 |
| tabBarGutter | The gap between tabs | number | - | 3.2.0 |
| tabBarStyle | Tab bar style object | object | - | 3.0.0 |
| tabPosition | Position of tabs | `top` \| `right` \| `bottom` \| `left` | `top` | 3.0.0 |
| type | Basic style of tabs | `line` \| `card` \| `editable-card` | `line` | 3.0.0 |
| onChange | Callback executed when active tab is changed | Function(activeKey) {} | - | 3.0.0 |
| onEdit | Callback executed when tab is added or removed. Only works while `type="editable-card"` | (targetKey, action): void | - | 3.0.0 |
| onNextClick | Callback executed when next button is clicked | Function | - | 3.0.0 |
| onPrevClick | Callback executed when prev button is clicked | Function | - | 3.0.0 |
| onTabClick | Callback executed when tab is clicked | Function(key: string, event: MouseEvent) | - | 3.0.0 |

More option at [rc-tabs option](https://github.com/react-component/tabs#tabs)

### Tabs.TabPane

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| forceRender | Forced render of content in tabs, not lazy render after clicking on tabs | boolean | false | 3.0.0 |
| key | TabPane's key | string | - | 3.0.0 |
| tab | Show text in TabPane's head | string\|ReactNode | - | 3.0.0 |

More option at [rc-tabs option](https://github.com/react-component/tabs#tabpane)
