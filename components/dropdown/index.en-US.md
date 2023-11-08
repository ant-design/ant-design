---
category: Components
group: Navigation
title: Dropdown
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*mBBcQ6goljkAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*5qm4S4Zgh2QAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

A dropdown list.

## When To Use

When there are more than a few options to choose from, you can wrap them in a `Dropdown`. By hovering or clicking on the trigger, a dropdown menu will appear, which allows you to choose an option and execute the relevant action.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/placement.tsx">Placement</code>
<code src="./demo/arrow.tsx">Arrow</code>
<code src="./demo/item.tsx">Other elements</code>
<code src="./demo/arrow-center.tsx">Arrow pointing at the center</code>
<code src="./demo/trigger.tsx">Trigger mode</code>
<code src="./demo/event.tsx">Click event</code>
<code src="./demo/dropdown-button.tsx">Button with dropdown menu</code>
<code src="./demo/custom-dropdown.tsx">Custom dropdown</code>
<code src="./demo/sub-menu.tsx">Cascading menu</code>
<code src="./demo/overlay-open.tsx">The way of hiding menu.</code>
<code src="./demo/context-menu.tsx">Context Menu</code>
<code src="./demo/loading.tsx">Loading</code>
<code src="./demo/selectable.tsx">Selectable Menu</code>
<code src="./demo/menu-full.tsx" debug>Menu full styles</code>
<code src="./demo/render-panel.tsx" debug>\_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/icon-debug.tsx" debug>Icon debug</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Dropdown

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| arrow | Whether the dropdown arrow should be visible | boolean \| { pointAtCenter: boolean } | false |  |
| autoAdjustOverflow | Whether to adjust dropdown placement automatically when dropdown is off screen | boolean | true | 5.2.0 |
| autoFocus | Focus element in `overlay` when opened | boolean | false | 4.21.0 |
| disabled | Whether the dropdown menu is disabled | boolean | - |  |
| destroyPopupOnHide | Whether destroy dropdown when hidden | boolean | false |  |
| dropdownRender | Customize dropdown content | (menus: ReactNode) => ReactNode | - | 4.24.0 |
| getPopupContainer | To set the container of the dropdown menu. The default is to create a div element in body, but you can reset it to the scrolling area and make a relative reposition. [Example on CodePen](https://codepen.io/afc163/pen/zEjNOy?editors=0010) | (triggerNode: HTMLElement) => HTMLElement | () => document.body |  |
| menu | The menu props | [MenuProps](/components/menu/#api) | - | 4.24.0 |
| overlayClassName | The class name of the dropdown root element | string | - |  |
| overlayStyle | The style of the dropdown root element | CSSProperties | - |  |
| placement | Placement of popup menu: `bottom` `bottomLeft` `bottomRight` `top` `topLeft` `topRight` | string | `bottomLeft` |  |
| trigger | The trigger mode which executes the dropdown action. Note that hover can't be used on touchscreens | Array&lt;`click`\|`hover`\|`contextMenu`> | \[`hover`] |  |
| open | Whether the dropdown menu is currently open. Use `visible` under 4.23.0 ([why?](/docs/react/faq#why-open)) | boolean | - | 4.23.0 |
| onOpenChange | Called when the open state is changed. Not trigger when hidden by click item. Use `onVisibleChange` under 4.23.0 ([why?](/docs/react/faq#why-open)) | (open: boolean, info: { source: 'trigger' \| 'menu' }) => void | - | `info.source`: 5.11.0 |

### Dropdown.Button

Same props from Dropdown. And includes additional props:

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| buttonsRender | Custom buttons inside Dropdown.Button | (buttons: ReactNode\[]) => ReactNode\[] | - |  |
| loading | Set the loading status of button | boolean \| { delay: number } | false |  |
| danger | Set the danger status of button | boolean | - | 4.23.0 |
| icon | Icon (appears on the right) | ReactNode | - |  |
| size | Size of the button, the same as [Button](/components/button/#api) | string | `default` |  |
| type | Type of the button, the same as [Button](/components/button/#api) | string | `default` |  |
| onClick | The same as [Button](/components/button/#api): called when you click the button on the left | (event) => void | - |  |

## Note

Please ensure that the child node of `Dropdown` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.

## Design Token

<ComponentTokenTable component="Dropdown"></ComponentTokenTable>

## FAQ

### How to prevent Dropdown from being squeezed when it exceeds the screen horizontally?

You can use `width: max-content` style to handle this. ref [#43025](https://github.com/ant-design/ant-design/issues/43025#issuecomment-1594394135).
