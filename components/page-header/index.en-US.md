---
category: Components
type: Navigation
title: PageHeader
cols: 1
subtitle: PageHeader
---

The header is used to declare the theme of the page, which contains the most important information that the user is concerned about.

## When To Use

Use when you need the user to quickly understand what the current page is and what its features are.

## API

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| title | title string | ReactNode | - |
| subTitle | subTitle string | ReactNode | - |
| backIcon | custom back icon, if false the back icon will not be displayed | ReactNode | `<Icon type="arrow-left" />` |
| tags | Tag list next to title | [Tag](https://ant.design/components/tag-cn/)[] \| [Tag](https://ant.design/components/tag-cn/) | - |
| extra | Operating area, at the end of the line of the title line | ReactNode | - |
| breadcrumb | breadcrumb config |  [breadcrumb](https://ant.design/components/breadcrumb-cn/)  | - |
| footer | PageHeader's footer, generally used to render TabBar | ReactNode | -  |
| onBack | back icon click event | `()=>void` | `()=>history.back()` |

