---
category: Components
title: Avatar
subtitle: 头像
description: 用来代表用户或事物，支持图片、图标或字符展示。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*JJBSS5lBG4IAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YbgyQaRGz-UAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 数据展示
  order: 5
---

## 设计师专属 {#designers-exclusive}

安装 [Kitchen Sketch 插件 💎](https://kitchen.alipay.com)，一键填充高逼格头像和文本。

## 代码演示 {#examples}

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/type.tsx">类型</code>
<code src="./demo/dynamic.tsx">自动调整字符大小</code>
<code src="./demo/badge.tsx">带徽标的头像</code>
<code src="./demo/group.tsx">Avatar.Group</code>
<code src="./demo/toggle-debug.tsx" debug>隐藏情况下计算字符对齐</code>
<code src="./demo/responsive.tsx">响应式尺寸</code>
<code src="./demo/fallback.tsx" debug>图片不存在时</code>
<code src="./demo/component-token.tsx" debug>组件 Token</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

### Avatar

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| alt | 图像无法显示时的替代文本 | string | - |  |
| gap | 字符类型距离左右两侧边界单位像素 | number | 4 | 4.3.0 |
| icon | 设置头像的自定义图标 | ReactNode | - |  |
| shape | 指定头像的形状 | `circle` \| `square` | `circle` |  |
| size | 设置头像的大小 | number \| `large` \| `medium` \| `small` \| { xs: number, sm: number, ...} | `medium` | 4.7.0 |
| src | 图片类头像的资源地址或者图片元素 | string \| ReactNode | - | ReactNode: 4.8.0 |
| srcSet | 设置图片类头像响应式资源地址 | string | - |  |
| draggable | 图片是否允许拖动 | boolean \| `'true'` \| `'false'` | true |  |
| crossOrigin | CORS 属性设置 | `'anonymous'` \| `'use-credentials'` \| `''` | - | 4.17.0 |
| onError | 图片加载失败的事件，返回 false 会关闭组件默认的 fallback 行为 | () => boolean | - |  |

> Tip：你可以设置 `icon` 或 `children` 作为图片加载失败的默认 fallback 行为，优先级为 `icon` > `children`

### Avatar.Group <Badge>4.5.0+</Badge>

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| max | 设置最多显示相关配置 | `{ count?: number; style?: CSSProperties; popover?: PopoverProps }` | - | 5.18.0 |
| ~~maxCount~~ | 已废弃，请使用 `max={{ count: number }}` | number | - |  |
| ~~maxPopoverPlacement~~ | 已废弃，请使用 `max={{ popover: PopoverProps }}` | `top` \| `bottom` | `top` |  |
| ~~maxPopoverTrigger~~ | 已废弃，请使用 `max={{ popover: PopoverProps }}` | `hover` \| `focus` \| `click` | `hover` |  |
| ~~maxStyle~~ | 已废弃，请使用 `max={{ style: CSSProperties }}` | CSSProperties | - |  |
| size | 设置头像的大小 | number \| `large` \| `medium` \| `small` \| { xs: number, sm: number, ...} | `medium` | 4.8.0 |
| shape | 设置头像的形状 | `circle` \| `square` | `circle` | 5.8.0 |

## 主题变量（Design Token）{#design-token}

<ComponentTokenTable component="Avatar"></ComponentTokenTable>
