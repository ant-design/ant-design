---
category: Components
type: Basic
title: Button
---

To trigger an operation.

## When To Use

A button means an operation(or a series of operations). Click a button will trigger corresponding business logic.

## API

To get a customized button, just set `type`/`shape`/`size`/`loading`/`disabled`.

Property | Description | Type | Default
-----|-----|-----|------
type | can be set to `primary` `ghost` or omitted | string | -
htmlType | to set the original `type` of `button`, see: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | string | `button`
icon | set the icon of button, see: Icon component | string | -
shape | can be set to `circle` `circle-outline` or omitted | string | -
size | can be set to `small` `large` or omitted | string | `default`
loading | to set the loading status of button | boolean | false
onClick | set the handler to handle `click` event | function | -

`<Button>Hello world!</Button>` will be rendered into `<button>Hello world!</button>`, and all the properties which are not listed above will be transferred to the `<button>` tag.

<style>
[id^="components-button-demo-"] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
</style>
