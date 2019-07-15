---
category: Components
type: Navigation
title: PageHeader
cols: 1
subtitle:
---

The header can be used to declare the page topic, display important information about the page that the user is interested in, and carry the action items related to the current page (including page-level operations, inter-page navigation, etc.)

## When To Use

It can also be used as inter-page navigation when it is needed to make the user quickly understand what the current page is and to facilitate the user to use the page function.

## API

| Param | Description | Type | Default value | Version |
| --- | --- | --- | --- | --- |
| title | custom title text | ReactNode | - | 3.14.0 |
| subTitle | custom subTitle text | ReactNode | - | 3.14.0 |
| backIcon | custom back icon, if false the back icon will not be displayed | ReactNode | `<Icon type="arrow-left" />` | 3.14.0 |
| tags | Tag list next to title | [Tag](https://ant.design/components/tag-cn/)[] \| [Tag](https://ant.design/components/tag-cn/) | - | 3.14.0 |
| extra | Operating area, at the end of the line of the title line | ReactNode | - | 3.14.0 |
| breadcrumb | breadcrumb config | [breadcrumb](https://ant.design/components/breadcrumb-cn/) | - | 3.14.0 |
| footer | PageHeader's footer, generally used to render TabBar | ReactNode | - | 3.14.0 |
| onBack | back icon click event | `()=>void` | `()=>history.back()` | 3.14.0 |
