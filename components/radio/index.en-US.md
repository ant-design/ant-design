---
category: Components
type: Data Entry
title: Radio
---

Radio.

## When To Use

- Used to select a single state in multiple options.
- The difference between Select is that Radio is visible to user and can facilitate the comparison of choice. So, when you want to use Radio, option should not be too much.

## API

### Radio

| Property           | Description                                     | Type       |  optional | Default |
|----------------|------------------------------------------|------------|---------|--------|
| checked | Specifies whether the radio is selected. | boolean | | false |
| defaultChecked | Specifies the initial state: whether or not the radio is selected. | boolean | | false |
| value          | According to value for comparison, to determine whether the selected        | any     |         | none     |

### RadioGroup

radio group，wrap a group of `Radio`。

| Property           | Description                             | Type              | optional | Default |
|----------------|----------------------------------|-------------------|--------|--------|
| onChange | The callback function that is triggered when the state changes. | Function(e:Event) | none     | none     |
| value | Used for setting the currently selected value. | any            | none     | none     |
| defaultValue   | Default selected value                     | any            | none     | none     |
| size           | Size, only on radio style           | string            | `large` `default` `small` | `default` |
| options        | set children optional               | string[] \| Array<{ label: string value: string disabled?: boolean }>            | 无     | 无     |
