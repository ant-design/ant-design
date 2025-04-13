---
category: Components
group: Data Entry
title: Checkbox
description: Collect user's choices.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*DzgiRbW3khIAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*G3MjTYXL6AIAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

- Used for selecting multiple values from several options.
- If you use only one checkbox, it is the same as using Switch to toggle between two states. The difference is that Switch will trigger the state change directly, but Checkbox just marks the state as changed and this needs to be submitted.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/disabled.tsx">Disabled</code>
<code src="./demo/controller.tsx">Controlled Checkbox</code>
<code src="./demo/group.tsx">Checkbox Group</code>
<code src="./demo/check-all.tsx">Check all</code>
<code src="./demo/layout.tsx">Use with Grid</code>
<code src="./demo/debug-line.tsx" debug>Same line</code>
<code src="./demo/debug-disable-popover.tsx" debug>Disabled to show Tooltip</code>
<code src="./demo/custom-line-width.tsx" debug>customize lineWidth</code>

## API

Common props ref：[Common props](/docs/react/common-props)

#### Checkbox

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoFocus | If get focus when component mounted | boolean | false |  |
| checked | Specifies whether the checkbox is selected | boolean | false |  |
| defaultChecked | Specifies the initial state: whether or not the checkbox is selected | boolean | false |  |
| disabled | If disable checkbox | boolean | false |  |
| indeterminate | The indeterminate checked state of checkbox | boolean | false |  |
| onChange | The callback function that is triggered when the state changes | (e: CheckboxChangeEvent) => void | - |  |
| onBlur | Called when leaving the component | function() | - |  |
| onFocus | Called when entering the component | function() | - |  |

#### Checkbox Group

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | Default selected value | (string \| number)\[] | \[] |  |
| disabled | If disable all checkboxes | boolean | false |  |
| name | The `name` property of all `input[type="checkbox"]` children | string | - |  |
| options | Specifies options | string\[] \| number\[] \| Option\[] | \[] |  |
| value | Used for setting the currently selected value | (string \| number \| boolean)\[] | \[] |  |
| onChange | The callback function that is triggered when the state changes | (checkedValue: T[]) => void | - |  |

##### Option

```typescript
interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}
```

### Methods

#### Checkbox

| Name          | Description                          | Version |
| ------------- | ------------------------------------ | ------- |
| blur()        | Remove focus                         |         |
| focus()       | Get focus                            |         |
| nativeElement | Returns the DOM node of the Checkbox | 5.17.3  |

## Design Token

<ComponentTokenTable component="Checkbox"></ComponentTokenTable>

## FAQ

### Why not work in Form.Item?

Form.Item default bind value to `value` property, but Checkbox value property is `checked`. You can use `valuePropName` to change bind property.

```tsx | pure
<Form.Item name="fieldA" valuePropName="checked">
  <Checkbox />
</Form.Item>
```
