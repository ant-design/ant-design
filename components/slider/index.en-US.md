---
category: Components
group: Data Entry
title: Slider
description: A Slider component for displaying current value and intervals in range.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*_4heQaUrFn4AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*XkgXTaudeosAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

Used to input a value within a specified range.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/input-number.tsx">Slider with InputNumber</code>
<code src="./demo/icon-slider.tsx">Slider with icon</code>
<code src="./demo/tip-formatter.tsx">Customize tooltip</code>
<code src="./demo/event.tsx">Event</code>
<code src="./demo/mark.tsx">Graduated slider</code>
<code src="./demo/vertical.tsx">Vertical</code>
<code src="./demo/show-tooltip.tsx">Control visibility of Tooltip</code>
<code src="./demo/reverse.tsx">Reverse</code>
<code src="./demo/draggableTrack.tsx">Draggable track</code>
<code src="./demo/multiple.tsx">Multiple handles</code>
<code src="./demo/editable.tsx" version="5.20.0">Dynamic edit nodes</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoFocus | Whether to get focus when component is mounted | boolean | false |  |
| classNames | Semantic structure className | [Record<SemanticDOM, string>](#semantic-dom) | - | 5.10.0 |
| defaultValue | The default value of the slider. When `range` is false, use number, otherwise, use \[number, number] | number \| \[number, number] | 0 \| \[0, 0] |  |
| disabled | If true, the slider will not be interactive | boolean | false |  |
| keyboard | Support using keyboard to move handlers | boolean | true | 5.2.0+ |
| dots | Whether the thumb can only be dragged to tick marks | boolean | false |  |
| included | Takes effect when `marks` is not null. True means containment and false means coordinative | boolean | true |  |
| marks | Tick marks of Slider. The type of key must be `number`, and must be in closed interval \[min, max]. Each mark can declare its own style | object | { number: ReactNode } \| { number: { style: CSSProperties, label: ReactNode } } |  |
| max | The maximum value the slider can slide to | number | 100 |  |
| min | The minimum value the slider can slide to | number | 0 |  |
| range | Enable dual thumb mode for range selection | boolean | false |  |
| reverse | Reverse the component | boolean | false |  |
| step | The granularity the slider can step through values. Must be greater than 0, and be divisible by (max - min). When `step` is `null` and `marks` exist, valid points will only be marks, `min` and `max` | number \| null | 1 |  |
| styles | Semantic structure style | [Record<SemanticDOM, React.CSSProperties>](#semantic-dom) | - | 5.10.0 |
| tooltip | The tooltip related props | [tooltip](#tooltip) | - | 4.23.0 |
| value | The value of slider. When `range` is false, use number, otherwise, use \[number, number] | number \| \[number, number] | - |  |
| vertical | If true, the slider will be vertical | boolean | false |  |
| onChangeComplete | Fire when `mouseup` or `keyup` is fired | (value) => void | - |  |
| onChange | Callback function that is fired when the user changes the slider's value | (value) => void | - |  |

### range

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| draggableTrack | Whether range track can be dragged | boolean | false | - |
| editable | Dynamic edit nodes. Cannot be used with `draggableTrack` | boolean | false | 5.20.0 |
| minCount | The minimum count of nodes | number | 0 | 5.20.0 |
| maxCount | The maximum count of nodes | number | - | 5.20.0 |

### tooltip

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoAdjustOverflow | Whether to automatically adjust the popup position | boolean | true | 5.8.0 |
| open | If true, Tooltip will always be visible; if false, it will never be visible, even when dragging or hovering | boolean | - | 4.23.0 |
| placement | Set Tooltip display position. Ref [Tooltip](/components/tooltip/) | string | - | 4.23.0 |
| getPopupContainer | The DOM container of the Tooltip. The default behavior is to create a div element in the body | (triggerNode) => HTMLElement | () => document.body | 4.23.0 |
| formatter | Slider will pass its value to `formatter`, display its value in Tooltip, and hide the Tooltip when the returned value is null | value => ReactNode \| null | IDENTITY | 4.23.0 |

## Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | Remove focus |         |
| focus() | Get focus    |         |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Slider"></ComponentTokenTable>
