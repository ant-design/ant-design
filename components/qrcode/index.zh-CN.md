---
category: Components
subtitle: 二维码
title: QRCode
cover: https://gw.alipayobjects.com/zos/alicdn/xqsDu4ZyR/Progress.svg
demo:
  cols: 2
group:
  title: 数据展示
  order: 5
---

能够将链接转换生成二维码的组件，支持自定义配色和 Logo 配置。

<Alert message="若二维码无法扫码识别，可能是因为链接地址过长导致像素过于密集，可以通过 `size` 配置二维码更大，或者通过短链接服务等方式将链接变短。"></Alert>

## 何时使用

当需要将链接转换成为二维码时使用。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/base.tsx">基本使用</code>
<code src="./demo/icon.tsx">带 Icon 的例子</code>
<code src="./demo/download.tsx">下载二维码</code>
<code src="./demo/errorlevel.tsx">纠错比例</code>

## API

| 参数       | 说明                                     | 类型                        | 默认值 |
| :--------- | :--------------------------------------- | :-------------------------- | :----- |
| value      | 扫描后的地址                             | string                      | -      |
| size       | 二维码图片大小                           | number                      | 128    |
| icon       | 二维码中图片的地址（目前只支持图片地址） | string                      | -      |
| iconSize   | 二维码中图片的大小                       | number                      | 32     |
| bgColor    | 二维码背景颜色                           | string                      | `#fff` |
| fgColor    | 二维码前景的颜色                         | string                      | `#000` |
| errorLevel | 纠错码的等级                             | `'L' \| 'M' \| 'Q' \| 'H' ` | `L`    |
