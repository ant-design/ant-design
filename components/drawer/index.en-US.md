---
group: Feedback
category: Components
title: Drawer
description: A panel that slides out from the edge of the screen.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*BD2JSKm8I-kAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*r29rQ51bNdwAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

A Drawer is a panel that is typically overlaid on top of a page and slides in from the side. It contains a set of information or actions. Since the user can interact with the Drawer without leaving the current page, tasks can be achieved more efficiently within the same context.

- Use a Form to create or edit a set of information.
- Processing subtasks. When subtasks are too heavy for a Popover and we still want to keep the subtasks in the context of the main task, Drawer comes very handy.
- When the same Form is needed in multiple places.

> Notes for developers
>
> Since the `5.17.0`, we provided the `loading` prop by the Spin. However, since the `5.18.0` version, we have fixed this design error and replaced the Spin with the Skeleton, and also modified the type of `loading` prop, which can only accept `boolean` type.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic-right.tsx">Basic</code>
<code src="./demo/placement.tsx">Custom Placement</code>
<code src="./demo/loading.tsx" version="5.17.0">Loading</code>
<code src="./demo/extra.tsx">Extra Actions</code>
<code src="./demo/render-in-current.tsx">Render in current dom</code>
<code src="./demo/form-in-drawer.tsx">Submit form in drawer</code>
<code src="./demo/user-profile.tsx">Preview drawer</code>
<code src="./demo/multi-level-drawer.tsx">Multi-level drawer</code>
<code src="./demo/size.tsx">Preset size</code>
<code src="./demo/classNames.tsx">Customize className for build-in module</code>
<code src="./demo/config-provider.tsx" debug>ConfigProvider</code>
<code src="./demo/no-mask.tsx" debug>No mask</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/scroll-debug.tsx" debug>Scroll Debug</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

<!-- prettier-ignore -->
:::info{title=Note}
v5 uses `rootClassName` & `rootStyle` to configure the outermost element style, instead of `className` & `style` from v4. This is done to align the API with Modal.
:::

| Props | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoFocus | Whether Drawer should get focused after open | boolean | true | 4.17.0 |
| afterOpenChange | Callback after the animation ends when switching drawers | function(open) | - |  |
| className | Config Drawer Panel className. Use `rootClassName` if want to config top DOM style | string | - |  |
| classNames | Semantic structure className | [Record<SemanticDOM, string>](#semantic-dom) | - | 5.10.0 |
| closeIcon | Custom close icon. 5.7.0: close button will be hidden when setting to `null` or `false` | ReactNode | &lt;CloseOutlined /> |  |
| destroyOnClose | Whether to unmount child components on closing drawer or not | boolean | false |  |
| extra | Extra actions area at corner | ReactNode | - | 4.17.0 |
| footer | The footer for Drawer | ReactNode | - |  |
| forceRender | Pre-render Drawer component forcibly | boolean | false |  |
| getContainer | mounted node and display window for Drawer | HTMLElement \| () => HTMLElement \| Selectors \| false | body |  |
| headerStyle | Style of the drawer header part | CSSProperties | - |  |
| height | Placement is `top` or `bottom`, height of the Drawer dialog | string \| number | 378 |  |
| keyboard | Whether support press esc to close | boolean | true |  |
| mask | Whether to show mask or not | boolean | true |  |
| maskClosable | Clicking on the mask (area outside the Drawer) to close the Drawer or not | boolean | true |  |
| placement | The placement of the Drawer | `top` \| `right` \| `bottom` \| `left` | `right` |  |
| push | Nested drawers push behavior | boolean \| { distance: string \| number } | { distance: 180 } | 4.5.0+ |
| rootStyle | Style of wrapper element which **contains mask** compare to `style` | CSSProperties | - |  |
| style | Style of Drawer panel. Use `styles.body` if want to config body only | CSSProperties | - |  |
| styles | Semantic structure style | [Record<SemanticDOM, CSSProperties>](#semantic-dom) | - | 5.10.0 |
| size | preset size of drawer, default `378px` and large `736px` | 'default' \| 'large' | 'default' | 4.17.0 |
| title | The title for Drawer | ReactNode | - |  |
| loading | Show the Skeleton | boolean | false | 5.17.0 |
| open | Whether the Drawer dialog is visible or not | boolean | false |  |
| width | Width of the Drawer dialog | string \| number | 378 |  |
| zIndex | The `z-index` of the Drawer | number | 1000 |  |
| onClose | Specify a callback that will be called when a user clicks mask, close button or Cancel button | function(e) | - |  |
| drawerRender | Custom drawer content render | (node: ReactNode) => ReactNode | - | 5.18.0 |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Drawer"></ComponentTokenTable>
