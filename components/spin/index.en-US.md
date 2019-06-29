---
category: Components
type: Feedback
title: Spin
---

A spinner for displaying loading state of a page or a section.

## When To Use

When part of the page is waiting for asynchronous data or during a rendering process, an appropriate loading animation can effectively alleviate users' inquietude.

## API

| Property | Description | Type | Default Value | Version Added |
| --- | --- | --- | --- | --- |
| delay | specifies a delay in milliseconds for loading state (prevent flush) | number (milliseconds) | - | 3.0.0 |
| indicator | React node of the spinning indicator | ReactElement | - | 3.0.0 |
| size | size of Spin, options: `small`, `default` and `large` | string | `default` | 3.0.0 |
| spinning | whether Spin is spinning | boolean | true | 3.0.0 |
| tip | customize description content when Spin has children | string | - | 3.0.0 |
| wrapperClassName | className of wrapper when Spin has children | string | - | 3.0.0 |

### Static Method

- `Spin.setDefaultIndicator(indicator: ReactElement)`  
  As `indicator`, you can define the global default spin element
