---
category: Components
type: Feedback
title: Spin
cover: https://gw.alipayobjects.com/zos/alicdn/LBcJqCPRv/Spin.svg
---

A spinner for displaying loading state of a page or a section.

## When To Use

When part of the page is waiting for asynchronous data or during a rendering process, an appropriate loading animation can effectively alleviate users' inquietude.

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| delay | Specifies a delay in milliseconds for loading state (prevent flush) | number (milliseconds) | - |
| indicator | React node of the spinning indicator | ReactNode | - |
| size | The size of Spin, options: `small`, `default` and `large` | string | `default` |
| spinning | Whether Spin is spinning | boolean | true |
| tip | Customize description content when Spin has children | string | - |
| wrapperClassName | The className of wrapper when Spin has children | string | - |

### Static Method

- `Spin.setDefaultIndicator(indicator: ReactNode)`

  You can define default spin element globally.
