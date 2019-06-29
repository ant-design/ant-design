---
category: Components
type: Data Entry
title: Switch
---

Switching Selector.

## When To Use

- If you need to represent the switching between two states or on-off state.
- The difference between `Switch` and `Checkbox` is that `Switch` will trigger a state change directly when you toggle it, while `Checkbox` is generally used for state marking, which should work in conjunction with submit operation.

## API

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| autoFocus | get focus when component mounted | boolean | false | 3.0.0 |
| checked | determine whether the `Switch` is checked | boolean | false | 3.0.0 |
| checkedChildren | content to be shown when the state is checked | string\|ReactNode |  | 3.0.0 |
| defaultChecked | to set the initial state | boolean | false | 3.0.0 |
| disabled | Disable switch | boolean | false | 3.0.0 |
| loading | loading state of switch | boolean | false | 3.0.0 |
| size | the size of the `Switch`, options: `default` `small` | string | default | 3.0.0 |
| unCheckedChildren | content to be shown when the state is unchecked | string\|ReactNode |  | 3.0.0 |
| onChange | trigger when the checked state is changing | Function(checked: boolean, event: Event) |  | 3.0.0 |
| onClick | trigger when clicked | Function(checked: boolean, event: Event) |  | 3.13.0 |
| className | additional class to Switch | string | - | 3.10.1 |

## Methods

| Name    | Description  | Version Added |
| ------- | ------------ | ------------- |
| blur()  | remove focus | 3.0.0         |
| focus() | get focus    | 3.0.0         |
