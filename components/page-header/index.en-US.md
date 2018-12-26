---
category: Components
type: Navigation
title: PageHeader
cols: 1
subtitle: 

---

The header is used to declare the theme of the page, which contains the most important information that the user is concerned about, so that the user can quickly understand what the current page is and what its function is.

## API

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| title | title string | ReactNode | - |
| subTitle | subTitle string | ReactNode | - |
| backNode | Custom back icon, if false does not render back icon | ReactNode | `<Icon type="arrow-left" />` |
| tags | Tag list next to title | [Tag](https://ant.design/components/tag-cn/)[] \| [Tag](https://ant.design/components/tag-cn/) | - |
| extra | Operating area, at the end of the line of the title line | ReactNode | - |
| breadcrumb | breadcrumb config |  [breadcrumb](https://ant.design/components/breadcrumb-cn/)  | - |
| footer | PageHeader's footer, generally used to render TabBar | ReactNode | -  |
| onBack | back icon click event | ()=>void | ()=>{history.back();} |

