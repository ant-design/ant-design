---
category: Components
group: Layout
title: Footer
subtitle: Page Footer
description: Website footer component, typically used to display links, copyright info, etc.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*XXXXXAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*XXXXXAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 1
---

## When to use {#when-to-use}

- Used at the bottom of the website to display navigation links, social media links, copyright info, etc.
- Supports multi-column layout and dark/light theme.

## Examples {#examples}

<code src="./demo/basic.tsx">Basic Usage</code>

## API {#api}

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| columns | Column configuration | `FooterColumn[]` | - | 6.4.0 |
| bottom | Bottom content | `ReactNode` | - | 6.4.0 |
| theme | Theme style | `dark` \| `light` | `dark` | 6.4.0 |
| maxColumnsPerRow | Max columns per row | `number` | - | 6.4.0 |
| backgroundColor | Background color | `string` | - | 6.4.0 |
| columnLayout | Column layout | `space-around` \| `space-between` | `space-around` | 6.4.0 |
| className | Custom className | `string` | - | - |
| style | Custom style | `React.CSSProperties` | - | - |

### FooterColumn

| Property | Description  | Type                 | Default |
| -------- | ------------ | -------------------- | ------- |
| title    | Column title | `ReactNode`          | -       |
| icon     | Column icon  | `ReactNode`          | -       |
| items    | Column items | `FooterColumnItem[]` | -       |

### FooterColumnItem

| Property      | Description           | Type                       | Default |
| ------------- | --------------------- | -------------------------- | ------- |
| title         | Link text             | `ReactNode`                | -       |
| url           | Link url              | `string`                   | -       |
| openExternal  | Open externally       | `boolean`                  | `false` |
| icon          | Link icon             | `ReactNode`                | -       |
| description   | Description text      | `ReactNode`                | -       |
| LinkComponent | Custom link component | `React.ComponentType<any>` | -       |
