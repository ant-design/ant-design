# 更新日志

- category: 4

---

## 0.11.0 `2015-12-17`

### 设计

最重要的消息莫过于，设计资源开放 [下载](TODO) 啦！

- 新增 [吊顶规范](TODO)。
- 新增 [通用搜索框](TODO) 样式。
- Button 新增虚线型按钮，并把圆角调整为 6px。
- Table 新增 [紧凑型表格](TODO)。
- Switch 新增小尺寸。
- Icon 增加更多的图标。[#](https://github.com/ant-design/ant-design/commit/087c64649d73206a4d62e52f9b3f6042c1d28608#diff-dc1a1f4794c1c4ee3b083381d4c50c47R180)

- 调整警告和错误状态色。
- Select.Option 被选中样式调整。
- Table 调整 filter 的样式，trigger 图标改为漏斗，小勾改为 Checkbox。[演示](TODO)
- Alert 默认不显示 Icon，且对于设置了 `description` 的情况，Icon 改为描线图标。
- Tabs 调整 [新增和关闭页签](TODO) 的样式。


### 组件

`0.11.0` 在为组件进行了大量的视觉、交互优化的同时，也给组件添加了不少功能。

- 新增 [Transfer](TODO) 组件。
- Modal、Popconfirm、Table 支持国际化。
- Dropdown 新增 `Dropdown.Button`，左边是普通按钮，右边是打开额外相关功能菜单的 trigger。[演示](TODO)
- Menu 新增 `Menu.ItemGroup` 用于把菜单项分组。
- Badge 现在可以设置封顶的数字。[演示](TODO)
- Upload 上传文件为图片时，可以显示缩略图。[演示](TODO)
- Slider 双滑块交互修改，一个滑块在拖动时可以直接跨过另一滑块。设置 `allowCross={false}` 可以禁用该行为。
- Breadcrumb 可以自定义分隔符。
- Popconfirm 可以控制是否显示。[演示](TODO)
- Tabs `tabPosition` 现在支持四个位置 `top|right|bottom|left`。

- Timepicker
  - 重命名为 TimePicker。
  - 移除 `hourOptions` `minuteOptions` `secondOptions`，分别提供对应的替代功能 `disabledHours` `disabledMinutes` `disabledSeconds`。[演示](TODO)
- Datepicker
  - 重命名为 DatePicker。
  - 改为受控组件。
  - 新增 [日期范围选择控件](TODO)。
- Table 移除 `dataSource` 远程模式。
- Tabs 移除 `animation` 属性，并且当 `tabPosition` 为 `left` `right` 时，无切换动画。
- 移除默认加载的样式文件，样式需要独立加载。


## 0.10.4 `2015-11-30`

- 将 media-match 加入默认的 polyfill 文件中。[5626974](https://github.com/ant-design/ant-design/commit/562697423b1139eb324c1dceb051c143f4870ed7)
- 修复了 [MonthPicker](http://ant.design/components/datepicker/#demo-month-picker) 报错问题，并增加了相关演示。
- 修复 RadioGroup 中的 Radio/RadioButton 无法单独设置 disabled 的问题。[#603](https://github.com/ant-design/ant-design/issues/603)
- 修复今天是不可选日期时的一个展示问题。[#606](https://github.com/ant-design/ant-design/issues/606)


## 0.10.3 `2015-11-26`

- 和 0.9.x 保持一致默认引入 `antd/lib/index.css`（而非 less 文件），方便第三方引用。引用 less 文件进行变量配置的可自行 `import 'antd/style/index.less'`。[#593](https://github.com/ant-design/ant-design/issues/593)
- 升级 Pagination，增加 `defaultCurrent` 属性，修正原来的 `current` 为[完全受控属性](https://facebook.github.io/react/docs/forms.html#controlled-components)。
- Pagination 的改动也修复了 Table 切换数据源后回到[第一页的例子](http://ant.design/components/table/#demo-ajax)。
- 对演示和样式代码增加了 lint 检查。


## 0.10.2 `2015-11-25`

- Slider 新增 `tipFormatter` 用于格式化 Tooltip 的内容。
- 优化 Badge 动画效果。
- 修复以下问题：
  - 文本域的表单校验无法重置。
  - 设置 Upload 的 `multiple` 为 `true` 时，未显示每个文件的上传进度。
  - Breadcrumb 配合 Router 的时候如果没有 `breadcrumbName` 会抛错。
  - InputNumber 同时设置 `size` `className` 时会有冲突。


## 0.10.1 `2015-11-20`

- 修改内部组件的引用结构，方便工具优化。[#566](https://github.com/ant-design/ant-design/pull/566)
  - 移除了演示中没有使用过的 `antd.ButtonGroup`，依然用 `const ButtonGroup = Button.Group` 来使用。
  - Form 和 Input 目录分离，`import { Form, Input } from 'ant/lib/form'` 的引用方式被废弃。

     现在可以 `import Form from 'ant/lib/form'` 和 `import Input from 'ant/lib/input'`。

     原有的 `import { Form, Input } from 'antd'` 则不受影响。

- 修复 Datepicker 的 `style` 和 `calendarStyle` 属性失效的问题，并将 `calendarStyle` 更名为 `popupStyle`。


## 0.10.0 `2015-11-20`

- 全面兼容 `react@0.14.x`。
- 新增 [时间选择 Timepicker](http://ant.design/components/timepicker/)、[日历 Calendar](http://ant.design/components/calendar/)、[加载中 Spin](http://ant.design/components/spin/) 组件。
- [Button](http://ant.design/components/button/)、[Iconfont](http://ant.design/components/icon/)、[Layout](http://ant.design/components/layout/)、[Form](http://ant.design/components/form/)、[Input](http://ant.design/components/form/#demo-input) 等样式模块改造为 React 组件。
- 新增 [Queue-anim](http://ant.design/components/queue-anim/) 组件，更换了原来的 enter-animation。
- 全新的[字体图标](/components/icon)。
	- 全面更新视觉风格，补充更多图标。[#313](https://github.com/ant-design/ant-design/issues/313)
	- 调整字体基线，告别对图标位置的特殊调节。(感谢 [iconfont.cn](http://iconfont.cn) 的鼎力支持)
- Datepicker、Dropdown、Select、Popover、Popconfirm 等浮层组件添加在空间不足的情况下自动调整位置功能。
- Popover、Tooltip、Popconfirm 组件支持 12 个方向。[#312](https://github.com/ant-design/ant-design/issues/312)
- 优先使用苹方字体。
- 统一 size 属性的可选值为 `small` `default` `large`。
- 开始初步补充[测试用例](https://github.com/ant-design/ant-design/tree/1a3a19793c0791201666fdcf0dbd12a30fad4be0/tests)。
- 提供主色系更换的[方案](https://github.com/ant-tool/xtool/tree/master/examples/customize-antd-theme)。[#384](https://github.com/ant-design/ant-design/issues/384)
- 添加[色彩换算工具](http://ant.design/spec/colors#色彩换算工具)。
- 添加布局和导航规范，以及[常用布局](http://ant.design/spec/layout/)。
- 文档支持标题和演示的锚点，方便分享文档和演示代码。
- 提供多版本的文档，在[主站](http://ant.design)的右下角提供切换按钮。
- [antd-bin](https://github.com/ant-tool/xtool) 升级到 `0.10`。
	- 拆分出 [antd-init](https://github.com/ant-design/antd-init) 和 [antd-build](https://github.com/ant-design/antd-build)。
	- 提供代理功能。
	- 提供 UI 测试功能。

#### 组件变更

- Table
	- 支持单选。[演示](http://ant.design/components/table/#demo-row-selection-radio-props)
	- 选择模式支持默认选中和不可用效果。[演示](/components/table/#demo-row-selection-props)
	- 列支持了 `colSpan` 和 `rowSpan` 配置。[演示](/components/table/#demo-colspan-rowspan)
	- 新增 `loading` 属性。
	- 筛选增加 `filterMultiple` 属性，支持单选的配置。
- Datepicker
	- 添加国际化支持。
	- 添加手动输入和清除功能。
	- 优化了视觉样式。
	- 修复不标准的日期格式导致显示错误的问题。
	- 用 `onChange` 属性代替 `onSelect` 属性。
- Validation 修复了 对 Datepicker、Input-number、Select 的支持，并添加了相关演示。
- Carousel 的依赖 react-slick 升级到 0.9.x，相关 API 也相应更新。
- Tree 组件支持完全受控模式。[#397](https://github.com/ant-design/ant-design/issues/397)
- Input Number
	- 组件输入体验优化，现在可以键入任意字符，失焦时格式化为合法值。
	- 修复不支持小数 step 的问题。[#530](https://github.com/ant-design/ant-design/issues/530)
- Tabs 新增[垂直页签功能](http://ant.design/components/tabs/#demo-vertical-left)。
- Upload 组件视觉优化，新增高级浏览器下的上传进度展示。[#311](https://github.com/ant-design/ant-design/issues/311)
- Menu
	- 视觉效果大幅优化。
	- 新增 [dark 主题](http://ant.design/components/menu/#demo-theme) 的样式。
	- 修复一个链接点击区域的问题。[#535](https://github.com/ant-design/ant-design/issues/535)
- Dropdown 用 onClick 代替 onSelect 作为推荐的使用方式，因为原有的 onSelect 只在变化时触发。
- Slider
	- 新增[双滑块功能](http://ant.design/components/slider/#demo-range)。
	- 优化 marks 属性的使用逻辑，使其可以和具体数值进行绑定。[slider#26](https://github.com//react-component/slider/issues/26)
	- 属性命名优化，用 `dots` 代替了 `withDots` 属性，用 `included` 代替了 `isIncluded`。
- Badge 当 `count` 为 0 时不展示。
- Progress 新增 `format` 属性，能够自定义展示的进度文案。
- Modal 新增 `confirmLoading` 属性。
- 新增 Radio.Button 的失效样式。
- 提供 IE8 下的圆角按钮[兼容方案](http://ant.design/components/button/#ie8-border-radius-support)。
- `antd.Notification()` 修正为 `antd.notification()`。
- 另有巨量样式的修复和优化。

> 备注：
>
> - [计划和推进 issue](https://github.com/ant-design/ant-design/issues/276)
> - [0.10 升级指南](http://ant.design/docs/upgrade-notes)


## 0.9.3 ~ 0.9.5 `2015-11-04`

* 增加对 React 版本的检测提示机制，0.9.x 序列只能使用 `react@~0.13.3`。


## 0.9.2 `2015-10-26`

* Tooltip 的 title 为空时不展示浮层。[9b53117](https://github.com/ant-design/ant-design/commit/9b5311791e73270c7c16a602ac74dd59719a5f76)
* 修复 Upload 文件列表链接的 target 属性。[340a170](https://github.com/ant-design/ant-design/commit/340a1702b6a7b065ac02d417c891e1886dfe470d)
* 修复 Datepicker 设置 defaultValue 时星期顺序错误的问题。[9ef1450](https://github.com/ant-design/ant-design/commit/9ef14500f3abfcc7081f8dceab8187ec835e3918)
* 修复一些小的样式问题。


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
