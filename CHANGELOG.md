# 更新日志

- category: 4

---

## 0.9.1 `2015-09-26`

* 添加 Pagination pageSize 发生变化的回调。[#317](https://github.com/ant-design/ant-design/issues/317)
* 升级依赖 rc-upload 到 1.6.x，修复 IE8/9 下的兼容性问题。
* 升级依赖 rc-steps 到 1.3.x。
  * 新增 current 属性，方便配置当前的步骤。[#290](https://github.com/ant-design/ant-design/issues/290)
  * 修复因滚动条影响页面宽度导致的错位问题。
* 升级依赖 rc-menu 到 1.5.x。
  * 新增 onSelect 回调中返回参数 keyPath，从而支持只展开当前父级菜单的交互方式。[demo](http://ant.design/components/menu/#demo-sider-current)
  * 修复 hover 类型的弹出菜单能响应点击事件的问题。[react-component/menu#14](https://github.com/react-component/menu/issues/14)
* 修复一个 Table 的分页无法正确展示的问题。[#253](https://github.com/ant-design/ant-design/issues/253)
* 修复一个 combobox 选择框无法选中的问题。[0435ca6](https://github.com/ant-design/ant-design/commit/0435ca60e3b574bac3808a10ba3db62f482335fd)
* 修复 Radio.Button 在 IE 8 下不可用的问题。[#321](https://github.com/ant-design/ant-design/issues/321)
* 适配 breadcrumb 面包屑组件和 `react-router@1.0.0-rc1`。
* 修复只能同时弹出一个 Modal 通知框的问题。[d6a4094](https://github.com/ant-design/ant-design/commit/d6a4094bc4c72acd05be001c7e46dbd17092001a)
* 升级依赖 rc-tooltip 到 2.8.0，增加 overlayClassName 属性。
* 部分组件交互和视觉效果修正。


## 0.9.0 `2015-09-14`

* 新增 [timeline](components/timeline/) 和 [badge](components/badge/) 组件。
* 优化弹出层类组件的动画效果，使其更加流畅。
* 部分文案更新。
* 优化主站在小分辨率屏幕下的样式。
* 使用 instantclick 改造主站，加载速度有明显提升。
* antd-bin 升级到 [0.6.x](https://github.com/ant-design/antd-bin/blob/master/HISTORY.md) 。
* Upload **重构了 API 接口，不向下兼容**，支持自定义的功能扩展。
  * 新增 `onChange(file) {}` 接口，移出原来的 `onSuccess`、`onProgess`、`onError` 等接口。
  * 新增 `fileList` 和 `defaultFileList` 属性，以满足更多的自定义功能，具体见演示。
  * 设置 fileList 数组项的 url 属性可以作为链接展示在文件列表中方便下载。
  * 移除内建的上传成功或失败的信息提示，业务可自行实现。
  * 修正多文件选择上传时文件列表只展示一个文件的问题。
* Table
  * 新增可展开的 table。[#258](https://github.com/ant-design/ant-design/pull/258)
  * 新增无数据的展示样式。[4c54644](https://github.com/ant-design/ant-design/commit/4c54644116d46cb2510d2d475234529bad60e5d5)
  * 修复本地模式 `dataSource` 无法更新的问题。[6d2dcc4](https://github.com/ant-design/ant-design/commit/6d2dcc45393b6ec0ad1ba73caf8b1ec42353743f)
  * 修复远程模式 loading 失效的问题。[9b8abb2](https://github.com/ant-design/ant-design/commit/9b8abb219934c246970a84200818aa8f85974bdf)
  * 用 [reqwest-without-xhr2](http://npmjs.com/reqwest-without-xhr2) 代替了 reqwest，解决某些开发环境下 xhr2 依赖的问题。
* Select
  * 增加 label 属性，允许多选模式下展示标签（原来只能显示 value 值）。[演示](http://react-component.github.io/select/examples/mul-suggest.html)
  * 修复 combobox 模式下 value 失效的问题。
* Notification 修复不会自动消失的问题。[23fce55](https://github.com/ant-design/ant-design/commit/23fce559b0b2faf4e0b686a92dbcdd045727a464)
* Steps 新增竖版的步骤条。
* Carousel 修复 fade 模式下可以拖拽的问题。#212
* Collapse 修复动画不生效的问题。
* Datepicker 修复无法设置为空值的问题。
* Modal
  * 添加 [通知类型](http://ant.design/components/modal/#demo-info) 的对话框函数。
  * 用 `Modal.confirm()` 代替 `confirm()` 方法。
  * 修改为需要在 onCancel 手动设置 visible 属性来关闭。
* Message 添加 [加载中类型](http://ant.design/components/message/#demo-loading)。
* Radio 修改 Radio.Group 容器的盒模型属性为 inline-block 。
* Enter Animation
  * 大幅度的重构，全新 API 的设计。
  * 支持和 react-router 结合使用。


## 0.8.0 `2015-08-25`

这个版本是第一个稳定版，组件经过三期迭代，基本到齐，并有大量改进和变化，不向下兼容。

* 新增九个组件 `menu`、`upload`、`carousel`、`tree`、`notification`、`validation`、`affix`、`alert`、`enterAnimation`。目前共有组件 34 个，基本能满足后台类项目的组件需求。
* 新增设计文档部分，包括文字、色彩、动画。
* 重新梳理了设计和 React 实现部分的关系，强调了 Ant Design 的设计属性，并更新了网站的信息结构。
* 构建工具 `antd-bin` 升级到 `0.4.0` 版本，支持合并 webpack 配置，热替换（HMR）等特性，[详见](https://github.com/ant-design/antd-bin)。
* 组件动画优化和补充，体验更加流畅动感。
* 排查并修复 IE 和 safari 等浏览器的兼容问题。
* 大量代码重构，演示代码补充，文档更新、以及样式上的优化。

## 0.7.3 `2015-07-30`

* 小幅重构了 Table 分页，修复了分页导致的数据不展示的问题。
* 更新了部分文档。

## 0.7.2 `2015-07-27`

* 修复本地模式下 pagination 为 false 时数据无法显示的 [问题](https://github.com/ant-design/ant-design/commit/1954586665e59031eae5d2c8b2cdb08f83d64fcb)。
* 重构了 message 组件。
* 添加英文版说明文档 [README-en_US.md](https://github.com/ant-design/ant-design/blob/master/README-en_US.md)。
* 部分代码切换至 ES6 模式。
* 修正了部分组件的样式和演示，优化部分动画。

## 0.7.1 `2015-07-22`

* 修复了 Table 组件的 pagination 为 false 时分页未消失的 [问题](https://github.com/ant-design/ant-design/commit/01a6c0f1e6707b72a54ef30d073d148a87b391a8)。
* select 组件[选中后默认显示标签内容](https://github.com/ant-design/ant-design/issues/50)（原来是显示 value）。
* 修正了部分组件的样式和演示。
* 打包文件为 [umd 模式](https://github.com/ant-design/ant-design/commit/9b7b940cb417429d8fc57d83e252991b043d0f2f)。

## 0.7.0 `2015-07-21`

* 第一个公开版本，发布 `layout`、`iconfont`、`button`、`form`、`checkbox`、`radio`、`switch`、`slider`、`input-number`、`datepicker`、`select`、`tabs`、`steps`、`breadcrumb`、`collapse`、`pagination`、`modal`、`message`、`dropdown`、`popover`、`popconfirm`、`tooltip`、`progress`、`table` 等组件。
* 发布 [Ant Design 首页](http://ant.design/) 和入门文档。
