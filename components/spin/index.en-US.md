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
<code src="./demo/custom-indicator.tsx">Custom spinning indicator</code>
<code src="./demo/percent.tsx" version="5.18.0">Progress</code>
<code src="./demo/fullscreen.tsx">Fullscreen</code>

## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| delay | Specifies a delay in milliseconds for loading state (prevent flush) | number (milliseconds) | - |
| fullscreen | Display a backdrop with the `Spin` component | boolean | false | 5.11.0 |
| indicator | React node of the spinning indicator | ReactNode | - |  |
| percent | The progress percentage, when set to `auto`, it will be an indeterminate progress | number \| 'auto' | - | 5.18.0 |
| size | The size of Spin, options: `small`, `default` and `large` | string | `default` |  |
| spinning | Whether Spin is visible | boolean | true |  |
| tip | Customize description content when Spin has children | ReactNode | - |  |
| wrapperClassName | The className of wrapper when Spin has children | string | - |  |

### Static Method

- `Spin.setDefaultIndicator(indicator: ReactNode)`

  You can define default spin element globally.

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Spin"></ComponentTokenTable>
