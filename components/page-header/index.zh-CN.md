---
category: Components
type: 导航
title: PageHeader
cols: 1
subtitle: 页头

---

页头用来声明页面的主题，包含了用户所关注的最重要的信息，使用户可以快速理解当前页面是什么以及它的功能。

## API

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| title | title 文字 | ReactNode | - |
| subTitle | subTitle 文字 | ReactNode | - |
| backNode | 自定义 back icon ，如果为 false 不渲染 back icon | ReactNode | <Icon type="arrow-left" /> |
| tags | title 旁的 tag 列表 | [Tag](https://ant.design/components/tag-cn/)[] \| [Tag](https://ant.design/components/tag-cn/) | - |
| extra | 操作区，位于 title 行的行尾 | ReactNode | - |
| breadcrumb | 面包屑的配置 |  [breadcrumb](https://ant.design/components/breadcrumb-cn/)  | - |
| footer | PageHeader 的页脚，一般用于渲染 TabBar | ReactNode | - |
| onBack | 返回按钮的点击事件 | ()=>void | - |
