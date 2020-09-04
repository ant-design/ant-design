---
category: Components
type: Data Display
title: Tabs
cols: 1
cover: https://gw.alipayobjects.com/zos/antfincdn/lkI2hNEDr2V/Tabs.svg
---

Tabs make it easy to switch between different views.

### When To Use

Ant Design has 3 types of Tabs for different situations.

- Card Tabs: for managing too many closeable views.
- Normal Tabs: for functional aspects of a page.
- [Radio.Button](/components/radio/#components-radio-demo-radiobutton): for secondary tabs.

## API

### Tabs

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| addIcon | Customize add icon | ReactNode | - | 4.4.0 |
| activeKey | Current TabPane's key | string | - |  |
| animated | Whether to change tabs with animation. Only works while `tabPosition="top" | "bottom"` | boolean \| {inkBar: boolean, tabPane: boolean} | false |  |
| renderTabBar | Replace the TabBar | (props: DefaultTabBarProps, DefaultTabBar: React.ComponentClass) => React.ReactElement | - |  |
| defaultActiveKey | Initial active TabPane's key, if `activeKey` is not set | string | - |  |
| hideAdd | Hide plus icon or not. Only works while `type="editable-card"` | boolean | false |  |
| size | Preset tab bar size | `large` \| `default` \| `small` | `default` |  |
| centered | Centers tabs | boolean | false | 4.4.0 |
| tabBarExtraContent | Extra content in tab bar | ReactNode \| {left?: ReactNode, right?: ReactNode} | - |  |
| tabBarGutter | The gap between tabs | number | - |  |
| tabBarStyle | Tab bar style object | object | - |  |
| tabPosition | Position of tabs | `top` \| `right` \| `bottom` \| `left` | `top` |  |
| type | Basic style of tabs | `line` \| `card` \| `editable-card` | `line` |  |
| onChange | Callback executed when active tab is changed | function(activeKey) {} | - |  |
| onEdit | Callback executed when tab is added or removed. Only works while `type="editable-card"` | (targetKey, action) => void | - |  |
| onTabClick | Callback executed when tab is clicked | function(key: string, event: MouseEvent) | - |  |
| onTabScroll | Trigger when tab scroll | function({ direction: `left` \| `right` \| `top` \| `bottom` }) | - | 4.3.0 |
| keyboard | Whether to turn on keyboard navigation | boolean | true |  |

More option at [rc-tabs option](https://github.com/react-component/tabs#tabs)

### Tabs.TabPane

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| forceRender | Forced render of content in tabs, not lazy render after clicking on tabs | boolean | false |
| key | TabPane's key | string | - |
| tab | Show text in TabPane's head | string \| ReactNode | - |
| closeIcon | Customize close icon in TabPane's head. Only works while `type="editable-card"` | ReactNode | - |

More option at [rc-tabs option](https://github.com/react-component/tabs#tabpane)
