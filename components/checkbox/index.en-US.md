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
| autoFocus | get focus when component mounted | boolean | false | 3.6.2 |
| checked | Specifies whether the checkbox is selected. | boolean | false | 3.6.2 |
| defaultChecked | Specifies the initial state: whether or not the checkbox is selected. | boolean | false | 3.6.2 |
| disabled | Disable checkbox | boolean | false | 3.6.2 |
| indeterminate | indeterminate checked state of checkbox | boolean | false | 3.6.2 |
| onChange | The callback function that is triggered when the state changes. | Function(e:Event) | - | 3.6.2 |

#### Checkbox Group

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | Default selected value | string\[] | \[] | 3.6.2 |
| disabled | Disable all checkboxes | boolean | false | 3.6.2 |
| name | The `name` property of all `input[type="checkbox"]` children | string | - | 3.16.0 |
| options | Specifies options | string\[] | \[] | 3.6.2 |
| value | Used for setting the currently selected value. | string\[] | \[] | 3.6.2 |
| onChange | The callback function that is triggered when the state changes. | Function(checkedValue) | - | 3.6.2 |

### Methods

#### Checkbox

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | remove focus | 3.6.2   |
| focus() | get focus    | 3.6.2   |
