---
category: Components
group: Data Display
title: Tabs
description: Tabs make it easy to explore and switch between different views.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*72NDQqXkyOEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*8HMoTZUoSGoAAAAAAAAAAAAADrJ8AQ/original
---

### When To Use

Ant Design has 3 types of Tabs for different situations.

- Card Tabs: for managing too many closeable views.
- Normal Tabs: for functional aspects of a page.
- [Radio.Button](/components/radio/#radio-demo-radiobutton): for secondary tabs.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/disabled.tsx">Disabled</code>
<code src="./demo/centered.tsx">Centered</code>
<code src="./demo/icon.tsx">Icon</code>
<code src="./demo/custom-indicator.tsx">Indicator</code>
<code src="./demo/slide.tsx">Slide</code>
<code src="./demo/extra.tsx">Extra content</code>
<code src="./demo/size.tsx">Size</code>
<code src="./demo/position.tsx">Position</code>
<code src="./demo/card.tsx">Card type tab</code>
<code src="./demo/editable-card.tsx">Add & close tab</code>
<code src="./demo/card-top.tsx" compact background="grey" debug>Container of card type Tab</code>
<code src="./demo/custom-add-trigger.tsx">Customized trigger of new tab</code>
<code src="./demo/custom-tab-bar.tsx">Customized bar of tab</code>
<code src="./demo/custom-tab-bar-node.tsx">Draggable Tabs</code>
<code src="./demo/animated.tsx" debug>Animated</code>
<code src="./demo/nest.tsx" debug>Nest</code>
<code src="./demo/component-token.tsx" debug>component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Tabs

<!-- prettier-ignore -->
| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| activeKey | Current TabPane's key | string | - |  |
| addIcon | Customize add icon, only works with `type="editable-card"` | ReactNode | `<PlusOutlined />` | 4.4.0 |
| animated | Whether to change tabs with animation. | boolean \| { inkBar: boolean, tabPane: boolean } | { inkBar: true, tabPane: false } |  |
| centered | Centers tabs | boolean | false | 4.4.0 |
| defaultActiveKey | Initial active TabPane's key, if `activeKey` is not set | string | `The key of first tab` |  |
| hideAdd | Hide plus icon or not. Only works while `type="editable-card"` | boolean | false |  |
| indicator | Customize `size` and `align` of indicator | { size?: number \| (origin: number) => number; align: `start` \| `center` \| `end`; } | - | 5.13.0 |
| items | Configure tab content | [TabItemType](#tabitemtype) | [] | 4.23.0 |
| more | Customize the collapse menu | [MoreProps](#moreprops) | { icon: `<EllipsisOutlined />` , trigger: 'hover' } |  |
| removeIcon | The custom icon of remove, only works with `type="editable-card"` | ReactNode | `<CloseOutlined />` | 5.15.0 |
| popupClassName | `className` for more dropdown. | string | - | 4.21.0 |
| renderTabBar | Replace the TabBar | (props: DefaultTabBarProps, DefaultTabBar: React.ComponentClass) => React.ReactElement | - |  |
| size | Preset tab bar size | `large` \| `middle` \| `small` | `middle` |  |
| tabBarExtraContent | Extra content in tab bar | ReactNode \| {left?: ReactNode, right?: ReactNode} | - | object: 4.6.0 |
| tabBarGutter | The gap between tabs | number | - |  |
| tabBarStyle | Tab bar style object | CSSProperties | - |  |
| tabPosition | Position of tabs | `top` \| `right` \| `bottom` \| `left` | `top` |  |
| destroyInactiveTabPane | Whether destroy inactive TabPane when change tab | boolean | false |  |
| type | Basic style of tabs | `line` \| `card` \| `editable-card` | `line` |  |
| onChange | Callback executed when active tab is changed | (activeKey: string) => void | - |  |
| onEdit | Callback executed when tab is added or removed. Only works while `type="editable-card"` | (action === 'add' ? event : targetKey, action) => void | - |  |
| onTabClick | Callback executed when tab is clicked | (key: string, event: MouseEvent) => void | - |  |
| onTabScroll | Trigger when tab scroll | ({ direction: `left` \| `right` \| `top` \| `bottom` }) => void | - | 4.3.0 |

More option at [rc-tabs tabs](https://github.com/react-component/tabs#tabs)

### TabItemType

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| closeIcon | Customize close icon in TabPane's head. Only works while `type="editable-card"`. 5.7.0: close button will be hidden when setting to `null` or `false` | ReactNode | - |  |
| destroyInactiveTabPane | Whether destroy inactive TabPane when change tab | boolean | false | 5.11.0 |
| disabled | Set TabPane disabled | boolean | false |  |
| forceRender | Forced render of content in tabs, not lazy render after clicking on tabs | boolean | false |  |
| key | TabPane's key | string | - |  |
| label | TabPane's head display text | ReactNode | - |  |
| icon | TabPane's head display icon | ReactNode | - | 5.12.0 |
| children | TabPane's head display content | ReactNode | - |  |
| closable | Whether a close (x) button is visible, Only works while `type="editable-card"` | boolean | true |  |

### MoreProps

| Property                                  | Description     | Type      | Default | Version |
| ----------------------------------------- | --------------- | --------- | ------- | ------- |
| icon                                      | The custom icon | ReactNode | -       |         |
| [DropdownProps](/components/dropdown#api) |                 |           |         |         |

## Design Token

<ComponentTokenTable component="Tabs"></ComponentTokenTable>
