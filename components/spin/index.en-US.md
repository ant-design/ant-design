---
category: Components
group: Feedback
title: Spin
description: Used for the loading status of a page or a block.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*5mC5TomY4B0AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*i43_ToFrL8YAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

When part of the page is waiting for asynchronous data or during a rendering process, an appropriate loading animation can effectively alleviate users' inquietude.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic Usage</code>
<code src="./demo/size.tsx">Size</code>
<code src="./demo/nested.tsx">Embedded mode</code>
<code src="./demo/tip.tsx">Customized description</code>
<code src="./demo/delayAndDebounce.tsx">Delay</code>
<code src="./demo/min-duration.tsx" version="6.6.0">Minimum duration</code>
<code src="./demo/custom-indicator.tsx">Custom spinning indicator</code>
<code src="./demo/percent.tsx" version="5.18.0">Progress</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/fullscreen.tsx">Fullscreen</code>

## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version | [Global Config](/components/config-provider#component-config) |
| --- | --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  | 6.0.0 |
| delay | Specifies a delay in milliseconds for loading state (prevent flush) | number (milliseconds) | - |  | × |
| description | Customize description content | ReactNode | - | 6.3.0 | × |
| fullscreen | Display a backdrop with the `Spin` component | boolean | false | 5.11.0 | × |
| indicator | React node of the spinning indicator | ReactNode | - |  | 5.20.0 |
| minDuration | Minimum duration that the loading state remains visible after it appears. When used with `delay`, the delay is not included in `minDuration`; if `spinning` ends during the delay, the loading state does not appear. Setting `spinning` to `true` again during the minimum duration cancels the pending hide and continues the current visible period without restarting the timer | number (milliseconds) | 0 | 6.6.0 | × |
| percent | The progress percentage, when set to `auto`, it will be an indeterminate progress | number \| 'auto' | - | 5.18.0 | × |
| size | The size of Spin, options: `small`, `medium` and `large` | string | `medium` |  | × |
| spinning | Whether Spin is visible | boolean | true |  | × |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  | 6.0.0 |
| ~~tip~~ | Customize description content when Spin has children. Deprecated, use `description` instead | ReactNode | - |  | × |
| ~~wrapperClassName~~ | The className of wrapper when Spin has children. Deprecated, use `classNames.root` instead | string | - |  | × |

### Static Method

- `Spin.setDefaultIndicator(indicator: ReactNode)`

  You can define default spin element globally.

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Spin"></ComponentTokenTable>
