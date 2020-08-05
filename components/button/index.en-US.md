---
category: Components
type: General
title: Button
cover: https://gw.alipayobjects.com/zos/alicdn/fNUKzY1sk/Button.svg
---

To trigger an operation.

## When To Use

A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.

In Varnish we provide 5 types of button.

- Primary button: indicate the main action, one primary button at most in one section.
- Default button: indicate a series of actions without priority.
- Dashed button: used for adding action commonly.
- Text button: used for the most secondary action.
- Link button: used for external links.

And 4 other properties additionally.

- `danger`: used for actions of risk, like deletion or authorization.
- `ghost`: used in situations with complex background, home pages usually.
- `disabled`: when actions is not available.
- `loading`: add loading spinner in button, avoiding multiple submits too.

## API

To get a customized button, just set `type`/`shape`/`size`/`loading`/`disabled`.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| disabled | Disabled state of button | boolean | false |  |
| ghost | Make background transparent and invert text and border colors | boolean | false |  |
| href | Redirect url of link button | string | - |  |
| htmlType | Set the original html `type` of `button`, see: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | string | `button` |  |
| icon | Set the icon component of button | ReactNode | - |  |
| loading | Set the loading status of button | boolean \| { delay: number } | false |  |
| shape | Can be set to `circle`, `round` or omitted | string | - |  |
| size | Set the size of button | `large` \| `middle` \| `small` | - |  |
| target | Same as target attribute of a, works when href is specified | string | - |  |
| type | Can be set to `primary` `ghost` `dashed` `danger` `link` `text` `default` | string | `default` |  |
| onClick | Set the handler to handle `click` event | (event) => void | - |  |
| block | Option to fit button width to its parent width | boolean | false |  |
| danger | Set the danger status of button | boolean | false |  |

It accepts all props which native buttons support.

## FAQ

### How to remove space between 2 chinese characters

Following the Varnish specification, we will add one space between if Button contains two Chinese characters only. If you don't need that, you can use [ConfigProvider](/components/config-provider/#API) to set `autoInsertSpaceInButton` as `false`.

<img src="https://gw.alipayobjects.com/zos/antfincdn/MY%26THAPZrW/38f06cb9-293a-4b42-b183-9f443e79ffea.png" style="box-shadow: none; margin: 0; width: 100px" alt="Button with two Chinese characters" />

<style>
[id^=components-button-demo-] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
[id^="components-button-demo-"] .ant-btn-rtl {
  margin-right: 0;
  margin-left: 8px;
}
[id^=components-button-demo-] .ant-btn-group > .ant-btn,
[id^=components-button-demo-] .ant-btn-group > span > .ant-btn {
  margin-right: 0;
}
[data-theme="dark"] .site-button-ghost-wrapper {
  background: rgba(255, 255, 255, 0.2);
}
</style>
