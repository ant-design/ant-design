---
category: Components
type: Data Entry
title: Checkbox
---

Checkbox.

## When To Use

- Used for selecting multiple values from several options.
- If you use only one checkbox, it is the same as using Switch to toggle between two states. The difference is that Switch will trigger the state change directly, but Checkbox just marks the state as changed and this needs to be submitted.

## API

### Checkbox

| Property      | Description             | Type      | Default  |
|----------|------------------|----------|--------|
| checked | Specifies whether the checkbox is selected. | boolean | false |
| defaultChecked | Specifies the initial state: whether or not the checkbox is selected. | boolean | false |
| onChange | The callback function that is triggered when the state changes. | Function(e:Event) | - |

### Checkbox Group

| Property      | Description             | Type      | Default  |
|----------|------------------|----------|--------|
| defaultValue | Default selected value | string[] | [] |
| value | Used for setting the currently selected value. | string[] | [] |
| options  | Specifies options | string[] | [] |
| onChange | The callback function that is triggered when the state changes. | Function(checkedValue) | - |
