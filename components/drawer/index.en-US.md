---
type: Feedback
category: Components
subtitle:
title: Drawer
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
| closable | Whether a close (x) button is visible on top right of the Drawer dialog or not. | boolean | true | 3.7.0 |
| destroyOnClose | Whether to unmount child components on closing drawer or not. | boolean | false | 3.7.0 |
| getContainer | Return the mounted node for Drawer. | HTMLElement \| `() => HTMLElement` \| Selectors \| false | 'body' | 3.7.0 |
| mask | Whether to show mask or not. | Boolean | true | 3.7.0 |
| maskClosable | Clicking on the mask (area outside the Drawer) to close the Drawer or not. | boolean | true | 3.7.0 |
| maskStyle | Style for Drawer's mask element. | object | {} | 3.7.0 |
| style | Style of drawer wrapper | object | - | 3.7.0 |
| bodyStyle | Style of floating layer, typically used for adjusting its position. | object | - | 3.12.0 |
| title | The title for Drawer. | string\|ReactNode | - | 3.7.0 |
| visible | Whether the Drawer dialog is visible or not. | boolean | false | 3.7.0 |
| width | Width of the Drawer dialog. | string\|number | 256 | 3.7.0 |
| height | placement is `top` or `bottom`, height of the Drawer dialog. | string\|number | - | 3.9.0 |
| className | The class name of the container of the Drawer dialog. | string | - | 3.8.0 |
| zIndex | The `z-index` of the Drawer. | Number | 1000 | 3.7.0 |
| placement | The placement of the Drawer. | 'top' \| 'right' \| 'bottom' \| 'left' | 'right' | 3.7.0 |
| onClose | Specify a callback that will be called when a user clicks mask, close button or Cancel button. | function(e) | - | 3.7.0 |
| afterVisibleChange | Callback after the animation ends when switching drawers. | function(visible) | - | 3.17.0 |
| keyboard | Whether support press esc to close | Boolean | true | 3.19.8 |

<style>
#_hj_feedback_container {
  display: none;
}
</style>
