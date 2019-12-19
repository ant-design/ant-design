---
category: Components
type: 通用
title: Button
subtitle: 按钮
---

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

## API

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`type` -> `shape` -> `size` -> `loading` -> `disabled`。

按钮的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| disabled | 按钮失效状态 | boolean | `false` | 3.5.1 |
| ghost | 幽灵属性，使按钮背景透明，版本 2.7 中增加 | boolean | false |  |
| href | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 | string | - |  |
| htmlType | 设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | string | `button` |  |
| icon | 设置按钮的图标类型 | string | - |  |
| loading | 设置按钮载入状态 | boolean \| { delay: number } | `false` |  |
| shape | 设置按钮形状，可选值为 `circle`、 `round` 或者不设 | string | - |  |
| size | 设置按钮大小，可选值为 `small` `large` 或者不设 | string | `default` |  |
| target | 相当于 a 链接的 target 属性，href 存在时生效 | string | - |  |
| type | 设置按钮类型，可选值为 `primary` `dashed` `danger` `link`(3.17 中增加) 或者不设 | string | - |  |
| onClick | 点击按钮时的回调 | (event) => void | - |  |
| block | 将按钮宽度调整为其父宽度的选项 | boolean | `false` | 3.8.0 |

支持原生 button 的其他所有属性。

## FAQ

### 如何移除两个汉字之间的空格？

根据 Ant Design 设计规范要求，我们会在按钮内只有两个汉字时自动添加空格，如果你不需要这个特性，可以设置 [ConfigProvider](/components/config-provider/#API) 的 `autoInsertSpaceInButton` 为 `false`。

![](https://gw.alipayobjects.com/zos/antfincdn/Hz5HL9gsT4/f29f170d-b78d-4d2b-aa71-0da6a9ead4d9.png)

<style>
[id^="components-button-demo-"] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
[id^="components-button-demo-"] .ant-btn-group > .ant-btn {
  margin-right: 0;
}
</style>
