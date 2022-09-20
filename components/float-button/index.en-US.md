---
category: Components
type: Other
title: FloatButton
cover: https://gw.alipayobjects.com/zos/alicdn/tJZ5jbTwX/BackTop.svg
---

FloatButton. This component is available since `antd@5.0.0`.

## When To Use

- Many websites will choose to provide some obvious features, hoping that users can browse the site, no matter where you can notice, often will be a floating button in the way of the bottom right.

## API

> This component is available since `antd@5.0.0`

### FloatButton

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| icon | Set the icon component of button | ReactNode | - |  |
| description | Text and other | ReactNode | - |  |
| tooltip | The text shown in the tooltip | ReactNode \| () => ReactNode |  |  |
| type | Setting button type | `default` \| `primary` | `default` |  |
| shape | Setting button shape | `circle` \| `square` | `circle` |  |
| onClick | Set the handler to handle `click` event | (event) => void | - |  |
| href | The target of hyperlink | string | - |  |
| target | Specifies where to display the linked URL | string | - |  |

### FloatButton.Group

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| shape | Setting button shape of children | `circle` \| `square` | `circle` |  |
| trigger | Which action can trigger menu open/close | `click` \| `hover` | - |  |
| open | Whether the menu is visible or not | boolean | - |  |
| onOpenChange | Callback executed when active menu is changed | (open: boolean) => void | - |  |

### FloatButton.BackTop

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| duration | Time to return to top（ms） | number | 450 |  |
| target | Specifies the scrollable area dom node | () => HTMLElement | () => window |  |
| visibilityHeight | The BackTop button will not show until the scroll height reaches this value | number | 400 |  |
| onClick | A callback function, which can be executed when you click the button | () => void | - |  |
