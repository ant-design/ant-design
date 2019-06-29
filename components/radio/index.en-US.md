---
category: Components
type: Data Entry
title: Radio
---

Radio.

## When To Use

- Used to select a single state from multiple options.
- The difference from Select is that Radio is visible to the user and can facilitate the comparison of choice, which means there shouldn't be too many of them.

## API

### Radio

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| autoFocus | get focus when component mounted | boolean | false | 3.0.0 |
| checked | Specifies whether the radio is selected. | boolean | - | 3.0.0 |
| defaultChecked | Specifies the initial state: whether or not the radio is selected. | boolean | false | 3.0.0 |
| disabled | Disable radio | boolean | false | 3.0.0 |
| value | According to value for comparison, to determine whether the selected | any | - | 3.0.0 |

### RadioGroup

Radio group can wrap a group of `Radio`。

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| defaultValue | Default selected value | any | - | 3.0.0 |
| disabled | Disable all radio buttons | boolean | false | 3.0.0 |
| name | The `name` property of all `input[type="radio"]` children | string | - | 3.0.0 |
| options | set children optional | string\[] \| Array&lt;{ label: string value: string disabled?: boolean }> | - | 3.0.0 |
| size | size for radio button style | `large` \| `default` \| `small` | `default` | 3.0.0 |
| value | Used for setting the currently selected value. | any | - | 3.0.0 |
| onChange | The callback function that is triggered when the state changes. | Function(e:Event) | - | 3.0.0 |
| buttonStyle | style type of radio button | `outline` \| `solid` | `outline` | 3.7.0 |

## Methods

### Radio

| Name    | Description  | Version Added |
| ------- | ------------ | ------------- |
| blur()  | remove focus | 3.0.0         |
| focus() | get focus    | 3.0.0         |
