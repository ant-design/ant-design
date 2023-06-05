---
category: Components
group: Feedback
title: Spin
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*5mC5TomY4B0AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*i43_ToFrL8YAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

A spinner for displaying loading state of a page or a section.

## When To Use

When part of the page is waiting for asynchronous data or during a rendering process, an appropriate loading animation can effectively alleviate users' inquietude.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">basic Usage</code>
<code src="./demo/size.tsx">Size</code>
<code src="./demo/inside.tsx">Inside a container</code>
<code src="./demo/nested.tsx">Embedded mode</code>
<code src="./demo/tip.tsx">Customized description</code>
<code src="./demo/delayAndDebounce.tsx">delay</code>
<code src="./demo/custom-indicator.tsx">Custom spinning indicator</code>

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| delay | Specifies a delay in milliseconds for loading state (prevent flush) | number (milliseconds) | - |
| indicator | React node of the spinning indicator | ReactNode | - |
| size | The size of Spin, options: `small`, `default` and `large` | string | `default` |
| spinning | Whether Spin is visible | boolean | true |
| tip | Customize description content when Spin has children | ReactNode | - |
| wrapperClassName | The className of wrapper when Spin has children | string | - |

### Static Method

- `Spin.setDefaultIndicator(indicator: ReactNode)`

  You can define default spin element globally.

## Design Token

<ComponentTokenTable component="Spin"></ComponentTokenTable>
