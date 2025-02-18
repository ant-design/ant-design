---
category: Components
group: Data Entry
title: Radio
description: Used to select a single state from multiple options.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*mrPVRope68wAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*xPfTSphsiA0AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

- Used to select a single state from multiple options.
- The difference from Select is that Radio is visible to the user and can facilitate the comparison of choice, which means there shouldn't be too many of them.

```tsx
// When use Radio.Group, recommended ✅
return (
  <Radio.Group
    value={value}
    options={[
      { value: 1, label: 'A' },
      { value: 2, label: 'B' },
      { value: 3, label: 'C' },
    ]}
  />
);

// No recommended 🙅🏻‍♀️
return (
  <Radio.Group value={value}>
    <Radio value={1}>A</Radio>
    <Radio value={2}>B</Radio>
    <Radio value={3}>C</Radio>
  </Radio.Group>
);
```

## Examples

<!-- prettier-ignore-start -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/disabled.tsx">disabled</code>
<code src="./demo/radiogroup.tsx">Radio Group</code>
<code src="./demo/radiogroup-more.tsx">Vertical Radio.Group</code>
<code src="./demo/radiogroup-block.tsx" version="5.21.0">Block Radio.Group</code>
<code src="./demo/radiogroup-options.tsx">Radio.Group group - optional</code>
<code src="./demo/radiobutton.tsx">radio style</code>
<code src="./demo/radiogroup-with-name.tsx">Radio.Group with name</code>
<code src="./demo/size.tsx">Size</code>
<code src="./demo/radiobutton-solid.tsx">Solid radio button</code>
<code src="./demo/badge.tsx" debug>Badge style</code>
<code src="./demo/wireframe.tsx" debug>Wireframe</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>
<code src="./demo/debug-upload.tsx" debug>Upload Debug</code>
<!-- prettier-ignore-end -->

## API

Common props ref：[Common props](/docs/react/common-props)

### Radio/Radio.Button

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| autoFocus | Whether get focus when component mounted | boolean | false |
| checked | Specifies whether the radio is selected | boolean | false |
| defaultChecked | Specifies the initial state: whether or not the radio is selected | boolean | false |
| disabled | Disable radio | boolean | false |
| value | According to value for comparison, to determine whether the selected | any | - |

### RadioGroup

Radio group can wrap a group of `Radio`。

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| buttonStyle | The style type of radio button | `outline` \| `solid` | `outline` |  |
| defaultValue | Default selected value | any | - |  |
| disabled | Disable all radio buttons | boolean | false |  |
| name | The `name` property of all `input[type="radio"]` children. If not set, it will fallback to a randomly generated name | string | - |  |
| options | Set children optional | string\[] \| number\[] \| Array&lt;[CheckboxOptionType](#checkboxoptiontype)> | - |  |
| optionType | Set Radio optionType | `default` \| `button` | `default` | 4.4.0 |
| size | The size of radio button style | `large` \| `middle` \| `small` | - |  |
| value | Used for setting the currently selected value | any | - |  |
| block | Option to fit RadioGroup width to its parent width | boolean | false | 5.21.0 |
| onChange | The callback function that is triggered when the state changes | function(e:Event) | - |  |

### CheckboxOptionType

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| label | The text used to display as the Radio option | `string` | - | 4.4.0 |
| value | The value associated with the Radio option | `string` \| `number` \| `boolean` | - | 4.4.0 |
| style | The style to apply to the Radio option | `React.CSSProperties` | - | 4.4.0 |
| disabled | Specifies whether the Radio option is disabled | `boolean` | `false` | 4.4.0 |
| title | Adds the Title attribute value | `string` | - | 4.4.0 |
| id | Adds the Radio Id attribute value | `string` | - | 4.4.0 |
| onChange | Triggered when the value of the Radio Group changes | `(e: CheckboxChangeEvent) => void;` | - | 4.4.0 |
| required | Specifies whether the Radio option is required | `boolean` | `false` | 4.4.0 |

## Methods

### Radio

| Name    | Description  |
| ------- | ------------ |
| blur()  | Remove focus |
| focus() | Get focus    |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Radio"></ComponentTokenTable>
