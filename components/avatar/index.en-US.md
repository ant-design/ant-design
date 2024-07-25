---
category: Components
title: Avatar
description: Used to represent users or things, supporting the display of images, icons, or characters.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*JJBSS5lBG4IAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YbgyQaRGz-UAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: Data Display
  order: 5
---

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/type.tsx">Type</code>
<code src="./demo/dynamic.tsx">Autoset Font Size</code>
<code src="./demo/badge.tsx">With Badge</code>
<code src="./demo/group.tsx">Avatar.Group</code>
<code src="./demo/toggle-debug.tsx" debug>Calculate text style when hiding</code>
<code src="./demo/responsive.tsx">Responsive Size</code>
<code src="./demo/fallback.tsx" debug>Fallback</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Avatar

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| alt | This attribute defines the alternative text describing the image | string | - |  |
| gap | Letter type unit distance between left and right sides | number | 4 | 4.3.0 |
| icon | Custom icon type for an icon avatar | ReactNode | - |  |
| shape | The shape of avatar | `circle` \| `square` | `circle` |  |
| size | The size of the avatar | number \| `large` \| `small` \| `default` \| { xs: number, sm: number, ...} | `default` | 4.7.0 |
| src | The address of the image for an image avatar or image element | string \| ReactNode | - | ReactNode: 4.8.0 |
| srcSet | A list of sources to use for different screen resolutions | string | - |  |
| draggable | Whether the picture is allowed to be dragged | boolean \| `'true'` \| `'false'` | true |  |
| crossOrigin | CORS settings attributes | `'anonymous'` \| `'use-credentials'` \| `''` | - | 4.17.0 |
| onError | Handler when img load error, return false to prevent default fallback behavior | () => boolean | - |  |

> Tip: You can set `icon` or `children` as the fallback for image load error, with the priority of `icon` > `children`

### Avatar.Group (4.5.0+)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| max | Set maximum display related configurations, Before `5.18.0` you can use [parameters](https://github.com/ant-design/ant-design/blob/9d134859becbdae5b9ce276f6d9af4264691d81f/components/avatar/group.tsx#L35-L38) | `{ count?: number; style?: CSSProperties; popover?: PopoverProps }` | - | 5.18.0 |
| size | The size of the avatar | number \| `large` \| `small` \| `default` \| { xs: number, sm: number, ...} | `default` | 4.8.0 |
| shape | The shape of the avatar | `circle` \| `square` | `circle` | 5.8.0 |

## Design Token

<ComponentTokenTable component="Avatar"></ComponentTokenTable>
