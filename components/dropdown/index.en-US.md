---
category: Components
type: Views
english: Dropdown
---

A dropdown list.

## When To Use

If there are too many operations to display, you can wrap them in a `Dropdown`. By clicking/hovering on the trigger, a dropdown menu should appear, which allows you to choose one option and execute relevant actions.

## API

### Dropdown

| Property         | Description           | Type     | Default       |
|--------------|----------------|----------|--------------|
| trigger        | the trigger mode which can excute the drop-down action  | ['click'] or ['hover']   | ['hover']           |
| overlay | the dropdown menu       | [Menu](/components/menu)   | -           |
| getPopupContainer       | to set the container of the dropdown menu. The default is to create a `div` element in `body`, you can reset it to the scrolling area and make a relative reposition. [example](http://codepen.io/anon/pen/xVBOVQ?editors=001)   | Function(triggerNode)   | () => document.body |
| visible | determine whether the dropdown menu is visible | Boolean | -           |
| onVisibleChange     | a callback function takes an argument: `visible`, can be executed when the visible state is changing | Function           | - |

You can get the menu list by `antd.Menu`, and set a callback function `onSelect` for it if you need. The menu items and the dividers are also available, by using `antd.Menu.Item` and `antd.Menu.Divider` respectively.

> Warning: You must set a unique `key` for `Menu.Item`.


### DropdownButton

| Property         | Description           | Type     | Default       |
|--------------|----------------|----------|--------------|
| type        | type of the button, the same as [Button](/components/button)   | String   | 'default'           |
| onClick | a callback function, the same as [Button](/components/button), which will be executed when you click the button on the left       | Function   | -           |
| trigger       | the trigger mode which can excute the drop-down action | ['click'] or ['hover']   | ['hover'] |
| overlay | the dropdown menu | [Menu](/components/menu) | -           |
| visible     | determine whether the dropdown menu is visible | Boolean | -           |
| onVisibleChange     | a callback function takes an argument: `visible`, can be executed when the visible state is changing | Function     | -        |


