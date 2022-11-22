---
category: Components
subtitle: 二维码
group: 反馈
title: Progress
cover: https://gw.alipayobjects.com/zos/alicdn/xqsDu4ZyR/Progress.svg
demo:
  cols: 2
---

# QrCode 二维码

<Alert type="info">
若二维码无法扫码识别，可能是因为链接地址过长导致像素过于密集，可以通过 `size` 配置二维码更大，或者通过短链接服务等方式将链接变短。
</Alert>

能够将链接转换生成二维码的组件，支持自定义配色和 Logo 配置。

## 何时使用

当需要将链接转换成为二维码时使用。

## 代码演示

### 不带 logo 例子

<code src="./demos/withoutlogo.tsx" />

### 渲染为 svg

<code src="./demos/rendermode.tsx" />

### 过期状态

<code src="./demos/outdated.tsx" />

### 带 logo 例子

<code src="./demos/logo.tsx" />

### popover 带 logo 例子

<code src="./demos/popover.tsx" />

### 轮询 & 过期刷新

轮询二维码过期状态，并进行刷新的实际业务例子。

<code src="./demos/refresh.tsx" />

### 下载二维码

很多场景下会有下载二维码的需求，这里提供一种实现。

<code src="./demos/download.tsx" />

### 二维码纠错比例

手动调整二维码的纠错比例。

<code src="./demos/errorlevel.tsx" />

## API

| 参数       | 说明                                     | 类型                        | 默认值     |
| :--------- | :--------------------------------------- | :-------------------------- | :--------- |
| mode       | 最终渲染出来的结构                       | `'svg' \| 'canvas'`         | `'canvas'` |
| value      | 扫描后的地址                             | string                      | -          |
| logo       | 二维码中图片的地址（目前只支持图片地址） | string                      | -          |
| size       | 二维码图片大小                           | number                      | 128        |
| logoSize   | 二维码中 logo 大小                       | number                      | 32         |
| bgColor    | 二维码背景颜色                           | string                      | '#FFFFFF'  |
| fgColor    | 二维码前景的颜色                         | string                      | '#000000'  |
| popover    | 是否展现气泡卡片                         | boolean                     | false      |
| expired    | 是否过期                                 | boolean                     | false      |
| onRefresh  | 点击点击刷新的回调                       | () => void                  | noop       |
| errorLevel | 纠错码的登记                             | `'L' \| 'M' \| 'Q' \| 'H' ` | `'L'`      |

## API

各类型共用的属性。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| format | 内容的模板函数 | function(percent, successPercent) | (percent) => percent + `%` |
| percent | 百分比 | number | 0 |
| showInfo | 是否显示进度数值或状态图标 | boolean | true |
| status | 状态，可选：`success` `exception` `normal` `active`(仅限 line) | string | - |
| strokeColor | 进度条的色彩 | string | - |
| strokeLinecap | 进度条的样式 | `round` \| `butt` \| `square`，区别详见 [stroke-linecap](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) | `round` |
| success | 成功进度条相关配置 | { percent: number, strokeColor: string } | - |
| trailColor | 未完成的分段的颜色 | string | - |
| type | 类型，可选 `line` `circle` `dashboard` | string | `line` |

### `type="line"`

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| steps | 进度条总共步数 | number | - | - |
| strokeColor | 进度条的色彩，传入 object 时为渐变。当有 `steps` 时支持传入一个数组。 | string \| string[] \| { from: string; to: string; direction: string } | - | 4.21.0: `string[]` |
| strokeWidth | 进度条线的宽度，单位 px | number | 10 | - |

### `type="circle"`

| 属性        | 说明                                             | 类型             | 默认值 |
| ----------- | ------------------------------------------------ | ---------------- | ------ |
| strokeColor | 圆形进度条线的色彩，传入 object 时为渐变         | string \| object | -      |
| strokeWidth | 圆形进度条线的宽度，单位是进度条画布宽度的百分比 | number           | 6      |
| width       | 圆形进度条画布宽度，单位 px                      | number           | 132    |

### `type="dashboard"`

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gapDegree | 仪表盘进度条缺口角度，可取值 0 ~ 295 | number | 75 |
| gapPosition | 仪表盘进度条缺口位置 | `top` \| `bottom` \| `left` \| `right` | `bottom` |
| strokeWidth | 仪表盘进度条线的宽度，单位是进度条画布宽度的百分比 | number | 6 |
| width | 仪表盘进度条画布宽度，单位 px | number | 132 |
