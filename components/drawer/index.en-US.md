---
type: Feedback
category: Components
subtitle: Drawer
title: Drawer
---

Drawer container

## When To Use


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
| placement | The direction of the Drawer | 'left' | 'right' | 'left'
| onClose | Specify a function that will be called when a user clicks mask, close button on top right or Cancel button | function(e) | - |
