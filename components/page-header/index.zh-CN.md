---
category: Components
type: 导航
title: PageHeader
cols: 1
subtitle: 页头
---

页头可用于声明页面主题、展示用户所关注的页面重要信息，以及承载与当前页相关的操作项（包含页面级操作，页面间导航等）

## 何时使用

当需要使用户快速理解当前页是什么以及方便用户使用页面功能时使用，通常也可被用作页面间导航。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 自定义标题文字 | ReactNode | - |
| subTitle | 自定义的二级标题文字 | ReactNode | - |
| backIcon | 自定义 back icon ，如果为 false 不渲染 back icon | ReactNode | `<Icon type="arrow-left" />` |
| tags | title 旁的 tag 列表 | [Tag](https://ant.design/components/tag-cn/)[] \| [Tag](https://ant.design/components/tag-cn/) | - |
| extra | 操作区，位于 title 行的行尾 | ReactNode | - |
| breadcrumb | 面包屑的配置 |  [breadcrumb](https://ant.design/components/breadcrumb-cn/)  | - |
| footer | PageHeader 的页脚，一般用于渲染 TabBar | ReactNode | - |
| onBack | 返回按钮的点击事件 | `()=>void` | `()=>history.back()` |

