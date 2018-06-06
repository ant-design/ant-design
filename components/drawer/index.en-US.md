---
type: Feedback
category: Components
subtitle: 
title: Drawer
---

A drawer is a panel that is overlaid on a parent form and slides in from the outside of the parent form's border to carry information or action collections. The drawer interacts without leaving the parent form, and the user is in context and can handle tasks more easily and clearly.

## When To Use

* Create or edit an object.
* Carrying subtasks. In order to keep the subtasks still in the context of the main task, the subtasks are too complex for the Bubble Popover to use large drawers to carry.
* Use the same form in multiple places

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| closable | Whether a close (x) button is visible on top right of the Drawer dialog or not | boolean | true |
| destroyOnClose | Whether to unmount child compenents on onClose | boolean | false |
| getContainer | Return the mount node for Drawer | (instance): HTMLElement | () => document.body |
| mask | Whether show mask or not. | Boolean | true |
| maskClosable | Whether to close the Drawer dialog when the mask (area outside the Drawer) is clicked | boolean | true |
| maskStyle | Style for Drawer's mask element. | object | {} |
| style | Style of floating layer, typically used at least for adjusting the position. | object | - |
| title | The Drawer dialog's title | string\|ReactNode | - |
| visible | Whether the Drawer dialog is visible or not | boolean | false |
| width | Width of the Drawer dialog | string\|number | 520 |
| wrapClassName | The class name of the container of the Drawer dialog | string | - |
| zIndex | The `z-index` of the Drawer | Number | 1000 |
| placement | The direction of the Drawer | 'left' \| 'right' | 'right'
| onClose | Specify a function that will be called when a user clicks mask, close button on top right or Cancel button | function(e) | - |
