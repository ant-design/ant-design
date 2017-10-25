---
category: Components
type: General
title: Button
---

To trigger an operation.

## When To Use

A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.

## API

To get a customized button, just set `type`/`shape`/`size`/`loading`/`disabled`.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| ghost | make background transparent and invert text and border colors, added in 2.7 | boolean | false |
| htmlType | set the original html `type` of `button`, see: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | string | `button` |
| icon | set the icon of button, see: Icon component | string | - |
| loading | set the loading status of button | boolean \| { delay: number } | false |
| shape | can be set to `circle` or omitted | string | - |
| size | can be set to `small` `large` or omitted | string | `default` |
| type | can be set to `primary` `ghost` `dashed` `danger`(added in 2.7) or omitted (meaning `default`) | string | `default` |
| onClick | set the handler to handle `click` event | function | - |

`<Button>Hello world!</Button>` will be rendered into `<button><span>Hello world!</span></button>`, and all the properties which are not listed above will be transferred to the `<button>` tag.

<style>
[id^=components-button-demo-] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
[id^=components-button-demo-] .ant-btn-group > .ant-btn {
  margin-right: 0;
}
</style>
