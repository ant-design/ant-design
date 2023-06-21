---
category: Components
group: Other
title: FloatButton
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*HS-wTIIwu0kAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*a0hwTY_rOSUAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

FloatButton. Available since `5.0.0`.

## When To Use

- For global functionality on the site.
- Buttons that can be seen wherever you browse.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx" iframe="360">Basic</code>
<code src="./demo/type.tsx" iframe="360">Type</code>
<code src="./demo/shape.tsx" iframe="360">Shape</code>
<code src="./demo/description.tsx" iframe="360">Description</code>
<code src="./demo/tooltip.tsx" iframe="360">FloatButton with tooltip</code>
<code src="./demo/group.tsx" iframe="360">FloatButton Group</code>
<code src="./demo/group-menu.tsx" iframe="360">Menu mode</code>
<code src="./demo/controlled.tsx" iframe="360">Controlled mode</code>
<code src="./demo/back-top.tsx" iframe="360">BackTop</code>
<code src="./demo/badge.tsx" iframe="360">badge</code>
<code src="./demo/badge-debug.tsx" iframe="360" debug>debug dot</code>
<code src="./demo/render-panel.tsx" debug>\_InternalPanelDoNotUseOrYouWillBeFired</code>

## API

> This component is available since `antd@5.0.0`.

### common API

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
| badge | Attach Badge to FloatButton. `status` and other props related are not supported. | [BadgeProps](/components/badge#api) | - | 5.4.0 |

### FloatButton.Group

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| shape | Setting button shape of children | `circle` \| `square` | `circle` |  |
| trigger | Which action can trigger menu open/close | `click` \| `hover` | - |  |
| open | Whether the menu is visible or not, use it with trigger | boolean | - |  |
| onOpenChange | Callback executed when active menu is changed, use it with trigger | (open: boolean) => void | - |  |

### FloatButton.BackTop

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| duration | Time to return to top（ms） | number | 450 |  |
| target | Specifies the scrollable area dom node | () => HTMLElement | () => window |  |
| visibilityHeight | The BackTop button will not show until the scroll height reaches this value | number | 400 |  |
| onClick | A callback function, which can be executed when you click the button | () => void | - |  |

## Design Token

<ComponentTokenTable component="FloatButton"></ComponentTokenTable>
