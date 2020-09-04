---
category: Components
type: Data Display
title: Badge
cover: https://gw.alipayobjects.com/zos/antfincdn/6%26GF9WHwvY/Badge.svg
---

Small numerical value or status descriptor for UI elements.

## When To Use

Badge normally appears in proximity to notifications or user avatars with eye-catching appeal, typically displaying unread messages count.

## API

### Badge

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| color | Customize Badge dot color | string | - |  |
| count | Number to show in badge | ReactNode | - |  |
| dot | Whether to display a red dot instead of `count` | boolean | false |  |
| offset | Set offset of the badge dot | \[number, number] | - |  |
| overflowCount | Max count to show | number | 99 |  |
| showZero | Whether to show badge when `count` is zero | boolean | false |  |
| status | Set Badge as a status dot | `success` \| `processing` \| `default` \| `error` \| `warning` | - |  |
| size | If `count` is set, `size` sets the size of badge | `default` \| `small` | - | 4.6.0 |
| text | If `status` is set, `text` sets the display text of the status `dot` | ReactNode | - |  |
| title | Text to show when hovering over the badge | string | - |  |

### Badge.Ribbon (4.5.0+)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| color | Customize Ribbon color | string | - |  |
| placement | The placement of the Ribbon, `start` and `end` follow text direction (RTL or LTR) | `start` \| `end` | `end` |  |
| text | Content inside the Ribbon | ReactNode | - |  |
