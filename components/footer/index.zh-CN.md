---
category: Components
group: 布局
title: Footer
subtitle: 页脚
description: 网站页脚组件，通常用于展示链接、版权信息等。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*XXXXXAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*XXXXXAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 1
---

## 何时使用 {#when-to-use}

- 用于网站底部，展示导航链接、社交媒体链接、版权信息等内容。
- 支持多列布局、暗色/亮色主题。

## 代码演示 {#examples}

<code src="./demo/basic.tsx">基本用法</code>

## API {#api}

| 参数             | 说明         | 类型                              | 默认值         | 版本  |
| ---------------- | ------------ | --------------------------------- | -------------- | ----- |
| columns          | 列配置       | `FooterColumn[]`                  | -              | 6.4.0 |
| bottom           | 底部内容     | `ReactNode`                       | -              | 6.4.0 |
| theme            | 主题风格     | `dark` \| `light`                 | `dark`         | 6.4.0 |
| maxColumnsPerRow | 每行最大列数 | `number`                          | -              | 6.4.0 |
| backgroundColor  | 背景色       | `string`                          | -              | 6.4.0 |
| columnLayout     | 列布局方式   | `space-around` \| `space-between` | `space-around` | 6.4.0 |
| className        | 自定义类名   | `string`                          | -              | -     |
| style            | 自定义样式   | `React.CSSProperties`             | -              | -     |

### FooterColumn

| 参数  | 说明     | 类型                 | 默认值 |
| ----- | -------- | -------------------- | ------ |
| title | 列标题   | `ReactNode`          | -      |
| icon  | 列图标   | `ReactNode`          | -      |
| items | 列项列表 | `FooterColumnItem[]` | -      |

### FooterColumnItem

| 参数          | 说明           | 类型                       | 默认值  |
| ------------- | -------------- | -------------------------- | ------- |
| title         | 链接文本       | `ReactNode`                | -       |
| url           | 链接地址       | `string`                   | -       |
| openExternal  | 是否外部打开   | `boolean`                  | `false` |
| icon          | 链接图标       | `ReactNode`                | -       |
| description   | 描述文本       | `ReactNode`                | -       |
| LinkComponent | 自定义链接组件 | `React.ComponentType<any>` | -       |
