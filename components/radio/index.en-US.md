---
category: Components
group: Data Entry
title: Radio
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*M-YKTJnWM2kAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*a9roS6DHFIcAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

Radio.

## When To Use

- Used to select a single state from multiple options.
- The difference from Select is that Radio is visible to the user and can facilitate the comparison of choice, which means there shouldn't be too many of them.

## Examples

<!-- prettier-ignore-start -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/disabled.tsx">disabled</code>
<code src="./demo/radiogroup.tsx">Radio Group</code>
<code src="./demo/radiogroup-more.tsx">Vertical Radio.Group</code>
<code src="./demo/radiogroup-options.tsx">Radio.Group group - optional</code>
<code src="./demo/radiobutton.tsx">radio style</code>
<code src="./demo/radiogroup-with-name.tsx">Radio.Group with name</code>
<code src="./demo/size.tsx">Size</code>
<code src="./demo/radiobutton-solid.tsx">Solid radio button</code>
<code src="./demo/badge.tsx" debug>Badge style</code>
<code src="./demo/wireframe.tsx" debug>Wireframe</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>
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
| name | The `name` property of all `input[type="radio"]` children | string | - |  |
| options | Set children optional | string\[] \| number\[] \| Array&lt;{ label: ReactNode; value: string; disabled?: boolean; }> | - |  |
| optionType | Set Radio optionType | `default` \| `button` | `default` | 4.4.0 |
| size | The size of radio button style | `large` \| `middle` \| `small` | - |  |
| value | Used for setting the currently selected value | any | - |  |
| onChange | The callback function that is triggered when the state changes | function(e:Event) | - |  |

## Methods

### Radio

| Name    | Description  |
| ------- | ------------ |
| blur()  | Remove focus |
| focus() | Get focus    |

## Design Token

<ComponentTokenTable component="Radio"></ComponentTokenTable>
