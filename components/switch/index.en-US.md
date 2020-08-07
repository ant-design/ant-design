---
category: Components
type: Data Entry
title: Switch
cover: https://gw.alipayobjects.com/zos/alicdn/zNdJQMhfm/Switch.svg
---

Switching Selector.

## When To Use

- If you need to represent the switching between two states or on-off state.
- The difference between `Switch` and `Checkbox` is that `Switch` will trigger a state change directly when you toggle it, while `Checkbox` is generally used for state marking, which should work in conjunction with submit operation.

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| autoFocus | Whether get focus when component mounted | boolean | false |
| checked | Determine whether the Switch is checked | boolean | false |
| checkedChildren | The content to be shown when the state is checked | string \| ReactNode | - |
| defaultChecked | Whether to set the initial state | boolean | false |
| disabled | Disable switch | boolean | false |
| loading | Loading state of switch | boolean | false |
| size | The size of the Switch, options: `default` `small` | string | `default` |
| unCheckedChildren | The content to be shown when the state is unchecked | string \| ReactNode | - |
| onChange | Trigger when the checked state is changing | function(checked: boolean, event: Event) | - |
| onClick | Trigger when clicked | function(checked: boolean, event: Event) | - |
| className | The additional class to Switch | string | - |

## Methods

| Name    | Description  |
| ------- | ------------ |
| blur()  | Remove focus |
| focus() | Get focus    |
