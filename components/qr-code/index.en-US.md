---
category: Components
title: QrCode
cover: https://gw.alipayobjects.com/zos/alicdn/xqsDu4ZyR/Progress.svg
demo:
  cols: 2
group:
  title: Data Display
  order: 5
---

# QrCode

能够将链接转换生成二维码的组件，支持自定义配色和 Logo 配置。

<Alert message="若二维码无法扫码识别，可能是因为链接地址过长导致像素过于密集，可以通过 `size` 配置二维码更大，或者通过短链接服务等方式将链接变短。"></Alert>

## 何时使用

当需要将链接转换成为二维码时使用。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/logo.tsx">带 logo 例子</code>
<code src="./demo/withoutlogo.tsx">不带 logo 例子</code>
<code src="./demo/rendermode.tsx">渲染为 svg</code>
<code src="./demo/outdated.tsx">过期状态</code>
<code src="./demo/popover.tsx">popover 带 logo 例子</code>
<code src="./demo/refresh.tsx">轮询 & 过期刷新</code>
<code src="./demo/download.tsx">下载二维码</code>
<code src="./demo/errorlevel.tsx">纠错比例</code>

## API

| 参数       | 说明                                     | 类型                        | 默认值     |
| :--------- | :--------------------------------------- | :-------------------------- | :--------- |
| mode       | 最终渲染出来的结构                       | `'svg' \| 'canvas'`         | `'canvas'` |
| value      | 扫描后的地址                             | string                      | -          |
| logo       | 二维码中图片的地址（目前只支持图片地址） | string                      | -          |
| size       | 二维码图片大小                           | number                      | 128        |
| logoSize   | 二维码中 logo 大小                       | number                      | 32         |
| bgColor    | 二维码背景颜色                           | string                      | '#fff'     |
| fgColor    | 二维码前景的颜色                         | string                      | '#000'     |
| popover    | 是否展现气泡卡片                         | boolean                     | false      |
| expired    | 是否过期                                 | boolean                     | false      |
| onRefresh  | 点击点击刷新的回调                       | () => void                  | noop       |
| errorLevel | 纠错码的登记                             | `'L' \| 'M' \| 'Q' \| 'H' ` | `'L'`      |
