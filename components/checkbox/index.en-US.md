---
category: Components
type: Data Entry
title: Checkbox
---

Checkbox component.

## When To Use

- Used for selecting multiple values from several options.
- If you use only one checkbox, it is the same as using Switch to toggle between two states. The difference is that Switch will trigger the state change directly, but Checkbox just marks the state as changed and this needs to be submitted.

## API

### Props

#### Checkbox

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoFocus | get focus when component mounted | boolean | false |  |
| checked | Specifies whether the checkbox is selected. | boolean | false |  |
| defaultChecked | Specifies the initial state: whether or not the checkbox is selected. | boolean | false |  |
| disabled | Disable checkbox | boolean | false |  |
| indeterminate | indeterminate checked state of checkbox | boolean | false |  |
| onChange | The callback function that is triggered when the state changes. | Function(e:Event) | - |  |

#### Checkbox Group

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | Default selected value | string\[] | \[] |  |
| disabled | Disable all checkboxes | boolean | false |  |
| name | The `name` property of all `input[type="checkbox"]` children | string | - |  |
| options | Specifies options | string\[] | \[] |  |
| value | Used for setting the currently selected value. | string\[] | \[] |  |
| onChange | The callback function that is triggered when the state changes. | Function(checkedValue) | - |  |

### Methods

#### Checkbox

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | remove focus |         |
| focus() | get focus    |         |
