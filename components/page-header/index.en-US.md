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
| title | Custom title text | ReactNode | - | 3.14.0 |
| subTitle | Custom subtitle text | ReactNode | - | 3.14.0 |
| ghost | PageHeader type, will change background color | boolean | true | 3.24.0 |
| avatar | Avatar next to the title bar | [avatar props](/components/avatar/) | - | 3.22.0 |
| backIcon | Custom back icon, if false the back icon will not be displayed | ReactNode | `<Icon type="arrow-left" />` | 3.14.0 |
| tags | Tag list next to title | [Tag](https://ant.design/components/tag-cn/)[] \| [Tag](https://ant.design/components/tag-cn/) | - | 3.14.0 |
| extra | Operating area, at the end of the line of the title line | ReactNode | - | 3.14.0 |
| breadcrumb | Breadcrumb configuration | [breadcrumb](https://ant.design/components/breadcrumb-cn/) | - | 3.14.0 |
| footer | PageHeader's footer, generally used to render TabBar | ReactNode | - | 3.14.0 |
| onBack | Back icon click event | `()=>void` | `()=>history.back()` | 3.14.0 |
