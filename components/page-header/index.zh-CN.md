---
category: Components
type: 导航
title: PageHeader
cols: 1
subtitle: 页头
cover: https://gw.alipayobjects.com/zos/alicdn/6bKE0Cq0R/PageHeader.svg
---

页头位于页容器中，页容器顶部，起到了内容概览和引导页级操作的作用。包括由面包屑、标题、页面内容简介、页面级操作等、页面级导航组成。

## 何时使用

当需要使用户快速理解当前页是什么以及方便用户使用页面功能时使用，通常也可被用作页面间导航。

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| avatar | 标题栏旁的头像 | [AvatarProps](/components/avatar/) | - |  |
| backIcon | 自定义 back icon ，如果为 false 不渲染 back icon | ReactNode \| boolean | &lt;ArrowLeft /> |  |
| breadcrumb | 面包屑的配置 | [Breadcrumb](/components/breadcrumb/) | - |  |
| extra | 操作区，位于 title 行的行尾 | ReactNode | - |  |
| footer | PageHeader 的页脚，一般用于渲染 TabBar | ReactNode | - |  |
| ghost | pageHeader 的类型，将会改变背景颜色 | boolean | true |  |
| onBack | 返回按钮的点击事件 | () => void | - |  |
| subTitle | 自定义的二级标题文字 | ReactNode | - |  |
| tags | title 旁的 tag 列表 | [Tag](/components/tag/)\[] \| [Tag](/components/tag/) | - |  |
| title | 自定义标题文字 | ReactNode | - |  |

<style>
  [data-theme="dark"] .site-page-header {
    border: 1px solid #303030;
  }
  [data-theme="dark"]  .site-page-header-ghost-wrapper {
    background-color: rgba(255,255,255,0.08);
  }
</style>
