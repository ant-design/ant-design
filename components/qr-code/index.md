---
uuid: ba1833a0
title: QrCode 二维码
legacy: /QrCode
nav:
  title: 组件
  path: /components
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

## Contributors(2)

Ordered by date of first contribution

<!-- 此栏目在构建时会自动更新，请勿手动修改，详见 package.json 中的 contributor script -->

<ul>
  <li>
    <a target="_blank" href="https://work.alibaba-inc.com/work/u/109830">
      <img
        style="vertical-align: middle"
        width="20"
        src="https://work.alibaba-inc.com/photo/109830.40x40.xz.jpg"
      >
      @明是&nbsp;
    </a>
    <a target="_blank" href="dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=wy3btsh">
      <img
        style="vertical-align: middle"
        width="20"
        src="https://img.alicdn.com/tfs/TB18HtyiyqAXuNjy1XdXXaYcVXa-24-24.svg"
      >
      &nbsp;明是
    </a>
  </li>
  <li>
    <a target="_blank" href="https://work.alibaba-inc.com/work/u/159252">
      <img
        style="vertical-align: middle"
        width="20"
        src="https://work.alibaba-inc.com/photo/159252.40x40.xz.jpg"
      >
      @期贤&nbsp;
    </a>
    <a target="_blank" href="dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=zzo4dlq">
      <img
        style="vertical-align: middle"
        width="20"
        src="https://img.alicdn.com/tfs/TB18HtyiyqAXuNjy1XdXXaYcVXa-24-24.svg"
      >
      &nbsp;期贤🙏
    </a>
  </li>
</ul>

---
