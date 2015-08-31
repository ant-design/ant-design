## 0.8.1 (2015-08-31)

### Table

* 新增无数据的展示样式。[4c54644](https://github.com/ant-design/ant-design/commit/4c54644116d46cb2510d2d475234529bad60e5d5)
* 修复本地模式 `dataSource` 无法更新的问题。[6d2dcc4](https://github.com/ant-design/ant-design/commit/6d2dcc45393b6ec0ad1ba73caf8b1ec42353743f)
* 修复远程模式 loading 失效的问题。[9b8abb2](https://github.com/ant-design/ant-design/commit/9b8abb219934c246970a84200818aa8f85974bdf)

### Upload

* 新增 `onRemove(file) {}` 接口，作为移除上传文件的回调。
* 修复 `urlResolver(res) {}` 接口，可以拿到请求回调数据里的远程文件地址，展示在文件列表中方便下载。

### Notification

* 修复不会自动消失的问题。[23fce55](https://github.com/ant-design/ant-design/commit/23fce559b0b2faf4e0b686a92dbcdd045727a464)

### Steps

* 新增竖版的步骤条。

### Carousel

* 修复 fade 模式下可以拖拽的问题。#212

## 0.8.0 (2015-08-25)

这个版本是第一个稳定版，组件经过三期迭代，基本到齐，并有大量改进和变化，不向下兼容。

* 新增九个组件 `menu`、`upload`、`carousel`、`tree`、`notification`、`validation`、`affix`、`alert`、`enterAnimation`。目前共有组件 34 个，基本能满足后台类项目的组件需求。
* 新增设计文档部分，包括文字、色彩、动画。
* 重新梳理了设计和 React 实现部分的关系，强调了 Ant Design 的设计属性，并更新了网站的信息结构。
* 构建工具 `antd-bin` 升级到 `0.4.0` 版本，支持合并 webpack 配置，热替换（HMR）等特性，[详见](https://github.com/ant-design/antd-bin)。
* 组件动画优化和补充，体验更加流畅动感。
* 排查并修复 IE 和 safari 等浏览器的兼容问题。
* 大量代码重构，演示代码补充，文档更新、以及样式上的优化。

## 0.7.3 (2015-07-30)

* 小幅重构了 Table 分页，修复了分页导致的数据不展示的问题。
* 更新了部分文档。

## 0.7.2 (2015-07-27)

* 修复本地模式下 pagination 为 false 时数据无法显示的 [问题](https://github.com/ant-design/ant-design/commit/1954586665e59031eae5d2c8b2cdb08f83d64fcb)。
* 重构了 message 组件。
* 添加英文版说明文档 [README-en_US.md](https://github.com/ant-design/ant-design/blob/master/README-en_US.md)。
* 部分代码切换至 ES6 模式。
* 修正了部分组件的样式和演示，优化部分动画。

## 0.7.1 (2015-07-22)

* 修复了 Table 组件的 pagination 为 false 时分页未消失的 [问题](https://github.com/ant-design/ant-design/commit/01a6c0f1e6707b72a54ef30d073d148a87b391a8)。
* select 组件[选中后默认显示标签内容](https://github.com/ant-design/ant-design/issues/50)（原来是显示 value）。
* 修正了部分组件的样式和演示。
* 打包文件为 [umd 模式](https://github.com/ant-design/ant-design/commit/9b7b940cb417429d8fc57d83e252991b043d0f2f)。

## 0.7.0 (2015-07-21)

* 第一个公开版本，发布 `layout`、`iconfont`、`button`、`form`、`checkbox`、`radio`、`switch`、`slider`、`input-number`、`datepicker`、`select`、`tabs`、`steps`、`breadcrumb`、`collapse`、`pagination`、`modal`、`message`、`dropdown`、`popover`、`popconfirm`、`tooltip`、`progress`、`table` 等组件。
* 发布 [Ant Design 首页](http://ant.design/) 和入门文档。
