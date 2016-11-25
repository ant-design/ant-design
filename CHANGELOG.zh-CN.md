---
order: 5
title: 更新日志
toc: false
timeline: true
---

如果需要查看 `1.11.2` 及之前的更新日志，请移步 [GitHub](https://github.com/ant-design/ant-design/releases?after=2.0.0)。

---

## 2.4.3

`2016-11-17`

* 修复 `Anchor` 内部 querySelector 报错，并做了一些体验优化 。[#3832](https://github.com/ant-design/ant-design/issues/3832) [#3844](https://github.com/ant-design/ant-design/issues/3844)

## 2.4.2

`2016-11-13`

* 修复 `Dropdown.Button` 不弹出的问题。[#3815](https://github.com/ant-design/ant-design/issues/3815)

## 2.4.1

`2016-11-11`

* 修复 `2.4.0` 组件 index 文件丢失的问题。

## 2.4.0

`2016-11-11`

* 调整了组件的导航结构。
* 新增 [Anchor](https://ant.design/components/anchor) 锚点组件。
* 整理了样式变量，修复 `@font-size-base` 和 `@text-color` 在部分组件无效的问题，新增 `@font-size-lg` `@text-color-secondary`，并移除了部分无用的变量。
* `Transfer` 组件新增了受控属性 `selectedKeys`。[#3729](https://github.com/ant-design/ant-design/issues/3729)
* `Tag` 新增选中状态。
* 修复 `Dropdown.Button` 不支持 `visible` 和 `onVisibleChange` 的问题。[#3779](https://github.com/ant-design/ant-design/issues/3779)
* 修复 `DatePicker[showTime]`` 的 `此刻` 按钮。[#3748](https://github.com/ant-design/ant-design/issues/3748)
* 修复 `Steps` 竖直方向的样式。[#3760](https://github.com/ant-design/ant-design/issues/3760)
* 修复 `Spin` 组件在 IE10+ 的样式问题。[#3755](https://github.com/ant-design/ant-design/issues/3755)
* 修复 `Mention` 组件的 focus 逻辑. [#3801](https://github.com/ant-design/ant-design/issues/3801)
* 修复 `Progress` 组件的动画问题。[#3784](https://github.com/ant-design/ant-design/issues/3784)
* 修复 `Select` 搜索时的丢失焦点问题。[#3778](https://github.com/ant-design/ant-design/issues/3778)
* 修复 `TimePicker` 不支持 `format="HH"` 等格式的问题。[#3793](https://github.com/ant-design/ant-design/issues/3793)
* 修复 `Input` 的 `suffix` 部分区域中鼠标事件无法响应的问题。[#3714](https://github.com/ant-design/ant-design/issues/3714)
* 优化了 `Table` 选择的性能。[#3757](https://github.com/ant-design/ant-design/pull/3757)
* 优化 `Carousel` 的默认样式。
* 优化 `Checkbox` 和 `Radio` 的样式。[#3590](https://github.com/ant-design/ant-design/issues/3590)
* 修复 `DatePicker`、`Form`、`Table` 等组件的样式细节。

## 2.3.2

`2016-11-09`

* 修复使用 `getFieldProps` 会导致死循环的问题。

## 2.3.1

`2016-11-07`

* 修正上个版本缺少 `dist/antd.css` 的问题。

## 2.3.0

`2016-11-04`

* 升级 normalize.css 到 5.0。
* package.json 的 main 换成了 `lib/index.js`。[#3397](https://github.com/ant-design/ant-design/pull/3397)
* 全新的 `Spin` 设计。
* `TimePicker` 新增了 `addon` 以支持自定义的附加内容。
* `Tree` 新增了 `onDragEnd`。
* `Collapse` 新增了 `bordered`。
* 优化 `Tabs` 切换时的动画效果。
* 优化 `Radio` 和 `Checkbox` 在禁用和鼠标停留时的样式。[#3590](https://github.com/ant-design/ant-design/issues/3590)
* 优化 `Transfer` 的性能。[#2860](https://github.com/ant-design/ant-design/issues/2860)
* 修复 `Popover` 嵌套时的样式问题。[#3448](https://github.com/ant-design/ant-design/issues/3448)
* 修复 `Transfer` 服务端渲染报错的问题。[#3686](https://github.com/ant-design/ant-design/issues/3686)
* 修复 `Upload` `picture-card` 模式下新上传的图片不显示预览的问题。[#3706](https://github.com/ant-design/ant-design/pull/3706) [@denzw](https://github.com/denzw)
* DatePicker
  * 在 `showTime` 模式下现在失去焦点也会触发 `onChange`。
  * `MonthPicker` 增加了 `monthCellContentRender` 和 `cellContentRender`。
  * `RangePicker` 现在可以手动输入时间了。[#3718](https://github.com/ant-design/ant-design/issues/3718)
  * 新增了捷克语的翻译。
* Badge
  * 优化鼠标停留时超过 99 的数字显示。[#3645](https://github.com/ant-design/ant-design/issues/3645)
  * 修复单独使用时会有移动动画的问题。[#3709](https://github.com/ant-design/ant-design/issues/3709)
* Mention
  * 修复会被 `Table` 遮住的问题。[#3588](https://github.com/ant-design/ant-design/issues/3588)
  * 新增 `getSuggestionContainer` 来指定容器。[#3658](https://github.com/ant-design/ant-design/pull/3658)
* Tag
  * 废弃 `color` 属性。[#3560](https://github.com/ant-design/ant-design/issues/3560)
  * 新增 `type`。[#3560](https://github.com/ant-design/ant-design/issues/3560)
  * 新增 `checkable`。[#3560](https://github.com/ant-design/ant-design/issues/3560)
* Radio.Group
  * 新增 `className`。
  * `children` 为 `null` 或 `undefined` 时现在会被忽略。
* Select
  * 新增 `tokenSeparators` 支持粘贴时自动分词。[#2071](https://github.com/ant-design/ant-design/issues/2071)
  * 新增 `onFocus` 回调。[#3587](https://github.com/ant-design/ant-design/issues/3587)
  * 修复 `combobox` 模式下选中项不能正确显示的问题。[#3401](https://github.com/ant-design/ant-design/issues/3401)

## 2.2.1

`2016-11-02`

* 修复 Form 中 DatePicker[showTime]（受控）无法使用的问题。[#3665](https://github.com/ant-design/ant-design/issues/3665)

## 2.2.0

`2016-10-28`

* 支持 TypeScript@2.0。[@AlbertZheng](https://github.com/AlbertZheng) [#3358](https://github.com/ant-design/ant-design/issues/3358)
* 不再强依赖于 React 特定版本。[#3627](https://github.com/ant-design/ant-design/pull/3627)
* Alert 支持 `className` `style` 属性。
* DatePicker MonthPicker RangePicker 现在允许设置是否显示清除按钮。[#3618](https://github.com/ant-design/ant-design/issues/3618)
* Form.Item 现在可以感知深层嵌套的表单域，以自动为其生成错误信息和状态。[#3212](https://github.com/ant-design/ant-design/issues/3212)
* RangePicker 现在可以设置不可选的时间。[#](https://ant.design/components/date-picker/#components-date-picker-demo-disabled-date)
* Switch
  * 宽度现在会随着 `checkedChildren/unCheckedChildren` 自动调整。[#3380](https://github.com/ant-design/ant-design/issues/3380)
  * 优化切换动画。
* Upload 现在可以 [自定义上传方式](https://github.com/react-component/upload#customrequest)。[@edgji](https://github.com/edgji)
* Icon
  * 新增 `bulb` `select` `like-o` `dislike-o`。
  * 调整 `loading` `like` `dislike`。
* 优化 Card DatePicker Icon Table 的 TypeScript 定义。[@infeng](https://github.com/infeng) [3468](https://github.com/ant-design/ant-design/pull/3468) [#3603](https://github.com/ant-design/ant-design/pull/3603) [#3531](https://github.com/ant-design/ant-design/pull/3531)
* 修复 Cascader `defaultValue` 失效的问题。[#3470](https://github.com/ant-design/ant-design/issues/3470)
* 修复在一行内同时使用 Button Input DatePicker Select 时对齐的问题。[#3481](https://github.com/ant-design/ant-design/issues/3481)
* DatePicker
  * 修复设置 `DatePicker[showTime]` 后 `onChange` 事件触发时机问题。[#3523](https://github.com/ant-design/ant-design/issues/3523)
* 修复 Dropdown.Button disabled 后仍然响应操作的问题。[#3535](https://github.com/ant-design/ant-design/issues/3535)
* Menu
  * 修复服务端渲染问题，感谢 [@xpcode](https://github.com/xpcode) 定位问题。[#2061](https://github.com/ant-design/ant-design/issues/2061) [#2406](https://github.com/ant-design/ant-design/issues/2406) [#3293](https://github.com/ant-design/ant-design/issues/3293)
  * 修复 children 不能为 `null` 的问题。[#3599](https://github.com/ant-design/ant-design/issues/3599)
* 修复 message 加载状态无动画的问题。[#3536](https://github.com/ant-design/ant-design/issues/3536)
* Form
  * 修复 `Form[inline]` 与 `Input[addonBefore|addonAfter]` 一起使用时的样式问题。[#3524](https://github.com/ant-design/ant-design/issues/3524)
  * 修复 Form.Item 内 Radio.Button 样式问题。
  * 修复 Form.Item 内搜索按钮的样式问题。[#3630](https://github.com/ant-design/ant-design/issues/3630)
  * 修复用户无输入时 Form.Item 识别为校验成功的问题。[#3613](https://github.com/ant-design/ant-design/issues/3613)
* 当 `Popover[title]` 没有设置时，不再限制 Popover 的最小宽度。
* Table
  * 修复固定表头在没有数据情况下的样式问题。[#3567](https://github.com/ant-design/ant-design/issues/3567)
  * 修复无数据时会覆盖 SubMenu 的问题。[#3521](https://github.com/ant-design/ant-design/issues/3521)
* Tabs
  * 修复卡片叶签头部高度与设计稿不一致的问题。
  * 修复 TabPane 的高度会被同级 TabPane 撑高的问题。[#3304](https://github.com/ant-design/ant-design/issues/3304)
* 修复 `TreeSelect[showSearch]` 样式问题。[#3520](https://github.com/ant-design/ant-design/issues/3520)

## 2.1.0

`2016-10-16`

- Icon 现在支持旋转动画。
- Tabs 现在可以禁用切换动画。[#3324](https://github.com/ant-design/ant-design/issues/3324)
- 新增西班牙语的 localization 支持。@Danjavia
- 更新俄语的 localization 文案。@plandem
- 新增 AutoComplete[onSelect] 回调。
- 优化 Modal 样式细节。
- 优化 Tooltip 动画。
- 优化 Transfer 按钮的样式。
- 优化 Tree 的样式细节。
- 整理和修复了部分 less 变量。
- 修复服务端渲染时全量引入 antd 报错的问题。
- 修复 Affix 与 BackTop 的服务端渲染问题。[#3283](https://github.com/ant-design/ant-design/issues/3283) [#3343](https://github.com/ant-design/ant-design/issues/3343)
- 修复 Card[title] 内无法使用 `h3` 之类的标签的问题。[#3388](https://github.com/ant-design/ant-design/issues/3388)
- 修复 Cascader 搜索模式与浏览器自动完成有冲突的问题。[#3350](https://github.com/ant-design/ant-design/issues/3350)
- DatePicker
  - 修复设置 `showTime` 后，`onChange` 重复触发的问题。[#3376](https://github.com/ant-design/ant-design/issues/3376)
  - 修复浮层与 Trigger 日期格式不一致的问题。[#3405](https://github.com/ant-design/ant-design/issues/3405) [#3298](https://github.com/ant-design/ant-design/issues/3298)
  - 修复与 TimePicker 样式冲突问题。[#3312](https://github.com/ant-design/ant-design/issues/3312) [#3307](https://github.com/ant-design/ant-design/issues/3307)
- 修复 Form.Item 标签文案过长溢出的问题。
- 修复 Icon 在 Safari 下会出现边框的问题。
- 修复 InputNubmer 键盘事件死循环问题。[#3239](https://github.com/ant-design/ant-design/issues/3239)
- 修复 Popover 箭头样式问题。
- 修复 Popover 和 Popconfirm 的 `arrowPointAtCenter` 无效的问题。
- Select
  - 修复样式重复引入的问题。[#3376](https://github.com/ant-design/ant-design/issues/3376)
  - 修复 `notFoundContent` 无法置空的问题。[#3345](https://github.com/ant-design/ant-design/issues/3345)
  - 修复 Table 内使用 Select[showSearch] 后宽度会跳动的问题。[#3413](https://github.com/ant-design/ant-design/issues/3413)
- 修复 Table 边框线与页头页脚冲突的问题。[#3301](https://github.com/ant-design/ant-design/issues/3301)
- 修复 TabPane 高度不随内容变化的问题。[#3377](https://github.com/ant-design/ant-design/issues/3377)
- 修复 Transfer[titles] 不受 LocaleProvider 控制的问题。[#3264](https://github.com/ant-design/ant-design/pull/3264)
- Upload
  - 修复用户自定义 `onRemove` 事件会覆盖默认行为的问题。[#3317](https://github.com/ant-design/ant-design/issues/3317)
  - 修复图片卡片样式问题。[#3316](https://github.com/ant-design/ant-design/issues/3316)
- 修复项目构建时 moment locales 找不到的问题。[#3204](https://github.com/ant-design/ant-design/issues/3204) [#3411](https://github.com/ant-design/ant-design/issues/3411)

## 2.0.1

`2016-10-01`

- 修复无法调用 react-slick 方法的问题。[#3164](https://github.com/ant-design/ant-design/issues/3164)
- 修复 Steps.Step[icon] 不支持 React.ReactNode 的问题。[#3159](https://github.com/ant-design/ant-design/issues/3159)
- 修复 Affix 不支持服务端渲染的问题。[#3216](https://github.com/ant-design/ant-design/issues/3216)
- 修复 Mention 不支持 `onSelect` `placeholder` 的问题。[#3236](https://github.com/ant-design/ant-design/issues/3236) [#3226](https://github.com/ant-design/ant-design/issues/3226)
- 修复 Transfer 与 `getFieldDecorator` 一起使用时的报错问题。
- 修复 LocaleProvider 对时间组件无效的问题。
- 修复 Cascader 搜索模式搜索文字显示不了的问题。
- 修复 Spin 动画与文案整体不垂直居中的问题。
- 修复 RangePicker Modal Tag Progress 等组件样式问题。

## 2.0.0

`2016-09-28`

很高兴的通知各位，经过四个月时间的紧密开发，`antd@2.0.0` 终于发布了。这个版本我们重构了底层代码，持续完善现有组件功能和优化细节，并提供了英文版的文档，其中很多都来自社区的贡献，无法一一感谢，欢迎各位持续关注和鞭策。在升级过程中遇到任何问题，请及时 [反馈给我们](https://github.com/ant-design/ant-design/issues)。

### 2.x 主要变化

* 开发语言改为 TypeScript，提供 **官方支持的 `.d.ts` 文件**，感谢 [#1846](https://github.com/ant-design/ant-design/issues/1846) 中所有参与到这次重构的人以及后期 @infeng 对其的完善。
* **新增英文文档**， 以后将同时提供中英双语文档，感谢 [#1471](https://github.com/ant-design/ant-design/issues/1471) 里所有参与到翻译和审阅工作中的人。
* 时间类组件 DatePicker、TimePicker、Calendar 等的底层 **使用 [moment](http://momentjs.com/) 替换 [gregorian-calendar](github.com/yiminghe/gregorian-calendar)**。
* 全新设计的 [图标](http://ant.design/components/icon/)。
* 新增提及组件 [Mention](http://ant.design/components/mention/)。
* 新增自动完成组件 [AutoComplete](http://ant.design/components/auto-complete/)。
* Form 新增 `getFieldDecorator` 作为 `getFieldProps` 的替代，对于不正确的使用方式 `getFieldDecorator` 会给出提示，可以降低踩坑的概率。相关讨论见 [#1533](https://github.com/ant-design/ant-design/issues/1533)。
* Table 支持 [表头分组](http://ant.design/components/table/#components-table-demo-grouping-columns)。@yesmeck
* 完全移除 `antd@1.x` 中已经废弃的 QueueAnim、Validation、Form.ValueMixin、Progress.Line、Progress.Circle、Popover[overlay] 及 Slider[marks] 对数组的支持。

### 2.x 不兼容改动

此版本有部分不兼容的改动，升级时确保修改相应的使用代码。

* 时间类组件的 `value` 和 `defaultValue` 不再支持 `String/Date` 类型，请使用 [moment](http://momentjs.com/)。
  ```diff
  - <TimePicker defaultValue="12:08:23" />
  + <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} />

  - <DatePicker defaultValue="2015/01/01" />
  + <DatePicker defaultValue={moment('2015/01/01', 'YYYY/MM/DD')} />

  - <Calendar defaultValue={new Date('2010-10-10')} />
  + <Calendar defaultValue={moment('2010-10-10', 'YYYY-MM-DD')} />
  ```
* 时间类组件的 `onChange` 和 `onPanelChange` 及其他回调函数中为 `Date/GregorianCalendar` 类型的参数，均修改为 moment 类型，两者 API 有所不同，但功能基本一致，请对照 [moment 的 API 文档](http://momentjs.com/docs/) 和 [gregorian-calendar 的文档](https://github.com/yiminghe/gregorian-calendar) 进行修改。你也可以参考这个 [commit](https://github.com/ant-design/ant-design/commit/5a4ebe535f0353089b30ac331bc4fb7877963371) 来进行修改。

  由于 `JSON.stringy(date: moment)` 返回的值会丢失时区设置，所以要先使用 `.format` 把日期转成字符串，相关 issue 见 [#3082](https://github.com/ant-design/ant-design/issues/3082)：
  ```js
  handleSubmit() {
    const values = this.props.form.getFieldsValue();
    values.date = values.date.format('YYYY-MM-DD HH:mm:ss'); // 或其它格式
    const data = JSON.stringify(values);
    // 发送 data 到服务器
  }
  ```

* 时间类组件与表单校验一起使用时，`type: 'date'` 改为 `type: 'object'`。
* 时间类组件的 `format` 属性也发生了变化，从 [gregorian-calendar-format 的格式](https://github.com/yiminghe/gregorian-calendar-format#api) 变化为与 [moment 的格式](http://momentjs.com/docs/#/parsing/string-format/)，例如原来的 `yyyy-MM-dd` 将变为 `YYYY-MM-DD`。
* Breadcrumb 移除 `linkRender` 和 `nameRender`，请使用 `itemRender`。
* Menu 移除 `onClose` `onOpen`，请使用 `onOpenChange`。API 差异较大，请先研究 [demo](http://beta.ant.design/components/menu/#components-menu-demo-sider-current)。
* Table 移除列分页功能，请使用 [固定列](http://ant.design/components/table/#components-table-demo-fixed-columns)。
* Popover 移除 `overlay` ，请使用 `content`。

以下变化升级后旧代码仍然能正常运行，但是控制台会出现警告提示，建议按提示进行修改。

* Form 废弃 `getFieldProps`，请使用 `getFieldDecorator`：

  ```diff
  -  <Input placeholder="text" {...getFieldProps('userName', { ... })} />
  +  {getFieldDecorator('userName', { ... })(
  +    <Input placeholder="text" />
  +  )}
  ```

  相关讨论可以看 [#1533](https://github.com/ant-design/ant-design/issues/1533)。

* DatePicker 废弃 `toggleOpen`，请使用 `onOpenChange`：

  ```diff
  - handleToggleOpen({ open }) {
  + handleOpenChange(open) {
    ...
  }
  ```

### 2.x Bug 修复

* 修复 Dropdown.Button `disabled` 属性无效的问题。[#3070](https://github.com/ant-design/ant-design/issues/3070)
* 修复 Form.create `withRef` 选项失效的问题。[#2843](https://github.com/ant-design/ant-design/issues/2843)
* 修复 Menu inline 模式下子菜单展开的问题。[#2701](https://github.com/ant-design/ant-design/issues/2701)
* 修复 Modal.confirm 之类的弹窗在异步调用时按钮仍可点击的问题。[#2684](https://github.com/ant-design/ant-design/issues/2684)
* 修复 DatePicker[showTime] 参数中的 `format` 失效的问题。[#3123](https://github.com/ant-design/ant-design/issues/3123)
* 修复 Table[dataSource] 中的项的 key 为 `0` 时识别错误的问题。[#3166](https://github.com/ant-design/ant-design/pull/3166) @noonnightstorm
* 修复 Tree.Node 无子节点时仍然显示箭头的问题。[#2616](https://github.com/ant-design/ant-design/issues/2616)
* 修复 Tree.Node 箭头隐藏后鼠标 hover 上去光标仍会发生变化的问题。[#2748](https://github.com/ant-design/ant-design/issues/2748)

### 2.x 其他改进

* Alert 新增 [`banner` 模式](http://ant.design/components/alert/#components-alert-demo-banner)。
* BackTop 增加回到顶部的动画效果。
* Badge 新增 [状态点模式](http://ant.design/components/badge/#components-badge-demo-status)。
* Cascader 新增 [搜索功能](http://ant.design/components/cascader/#components-cascader-demo-search)。
* Checkbox 新增 [indeterminate 状态](http://ant.design/components/checkbox/#components-checkbox-demo-check-all)。
* Form 新增 [垂直布局](http://ant.design/components/form/#components-form-demo-validate-customized)。
* InputNumber 现在支持长按。[#](http://ant.design/components/input-number/#components-input-number-demo-basic)
* notification 支持 [自定义 icon](http://ant.design/components/notification/#components-notification-demo-custom-icon)。
* Spin 现在允许 [自定义文案与动画共存](http://ant.design/components/spin/#components-spin-demo-tip)。@jerrybendy
* Transfer 现在可以监听用户选择了哪些选项。[#](http://ant.design/components/transfer/#components-transfer-demo-basic)
* Transfer 现在可以定义哪些选项是 [不可选择的](http://ant.design/components/transfer/#components-transfer-demo-basic)。
* 优化 Alert 和 notification 的样式。
* 优化 Modal.confirm 之类的弹窗的键盘交互。@Dafrok
* 优化 [DatePicker 的时间选择](http://ant.design/components/date-picker/#components-date-picker-demo-time) 交互。
* 优化 [Spin 状态切换](http://ant.design/components/spin/#components-spin-demo-nested ) 时的效果。
* 更新 [font-family](https://github.com/ant-design/ant-design/commit/2f308b0f995cfcb2a3c8feb1e35ffd3f0bf93cfc)。

### 2.x 相关工具发布

* 新增配套网站 [AntD Library](http://library.ant.design/)，提供遵循 Ant Design 设计规范的组件、模式等的 Axure 资源。
* `babel-plugin-antd` 更名为 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)，标志着该插件将作为一个通用的按需加载方案存在，而不再是 `antd` 专有。

  请更新 `package.json`：

  ```diff
  {
    "devDependencies": {
  -   "babel-plugin-antd": "^0.x.x",
  +   "babel-plugin-import": "^1.0.0",
    }
  }
  ```

  同时更新 `.babelrc` 或你在其它地方对其的配置：

  ```diff
  {
  -  "plugins": [["antd", { style: "css" }]]
  +  "plugins": [["import", { libraryName: "antd", style: "css" }]]
  }
  ```

* [dva@1.0.0](https://github.com/dvajs/dva) 也已经发布，并推荐 [在实战项目中使用](http://ant.design/docs/react/practical-projects)。
* 脚手架工具推荐使用 [dva-cli](https://github.com/dvajs/dva-cli)，原来的 `antd-init` 以后仅会用于学习以及 demo。

## 1.11.2

去 [GitHub](https://github.com/ant-design/ant-design/releases?after=2.0.0) 查看 `1.11.2` 及之前的更新日志。
