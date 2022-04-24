---
category: Components
type: Layout
title: Divider
cover: https://gw.alipayobjects.com/zos/alicdn/5swjECahe/Divider.svg
---

A divider line separates different content.

## When To Use

- Divide sections of article.
- Divide inline text and links such as the operation column of table.

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| children | The wrapped title | ReactNode | - |  |
| className | The className of container | string | - |  |
| dashed | Whether line is dashed | boolean | false |  |
| orientation | The position of title inside divider | `left` \| `right` \| `center` | `center` |  |
| orientationMargin | The margin-left/right between the title and its closest border, while the `orientation` must be `left` or `right` | string \| number | - |  |
| plain | Divider text show as plain style | boolean | true | 4.2.0 |
| style | The style object of container | CSSProperties | - |  |
| type | The direction type of divider | `horizontal` \| `vertical` | `horizontal` |  |
