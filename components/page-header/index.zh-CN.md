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
| title | title 区域 | ReactNode | - |
| tags | title 旁的 tag 列表 | [Tag](https://ant.design/components/tag-cn/)[] | [Tag](https://ant.design/components/tag-cn/) | - |
| action | 操作区，位于 title 行的行尾 | ReactNode | - |
| content | 内容区 | ReactNode | - |
| extraContent | 额外内容区，位于content的右侧 | ReactNode | - |
| breadcrumb | 面包屑的配置 |  [breadcrumb](https://ant.design/components/breadcrumb-cn/)  | - |
| tabBars | tabbar 配置列表 | array<{key: string, tab: ReactNode}> | -  |
| tabsProps | tabs 的配置 | 同[Tab](https://ant.design/components/tabs-cn/#Tabs) | -  |
| onBack | 返回按钮的点击事件 | ()=>void | - |
