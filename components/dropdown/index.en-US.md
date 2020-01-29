---
category: Components
type: Navigation
title: Dropdown
---

A dropdown list.

## When To Use

When there are more than a few options to choose from, you can wrap them in a `Dropdown`. By hovering or clicking on the trigger, a dropdown menu will appear, which allows you to choose an option and execute the relevant action.

## API

### Dropdown

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| disabled | Whether the dropdown menu is disabled | boolean | - |  |
| getPopupContainer | To set the container of the dropdown menu. The default is to create a `div` element in `body`, but you can reset it to the scrolling area and make a relative reposition. [Example on CodePen](https://codepen.io/afc163/pen/zEjNOy?editors=0010). | Function(triggerNode) | `() => document.body` |  |
| overlay | The dropdown menu | [Menu](/components/menu) \| () => Menu | - |  |
| overlayClassName | Class name of the dropdown root element | string | - | 3.11.0 |
| overlayStyle | Style of the dropdown root element | object | - | 3.11.0 |
| placement | Placement of popup menu: `bottomLeft`, `bottomCenter`, `bottomRight`, `topLeft`, `topCenter` or `topRight` | String | `bottomLeft` |  |
| trigger | The trigger mode which executes the dropdown action. Note that hover can't be used on touchscreens. | Array&lt;`click`\|`hover`\|`contextMenu`> | `['hover']` |  |
| visible | Whether the dropdown menu is currently visible | boolean | - |  |
| onVisibleChange | Called when the visible state is changed. | Function(visible) | - |  |

You should use [Menu](/components/menu/) as `overlay`. The menu items and dividers are also available by using `Menu.Item` and `Menu.Divider`.

> Warning: You must set a unique `key` for `Menu.Item`.
>
> Menu of Dropdown is unselectable by default, you can make it selectable via `<Menu selectable>`.

### Dropdown.Button

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| disabled | Whether the dropdown menu is disabled | boolean | - |  |
| icon | Icon (appears on the right) | ReactNode | - | 3.17.0 |
| overlay | The dropdown menu | [Menu](/components/menu) | - |  |
| placement | Placement of popup menu: `bottomLeft` `bottomCenter` `bottomRight` `topLeft` `topCenter` `topRight` | String | `bottomLeft` |  |
| size | Size of the button, the same as [Button](/components/button) | string | `default` |  |
| trigger | The trigger mode which executes the dropdown action | Array&lt;`click`\|`hover`\|`contextMenu`> | `['hover']` |  |
| type | Type of the button, the same as [Button](/components/button) | string | `default` |  |
| visible | Whether the dropdown menu is currently visible | boolean | - |  |
| onClick | The same as [Button](/components/button): called when you click the button on the left | Function | - |  |
| onVisibleChange | Called when the visible state is changed | Function | - |  |
