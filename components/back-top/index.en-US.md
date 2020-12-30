---
category: Components
type: Other
title: BackTop
cover: https://gw.alipayobjects.com/zos/alicdn/tJZ5jbTwX/BackTop.svg
---

`BackTop` makes it easy to go back to the top of the page.

## When To Use

- When the page content is very long.
- When you need to go back to the top very frequently in order to view the contents.

## API

> The distance to the bottom is set to `50px` by default, which is overridable.
>
> If you decide to use custom styles, please note the size limit: no more than `40px * 40px`.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| duration | Time to return to top（ms） | number | 450 | 4.4.0 |
| target | Specifies the scrollable area dom node | () => HTMLElement | () => window |  |
| visibilityHeight | The BackTop button will not show until the scroll height reaches this value | number | 400 |  |
| onClick | A callback function, which can be executed when you click the button | function | - |  |
