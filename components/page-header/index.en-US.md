---
category: Components
type: Navigation
title: PageHeader
cols: 1
subtitle:
---

A header with common actions and design elements built in.

## When To Use

PageHeader can be used to highlight the page topic, display important information about the page, and carry the action items related to the current page (including page-level operations, inter-page navigation, etc.) It can also be used as inter-page navigation.

## API

| Param | Description | Type | Default value | Version |
| --- | --- | --- | --- | --- |
| title | Custom title text | ReactNode | - |  |
| subTitle | Custom subtitle text | ReactNode | - |  |
| ghost | PageHeader type, will change background color | boolean | true |  |
| avatar | Avatar next to the title bar | [avatar props](/components/avatar/) | - |  |
| backIcon | Custom back icon, if false the back icon will not be displayed | ReactNode | `<ArrowLeft />` |  |
| tags | Tag list next to title | [Tag](https://ant.design/components/tag-cn/)[] \| [Tag](https://ant.design/components/tag-cn/) | - |  |
| extra | Operating area, at the end of the line of the title line | ReactNode | - |  |
| breadcrumb | Breadcrumb configuration | [breadcrumb](https://ant.design/components/breadcrumb-cn/) | - |  |
| footer | PageHeader's footer, generally used to render TabBar | ReactNode | - |  |
| onBack | Back icon click event | `()=>void` | `()=>history.back()` |  |

<style>
  [data-theme="dark"] .site-page-header {
    border: 1px solid #303030;
  }
  [data-theme="dark"]  .site-page-header-ghost-wrapper {
    background-color: rgba(255,255,255,0.08);
  }
</style>
