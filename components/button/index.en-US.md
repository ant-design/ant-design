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

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| disabled | disabled state of button | boolean | `false` | 3.5.1 |
| ghost | make background transparent and invert text and border colors, added in 2.7 | boolean | `false` |  |
| href | redirect url of link button | string | - |  |
| htmlType | set the original html `type` of `button`, see: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | string | `button` |  |
| icon | set the icon of button, see: Icon component | string | - |  |
| loading | set the loading status of button | boolean \| { delay: number } | `false` |  |
| shape | can be set to `circle`, `round` or omitted | string | - |  |
| size | can be set to `small` `large` or omitted | string | `default` |  |
| target | same as target attribute of a, works when href is specified | string | - |  |
| type | can be set to `primary` `ghost` `dashed` `danger` `link`(added in 3.17) or omitted (meaning `default`) | string | `default` |  |
| onClick | set the handler to handle `click` event | (event) => void | - |  |
| block | option to fit button width to its parent width | boolean | `false` | 3.8.0 |

It accepts all props which native buttons support.

## FAQ

### How to remove space between 2 chinese characters

Following the Ant Design specification, we will add one space between if Button contains two Chinese characters only. If you don't need that, you can use [ConfigProvider](/components/config-provider/#API) to set `autoInsertSpaceInButton` as `false`.

![Button with two Chinese characters](https://gw.alipayobjects.com/zos/antfincdn/Hz5HL9gsT4/f29f170d-b78d-4d2b-aa71-0da6a9ead4d9.png)

<style>
[id^=components-button-demo-] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
[id^=components-button-demo-] .ant-btn-group > .ant-btn,
[id^=components-button-demo-] .ant-btn-group > span > .ant-btn {
  margin-right: 0;
}
</style>
