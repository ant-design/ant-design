---
type: Feedback
category: Components
subtitle:
title: Drawer
cover: https://img.alicdn.com/imgextra/i4/O1CN019djdZP1OHwXSRGCOW_!!6000000001681-55-tps-161-117.svg
---

A panel which slides in from the edge of the screen.

## When To Use

A Drawer is a panel that is typically overlaid on top of a page and slides in from the side. It contains a set of information or actions. Since the user can interact with the Drawer without leaving the current page, tasks can be achieved more efficiently within the same context.

- Use a Form to create or edit a set of information.
- Processing subtasks. When subtasks are too heavy for a Popover and we still want to keep the subtasks in the context of the main task, Drawer comes very handy.
- When the same Form is needed in multiple places.

## API

| Props | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoFocus | Whether Drawer should get focused after open | boolean | true | 4.17.0 |
| afterVisibleChange | Callback after the animation ends when switching drawers | function(visible) | - |  |
| bodyStyle | Style of the drawer content part | CSSProperties | - |  |
| className | The class name of the container of the Drawer dialog | string | - |  |
| closable | Whether a close (x) button is visible on top left of the Drawer dialog or not | boolean | true |  |
| closeIcon | Custom close icon | ReactNode | &lt;CloseOutlined /> |  |
| contentWrapperStyle | Style of the drawer wrapper of content part | CSSProperties | - |  |
| destroyOnClose | Whether to unmount child components on closing drawer or not | boolean | false |  |
| drawerStyle | Style of the popup layer element | CSSProperties | - |  |
| extra | Extra actions area at corner | ReactNode | - | 4.17.0 |
| footer | The footer for Drawer | ReactNode | - |  |
| footerStyle | Style of the drawer footer part | CSSProperties | - |  |
| forceRender | Prerender Drawer component forcely | boolean | false |  |
| getContainer | mounted node and display window for Drawer | HTMLElement \| () => HTMLElement \| Selectors \| false | body |  |
| headerStyle | Style of the drawer header part | CSSProperties | - |  |
| height | Placement is `top` or `bottom`, height of the Drawer dialog | string \| number | 378 |  |
| keyboard | Whether support press esc to close | boolean | true |  |
| mask | Whether to show mask or not | boolean | true |  |
| maskClosable | Clicking on the mask (area outside the Drawer) to close the Drawer or not | boolean | true |  |
| maskStyle | Style for Drawer's mask element | CSSProperties | {} |  |
| placement | The placement of the Drawer | `top` \| `right` \| `bottom` \| `left` | `right` |  |
| push | Nested drawers push behavior | boolean \| { distance: string \| number } | { distance: 180 } | 4.5.0+ |
| style | Style of wrapper element which **contains mask** compare to `drawerStyle` | CSSProperties | - |  |
| size | presetted size of drawer, default `378px` and large `736px` | 'default' \| 'large' | 'default' | 4.17.0 |
| title | The title for Drawer | ReactNode | - |  |
| visible | Whether the Drawer dialog is visible or not | boolean | false |  |
| width | Width of the Drawer dialog | string \| number | 378 |  |
| zIndex | The `z-index` of the Drawer | number | 1000 |  |
| onClose | Specify a callback that will be called when a user clicks mask, close button or Cancel button | function(e) | - |  |
