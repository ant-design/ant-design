---
category: Components
group: General
title: FloatButton
description: A button that floats at the top of the page.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*tXAoQqyr-ioAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*hSAwR7cnabwAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

- For global functionality on the site.
- Buttons that can be seen wherever you browse.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx" iframe="360">Basic</code>
<code src="./demo/type.tsx" iframe="360">Type</code>
<code src="./demo/shape.tsx" iframe="360">Shape</code>
<code src="./demo/content.tsx" iframe="360">Content</code>
<code src="./demo/tooltip.tsx" iframe="360">FloatButton with tooltip</code>
<code src="./demo/group.tsx" iframe="360">FloatButton Group</code>
<code src="./demo/group-menu.tsx" iframe="360">Menu mode</code>
<code src="./demo/controlled.tsx" iframe="360">Controlled mode</code>
<code src="./demo/placement.tsx" iframe="380" version="5.21.0">placement</code>
<code src="./demo/back-top.tsx" iframe="360">BackTop</code>
<code src="./demo/badge.tsx" iframe="360">badge</code>
<code src="./demo/badge-debug.tsx" iframe="360" debug>debug dot</code>
<code src="./demo/style-class.tsx" iframe="360" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/render-panel.tsx" debug>\_InternalPanelDoNotUseOrYouWillBeFired</code>

## API

Common props ref：[Common props](/docs/react/common-props)

> This component is available since `antd@5.0.0`.

### common API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| icon | Set the icon component of button | ReactNode | - |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| content | Text and other | ReactNode | - |  |
| ~~description~~ | Please use `content` instead | ReactNode | - |  |
| tooltip | The text shown in the tooltip | ReactNode \| [TooltipProps](/components/tooltip#api) | - | TooltipProps: 5.25.0 |
| type | Setting button type | `default` \| `primary` | `default` |  |
| shape | Setting button shape | `circle` \| `square` | `circle` |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| onClick | Set the handler to handle `click` event | (event) => void | - |  |
| href | The target of hyperlink | string | - |  |
| target | Specifies where to display the linked URL | string | - |  |
| htmlType | Set the original html `type` of `button`, see: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#type) | `submit` \| `reset` \| `button` | `button` | 5.21.0 |
| badge | Attach Badge to FloatButton. `status` and other props related are not supported. | [BadgeProps](/components/badge#api) | - | 5.4.0 |

### FloatButton.Group

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| open | Whether the menu is visible or not, use it with trigger | boolean | - |  |
| closeIcon | Customize close button icon | React.ReactNode | `<CloseOutlined />` |  |
| placement | Customize menu animation placement | `top` \| `left` \| `right` \| `bottom` | `top` | 5.21.0 |
| shape | Setting button shape of children | `circle` \| `square` | `circle` |  |
| trigger | Which action can trigger menu open/close | `click` \| `hover` | - |  |
| onOpenChange | Callback executed when active menu is changed, use it with trigger | (open: boolean) => void | - |  |
| onClick | Set the handler to handle `click` event (only work in `Menu mode`) | (event) => void | - | 5.3.0 |

### FloatButton.BackTop

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| duration | Time to return to top（ms） | number | 450 |  |
| target | Specifies the scrollable area dom node | () => HTMLElement | () => window |  |
| visibilityHeight | The BackTop button will not show until the scroll height reaches this value | number | 400 |  |
| onClick | A callback function, which can be executed when you click the button | () => void | - |  |

## Semantic DOM

### FloatButton

<code src="./demo/_semantic.tsx" simplify="true"></code>

### FloatButton.Group

<code src="./demo/_semantic_group.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="FloatButton"></ComponentTokenTable>
