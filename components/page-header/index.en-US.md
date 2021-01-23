---
category: Components
type: Navigation
title: PageHeader
cols: 1
subtitle:
cover: https://gw.alipayobjects.com/zos/alicdn/6bKE0Cq0R/PageHeader.svg
---

A header with common actions and design elements built in.

## When To Use

PageHeader can be used to highlight the page topic, display important information about the page, and carry the action items related to the current page (including page-level operations, inter-page navigation, etc.) It can also be used as inter-page navigation.

## API

| Param | Description | Type | Default value | Version |
| --- | --- | --- | --- | --- |
| avatar | Avatar next to the title bar | [AvatarProps](/components/avatar/) | - |  |
| backIcon | Custom back icon, if false the back icon will not be displayed | ReactNode \| boolean | &lt;ArrowLeft /> |  |
| breadcrumb | Breadcrumb configuration | [Breadcrumb](/components/breadcrumb/) | - |  |
| breadcrumbRender | Customize the content of the breadcrumb area | `(props, originBreadcrumb)=> ReactNode` | - |  |
| extra | Operating area, at the end of the line of the title line | ReactNode | - |  |
| footer | PageHeader's footer, generally used to render TabBar | ReactNode | - |  |
| ghost | PageHeader type, will change background color | boolean | true |  |
| subTitle | Custom subtitle text | ReactNode | - |  |
| tags | Tag list next to title | [Tag](/components/tag/)\[] \| [Tag](/components/tag/) | - |  |
| title | Custom title text | ReactNode | - |  |
| onBack | Back icon click event | () => void | - |  |

<style>
  [data-theme="dark"] .site-page-header {
    border: 1px solid #303030;
  }
  [data-theme="dark"]  .site-page-header-ghost-wrapper {
    background-color: rgba(255,255,255,0.08);
  }
</style>
