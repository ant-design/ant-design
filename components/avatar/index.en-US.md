---
category: Components
type: Data Display
title: Avatar
cover: https://gw.alipayobjects.com/zos/antfincdn/aBcnbw68hP/Avatar.svg
---

Avatars can be used to represent people or objects. It supports images, `Icon`s, or letters.

## API

### Avatar

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| icon | Custom icon type for an icon avatar | ReactNode | - |  |
| shape | The shape of avatar | `circle` \| `square` | `circle` |  |
| size | The size of the avatar | number \| `large` \| `small` \| `default` \| `{ xs: number, sm: number, ...}` | `default` | 4.7.0 |
| src | The address of the image for an image avatar | string | - |  |
| srcSet | A list of sources to use for different screen resolutions | string | - |  |
| alt | This attribute defines the alternative text describing the image | string | - |  |
| onError | Handler when img load error, return false to prevent default fallback behavior | () => boolean | - |  |
| gap | Letter type unit distance between left and right sides | number | 4 | 4.3.0 |

> Tip: You can set `icon` or `children` as the fallback for image load error, with the priority of `icon` > `children`

### Avatar.Group (4.5.0+)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| maxCount | Max avatars to show | number | - |  |
| maxStyle | The style of excess avatar style | CSSProperties | - |  |
| maxPopoverPlacement | The placement of excess avatar Popover | `top` \| `bottom` | `top` |  |
| size | The size of excess avatar | number \| `large` \| `small` \| `default` \| `{ xs: number, sm: number, ...}` | `default` | 4.8.0 |
