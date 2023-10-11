---
category: Components
group: Data Entry
title: Slider
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*_4heQaUrFn4AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*XkgXTaudeosAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

A Slider component for displaying current value and intervals in range.

## When To Use

To input a value in a range.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/input-number.tsx">Slider with InputNumber</code>
<code src="./demo/icon-slider.tsx">Slider with icon</code>
<code src="./demo/tip-formatter.tsx">Customize tooltip</code>
<code src="./demo/event.tsx">Event</code>
<code src="./demo/mark.tsx">Graduated slider</code>
<code src="./demo/vertical.tsx">Vertical</code>
<code src="./demo/show-tooltip.tsx">Control visible of ToolTip</code>
<code src="./demo/reverse.tsx">Reverse</code>
<code src="./demo/draggableTrack.tsx">Draggable track</code>
<code src="./demo/multiple.tsx">Multiple handles</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoAdjustOverflow | Whether to automatically adjust the popup position | boolean | true | 5.8.0 |
| autoFocus | Whether get focus when component mounted | boolean | false |  |
| defaultValue | The default value of slider. When `range` is false, use number, otherwise, use \[number, number] | number \| \[number, number] | 0 \| \[0, 0] |  |
| disabled | If true, the slider will not be intractable | boolean | false |  |
| keyboard | Support using keyboard to move handlers | boolean | true | 5.2.0+ |
| dots | Whether the thumb can drag over tick only | boolean | false |  |
| included | Make effect when `marks` not null, true means containment and false means coordinative | boolean | true |  |
| marks | Tick mark of Slider, type of key must be `number`, and must in closed interval \[min, max], each mark can declare its own style | object | { number: ReactNode } \| { number: { style: CSSProperties, label: ReactNode } } |  |
| max | The maximum value the slider can slide to | number | 100 |  |
| min | The minimum value the slider can slide to | number | 0 |  |
| range | Dual thumb mode | boolean | false |  |
| reverse | Reverse the component | boolean | false |  |
| step | The granularity the slider can step through values. Must greater than 0, and be divided by (max - min) . When `marks` no null, `step` can be null | number \| null | 1 |  |
| tooltip | The tooltip relate props | [tooltip](#tooltip) | - | 4.23.0 |
| value | The value of slider. When `range` is false, use number, otherwise, use \[number, number] | number \| \[number, number] | - |  |
| vertical | If true, the slider will be vertical | boolean | false |  |
| onAfterChange | Fire when onmouseup is fired | (value) => void | - |  |
| onChange | Callback function that is fired when the user changes the slider's value | (value) => void | - |  |

### `styles` 和 `classNames` 属性

| Property | Description                                 | Version |
| -------- | ------------------------------------------- | ------- |
| track    | The track between handle to handle in range | 5.10.0  |
| tracks   | Who track in range                          | 5.10.0  |
| rail     | Background rail                             | 5.10.0  |
| handle   | The handle pointer                          | 5.10.0  |

### range

| Property       | Description                     | Type    | Default | Version |
| -------------- | ------------------------------- | ------- | ------- | ------- |
| draggableTrack | Whether range track can be drag | boolean | false   | 4.10.0  |

### tooltip

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| open | If true, Tooltip will show always, or it will not show anyway, even if dragging or hovering | boolean | - | 4.23.0 |
| placement | Set Tooltip display position. Ref [Tooltip](/components/tooltip/) | string | - | 4.23.0 |
| getPopupContainer | The DOM container of the Tooltip, the default behavior is to create a div element in body | (triggerNode) => HTMLElement | () => document.body | 4.23.0 |
| formatter | Slider will pass its value to `formatter`, and display its value in Tooltip, and hide Tooltip when return value is null | value => ReactNode \| null | IDENTITY | 4.23.0 |

## Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | Remove focus |         |
| focus() | Get focus    |         |

## Design Token

<ComponentTokenTable component="Slider"></ComponentTokenTable>
