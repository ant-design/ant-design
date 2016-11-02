---
order: 3
title: 更新日志
toc: false
timeline: true
---

如果需要查看 `0.12.x` 及之前的更新日志，请移步 [GitHub](https://github.com/ant-design/ant-design/releases?after=1.0.0)。

---

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

`2016-09-26`

- 修复 Popover 内嵌 Badge 后失效的问题。[#3109](https://github.com/ant-design/ant-design/issues/3109)
- 修复 Modal 内嵌的 Button 在某些情况下与 Modal 的滚动不同步的问题。[#3031](https://github.com/ant-design/ant-design/issues/3031)

## 1.11.1

`2016-09-14`

- 修复 Menu 设置成 `theme=dark` 后，链接点击无效的问题。[#2929](https://github.com/ant-design/ant-design/issues/2929)
- 修复迷你型 Table 表头与内容不对齐的问题。[#2933](https://github.com/ant-design/ant-design/issues/2933)
- 修复 Cascader hover 样式。[#3015](https://github.com/ant-design/ant-design/issues/3015)
- 修复 Upload 上传多个文件时，`onChange` 调用不正确的问题。[#3001](https://github.com/ant-design/ant-design/issues/3001)
- 修复 TimePicker 报错样式的问题。[#2973](https://github.com/ant-design/ant-design/issues/2973)
- 修复 Calendar 控件的年度选择下拉内容截断的问题。[#2927](https://github.com/ant-design/ant-design/issues/2927)

## 1.11.0

`2016-09-01`

- `Tooltip` `Popover` `Popconfirm` 修正默认对齐方式为边缘对齐，增加 arrowPointAtCenter 属性用于箭头指向中心的行为。[commit 977e2e3](https://github.com/ant-design/ant-design/commit/977e2e32fc40968846c8201ed72bdc3818375d2f)
- `Table`
  - 移除数据中添加的 `indexForSort`。[#2501](https://github.com/ant-design/ant-design/issues/2501)
  - 修复 `pagination` 属性中 `defaultPageSize` 不生效的问题。[#2874](https://github.com/ant-design/ant-design/issues/2874)
  - 修复数据为空时固定列出现重复提示的问题。[#2812](https://github.com/ant-design/ant-design/issues/2812)
  - 给树形子数据增加排序功能。[#2839](https://github.com/ant-design/ant-design/issues/2839)
- `InputNumber` 样式问题修复。[#2876](https://github.com/ant-design/ant-design/issues/2876)
- 修复手动导入 less 文件时 input error 样式被 focus 样式覆盖的问题。[#2916](https://github.com/ant-design/ant-design/issues/2916)
- index.d.ts 中补充了一些缺失的声明，修复 `Form` 中 typescript 语法检查报错的问题。[#2885](https://github.com/ant-design/ant-design/issues/2885)
- 升级 react-slick 依赖到 `0.13`。

## 1.10.0

`2016-08-20`

- Affix 和 BackTop 新增 `target` 属性，支持指定滚动容器。[#2718](https://github.com/ant-design/ant-design/issues/2718)
- 文档页面加上编辑按钮，方便社区贡献。[#2325](https://github.com/ant-design/ant-design/issues/2325)
- 升级 rc-cascader 依赖，修复一个 `loadData` 属性和表单结合使用的问题。[#2767](https://github.com/ant-design/ant-design/issues/2767)
- 修复 `editable-card` 类型的 Tabs 没有关闭图标的问题。[#2747](https://github.com/ant-design/ant-design/issues/2747)
- Menu 修正默认 `z-index`。[#2762](https://github.com/ant-design/ant-design/issues/2762)
- 修正 Select 组件在 IE 下的一些样式问题。[#2741](https://github.com/ant-design/ant-design/issues/2741)

## 1.9.1

`2016-08-16`

- 修复 `editable-card` 类型的 Tabs 设置 `activeKey` 无效的问题。[#2725](https://github.com/ant-design/ant-design/issues/2725)
- 修复一个 Table 的样式兼容性问题。[#2723](https://github.com/ant-design/ant-design/issues/2723)
- 更新 axure 部件库。[#2714](https://github.com/ant-design/ant-design/issues/2714)

## 1.9.0

`2016-08-15`

- Transfer 修复在火狐下 item 文案过长时只显示省略号的问题。[#2674](https://github.com/ant-design/ant-design/issues/2674)
- Input 修复 `autosize` 模式下特定场景中不能输入中文及光标定位不准的问题。[#2666](https://github.com/ant-design/ant-design/issues/2666) [#2239](https://github.com/ant-design/ant-design/issues/2239)
- Tabs 修复 `type="editable-card"` 模式下的 `children` 解析问题。[#2658](https://github.com/ant-design/ant-design/issues/2658)
- Radio 修复若干 less 硬编码问题。[#2424](https://github.com/ant-design/ant-design/issues/2424)
- Upload 的 rc-upload 依赖升级至 2.x，引入的变化有：
  - 增加 `disabled` 属性。[#2645](https://github.com/ant-design/ant-design/issues/2645)
  - 取消上传时会自动 abort 上传请求。[#2571](https://github.com/ant-design/ant-design/issues/2571) [#2518](https://github.com/ant-design/ant-design/issues/2518)
- Table
  - 修复 spin 在可滚动区域的定位问题。[#2652](https://github.com/ant-design/ant-design/issues/2652)
  - 修复无数据时 提示样式错位的问题。[#2663](https://github.com/ant-design/ant-design/issues/2663)
- Popover 修复设定 `getTooltipContainer` 后会导致内嵌 DatePicker 样式失效的问题。[#2675](https://github.com/ant-design/ant-design/issues/2675)
- Modal 修复重复卸载组件导致的报错。[#2688](https://github.com/ant-design/ant-design/issues/2688)
-  升级 rc-slider 组件依赖。

## 1.8.0

`2016-08-08`

- 修复可关闭 Tabs 组件只有一个 Tab 的时候报错的问题。[#2559](https://github.com/ant-design/ant-design/issues/2559)
- 修复 Datepicker 在 IE8 下关闭图标。[#2584](https://github.com/ant-design/ant-design/issues/2584)
- Tags 支持自定义标签颜色。[#2585](https://github.com/ant-design/ant-design/issues/2585)
- TreeSelect 修复未找到内容时的样式。[9cee9f](https://github.com/ant-design/ant-design/commit/9cee9f103a4729572358206c81cba84e2fdc20f5)
- Modal 适配小屏幕。[#2597](https://github.com/ant-design/ant-design/issues/2597)
- 修复了 Row 组件在同一行闭合会报错的问题。[#2603](https://github.com/ant-design/ant-design/issues/2603)
- Table 的 `rowSelection.onChange` 的参数 `selectedRows` 现在和 `selectedRowKeys` 保持一致。[#2566](https://github.com/ant-design/ant-design/issues/2603)
- Checkbox 和 Radio 现在支持 `onClick` 属性。

## 1.7.0

`2016-07-30`

友情提示 [Ant Design Mobile](http://mobile.ant.design) 已经发布。

- Table
  - 现可以定义页头。[demo](http://ant.design/components/table#components-table-demo-bordered)
  - 修复当 `rowKey` 为 `String` 时的报错问题。[#2500](https://github.com/ant-design/ant-design/issues/2500)
  - 修复 `Table` 会修改 `dataSource` 里面的值的问题。[#2501](https://github.com/ant-design/ant-design/issues/2501)
- Form 现在不再需要显式传递 `form={this.props.form}`。
- 优化 Breadcrumb.Item 的 hover 效果。
- 优化 Progress 的动画效果。
- DatePicker
  - 优化清除按钮样式。
  - 修复点击 `此刻` 时不触发 `onChange` 的问题。[#1902](https://github.com/ant-design/ant-design/issues/1902)
- Menu
  - 修复子菜单中的 Item 被选中后，父级元素无样式变化的问题。[#2414](https://github.com/ant-design/ant-design/issues/2414)
  - 修复 Menu.Item disabled 后的样式问题。
- TreeSelect
  - treeNodes 可以设置是否可选。[#2401](https://github.com/ant-design/ant-design/issues/2401)
  - 修复多选模式下进行搜索会把已选项清掉的问题。[#2393](https://github.com/ant-design/ant-design/issues/2393)
  - 修复 TreeSelect 会修改原数据的问题。[#2459](https://github.com/ant-design/ant-design/issues/2459)
- 修复了 Select 组件 placeholder 溢出的问题。[#2480](https://github.com/ant-design/ant-design/pull/2480)
- 修复 Timeline.Item 无法自定义边框颜色的问题。[#2479](https://github.com/ant-design/ant-design/issues/2479)
- 修复 Spin 显示突兀的问题。[#2398](https://github.com/ant-design/ant-design/issues/2398)
- 修复 Cascader 选项文字过长导致的样式问题。[#2515](https://github.com/ant-design/ant-design/issues/2515)

## 1.6.5

`2016-07-16`

- 修复 Input 的 `value prop on input should not be null` 警告并且导致在表单中无法重置的问题。[#2335](https://github.com/ant-design/ant-design/issues/2335)
- 优化 FormItem 的布局实现，修复表单布局不支持响应式布局的问题。[#2305](https://github.com/ant-design/ant-design/issues/2305)
- 修复带时间的 DatePicker 的 onChange 触发逻辑。[#2399](https://github.com/ant-design/ant-design/issues/2399#issuecomment-232893146)
- 修复 Transfer 搜索后全选的问题。[#2396](https://github.com/ant-design/ant-design/issues/2396)
- 修复 Cascader 样式会被 ant-input 样式覆盖的问题。[#2400](https://github.com/ant-design/ant-design/issues/2400)
- 修复 Table 删除数据时导致当前页数溢出的问题。[#2301](https://github.com/ant-design/ant-design/pull/2301)
- 修复 resize 浏览器时 Affix 元素没有和原来的位置同步的问题。[#1987](https://github.com/ant-design/ant-design/issues/1987)
- 给 Affix 元素添加占位，修复固定时页面跳动的问题。
- 修复 Select combobox 模式会导致页面出现横向滚动条的问题。[#2353](https://github.com/ant-design/ant-design/issues/2353)
- 修复 Upload 组件已上传文件链接点击无效的问题。[#2331](https://github.com/ant-design/ant-design/issues/2331)
- 修复 Upload 上传过程中删除图片后的报错问题。[#2342](https://github.com/ant-design/ant-design/issues/2342)

## 1.6.4

`2016-07-08`

- 修复组件在 react@15.2.0 下报 Unknown props 警告的问题。[#2258](https://github.com/ant-design/ant-design/issues/2258)
- `Table`
     - 修复 filterDropDown 中内容未改变也会调用 onChange 的问题。[#2228](https://github.com/ant-design/ant-design/issues/2228)
     - 修复设置 scroll.y 高度后导致内容无法对齐的问题。[#2227](https://github.com/ant-design/ant-design/issues/2227)
- `Form`
     - 修复 `FormItem` 中带空格后缀的冒号替换问题，关联issue：[#1877](https://github.com/ant-design/ant-design/issues/1877)
     -  demo 优化。
- `Transfer`
     - 修复重复 render 的问题，性能优化。[#2112](https://github.com/ant-design/ant-design/issues/2112)
     - 优化搜索逻辑，修复搜索时未对特殊字符进行处理的问题。[#2260](https://github.com/ant-design/ant-design/issues/2260)
     - 清除按钮样式优化。
- 修复 `Steps` 最后一步多余横线隐藏的问题。
- 修复 `Cascader` small size 样式下沉 1px，以及 hover/click 样式残缺的问题。[#2234](https://github.com/ant-design/ant-design/issues/2234)
- 修复 `RangePicker` 无清除按钮的问题。[#2252](https://github.com/ant-design/ant-design/issues/2252)

## 1.6.3

`2016-07-04`

- 修复 Transfer 的一个 unmount 的错误。[#2206](https://github.com/ant-design/ant-design/pull/2206)
- 修复了 Badge、Alert、Menu、Tag、Checkbox、Radio 组件的一些样式细节问题。

## 1.6.2

`2016-06-27`

- 修复 Table、Transfer 的样式错位问题。
- 修复 DatePicker 的一个样式问题。[#2182](https://github.com/ant-design/ant-design/issues/2182)
- 优化 Menu 的 hover 样式响应性能。

## 1.6.1

`2016-06-24`

- 回滚一个未完成的 DatePicker 时间选项改造效果。

## 1.6.0

`2016-06-24`

- 新增置顶组件 [BackTop](/components/back-top)。
- 全新的 [Spin](/components/spin) 样式。
- 给 `Modal.xxx` 系列方法添加了 `{ destory }` 的访问值，方便事后销毁。[#2110](https://github.com/ant-design/ant-design/issues/2110)
- Table 的 `rowKey` 属性支持直接使用字符串。[#2058](https://github.com/ant-design/ant-design/issues/2058)
- Table 增加 `column.filterDropdown` 属性用于自定义渲染筛选菜单的浮层。[#1736](https://github.com/ant-design/ant-design/issues/1736)
- 修复 Tooltip、Popover、Popconfirm 设置 `onVisibleChange` 后失效的问题。[#2134](https://github.com/ant-design/ant-design/issues/2134)
- 修复在 IE8 下 Checkbox 的勾样式变形的问题。[#2148](https://github.com/ant-design/ant-design/issues/2148)
- 优化 Checkbox、Radio 失效状态的文字颜色。[#2114](https://github.com/ant-design/ant-design/issues/2114)
- 优化 Checkbox、Radio 的默认边距过于拥挤的问题。[#2137](https://github.com/ant-design/ant-design/issues/2137)
- 优化 Pagination 在暗色背景下的样式。[#2126](https://github.com/ant-design/ant-design/issues/2126)
- 修复 Table 固定列时内容无法换行和高度对齐的问题，同时修复了一个 Chrome 下的表格内容错位问题。[#2130](https://github.com/ant-design/ant-design/issues/2130)
- 修复一个 Table 的 `rowSelection` 设为 null 时可能导致报错的问题。[#2127](https://github.com/ant-design/ant-design/issues/2127)
- 修复在 IE8 下点击 Table 选择框报错的问题。[#2154](https://github.com/ant-design/ant-design/issues/2154)
- 小幅优化了 Transfer 的渲染性能。[#2112](https://github.com/ant-design/ant-design/issues/2112)
- 将 DatePicker 的清除按钮从面板上移到外部输入框，解决用户容易误解为关闭的问题。[#1708](https://github.com/ant-design/ant-design/issues/1708)
- Upload 的 `onPreview` 现在没有 `file.url` 时也能生效。[#2163](https://github.com/ant-design/ant-design/issues/2163)

## 1.5.1

`2016-06-21`

- 修复一个 TypeScript 定义文件的语法错误。
- 修复 Table 固定表头高度和滚动条样式问题。

## 1.5.0

`2016-06-17`

- 升级 `rc-form` 到 0.17，支持 `getFieldProps('xx.yy')` 的写法，并支持单多选控件进行关联。[#](https://github.com/react-component/form/pull/21)
- Input 的 `addonBefore` 和 `addonAfter` 支持内嵌选择框。[#1927](https://github.com/ant-design/ant-design/issues/1927)
- 优化了两个 DatePicker 组成的时间范围选择演示的体验。
- 优化一个多个对话框的遮罩层高度的问题。[#2009](https://github.com/ant-design/ant-design/issues/2009)
- 优化 Table 的 `getCheckboxProps` 的调用次数。[#2086](https://github.com/ant-design/ant-design/issues/2086)
- 修复 Table 固定列时，表头无法左右滚动的问题。[#2068](https://github.com/ant-design/ant-design/issues/2068)
- 修复小型表格固定表头的样式。[#2023](https://github.com/ant-design/ant-design/issues/2023)
- 修复 Tabs 的 `tabPosition` 为左右时样式错位的问题。[#2046](https://github.com/ant-design/ant-design/issues/2046)
- 修复 RangePicker 的日期范围背景丢失的问题。
- 修复 Switch 失效状态下文字颜色太浅的问题。[#2051](https://github.com/ant-design/ant-design/issues/2051)
- 修复一个 Select 的 `disabled` 选项依然可以被移除的问题。[#2034](https://github.com/ant-design/ant-design/issues/2034)
- 修复官方站点在 IE 下的报错问题。

## 1.4.1

`2016-06-12`

- 修复一个展开 Tabs 会导致表格宽度溢出的问题。[#2013](https://github.com/ant-design/ant-design/issues/2013)
- 修复一个某些情况下表格布局被破坏的问题。

## 1.4.0

`2016-06-12`

此版本之后你可能会遇到 [#2030](https://github.com/ant-design/ant-design/issues/2030)，请使用 `react@15+` 或 `npm@3+`。

- `Input[type="textarea"]` 支持自动调整高度。 [#](http://ant.design/components/input#components-input-demo-autosize-textarea)
- `Breadcrumb`
  - `nameRender` 新增 `route` 和 `params` 参数。 [#1999](https://github.com/ant-design/ant-design/issues/1999)
  - `linkRender` 新增 `paths` 参数。
- 再次修复 `Table` 组件 `rowSelection.onChange` 与 `onRowClick` 冲突问题。 [#1470](https://github.com/ant-design/ant-design/issues/1470)
- 修复 `Form.Item` 中 `Input` 高度抖动问题。 [#1955](https://github.com/ant-design/ant-design/issues/1955)
- 修复高级搜索的 `ant-advanced-search-form` 样式丢失的问题。

## 1.3.2

`2016-06-06`

- 修复全局模式下引用 antd，IE8 环境报错的问题。 [#1970](https://github.com/ant-design/ant-design/issues/1970)

## 1.3.1

`2016-06-06`

- 修复 `Message` `Notification` 找不到的问题。 [#1968](https://github.com/ant-design/ant-design/issues/1968)

## 1.3.0

`2016-06-02`

- Transfer 组件增加 `rowKey` 属性，可自定义数据源主键。 [#1900](https://github.com/ant-design/ant-design/issues/1900)
- Tag 组件 `default` 类型的样式增加边框，防止淹没在背景中。 [#1910](https://github.com/ant-design/ant-design/issues/1910)
- Table
  - 修复筛选为单选时仍旧展示多选框的问题。 [#1880](https://github.com/ant-design/ant-design/issues/1880)
  - 修复 fixed left 的固定列会覆盖 rowSelection 的 Checkbox 的问题。 [#1829](https://github.com/ant-design/ant-design/issues/1829)
  - 升级 rc-table 依赖
    - 修复了 fixed 列中数据重复展示以及一些错位问题。 [#1898](https://github.com/ant-design/ant-design/issues/1898)
    - `dataIndex` 支持内嵌属性的写法。 [react-component/table#46](https://github.com/react-component/table/issues/46)
- 修复了 v1.2.0 新增加的组件属性的 TypeScript 定义。 [#1933](https://github.com/ant-design/ant-design/issues/1933)
- Form 修复 label中冒号的国际化问题，采用样式实现冒号，不再需要手动输入冒号。 [#1877](https://github.com/ant-design/ant-design/issues/1877)
- 修复 DatePicker 组件点击『此刻』失效的问题，并进行了一些代码优化。 [#1902](https://github.com/ant-design/ant-design/issues/1902)
- 升级 rc-upload 依赖，修复了 IE10 中第二次上传同一文件不触发 `onChange` 的问题。 [058af3c](https://github.com/ant-design/ant-design/commit/b15a4e3165be5e4db995d3fe75d4d557c7f21c61)
- 文档使用 [bisheng](https://github.com/benjycui/bisheng) 重构。

## 1.2.1

`2016-05-27`

- 修复一个 Select 组件的文字重复问题。

## 1.2.0

`2016-05-26`

- Input 组件的文档现在和 Form 分离。 [3c98d3](https://github.com/ant-design/ant-design/commit/3c98d3f80f4ec80066756adc3b4108141d4383ca)
- Affix
  - 新增了 `onChange` 属性。当固定状态改变时回调 [#1777](https://github.com/ant-design/ant-design/issues/1777)
  - 找回了从 affixStyle 中走失的 `width` 属性，修复固定后错位的问题。[#1820](https://github.com/ant-design/ant-design/issues/1820)
- Table
  - 修复了 Table 组件的分页相关的一系列问题 [#1669](https://github.com/ant-design/ant-design/issues/1669) [#1842](https://github.com/ant-design/ant-design/issues/1842)
  - 修复了当有列固定在左边时，选择框不显示的问题 [#1829](https://github.com/ant-design/ant-design/issues/1829)
- 修复了当 Checkbox 的 label 为数字 0 时， label 不显示的问题 [#1811](https://github.com/ant-design/ant-design/issues/1811)
- 修复 Select combobox 模式下无法重置 `optionLabelProp` 的问题。[#1773](https://github.com/ant-design/ant-design/issues/1773)
- 修复了 Tag 组件为 closeable 时，内部链接无法点击的问题 [#1862](https://github.com/ant-design/ant-design/issues/1862)
- Tab 组件新增 `hideAdd` 属性，用于关闭右边的添加按钮 [#1750](https://github.com/ant-design/ant-design/issues/1750)
- 修复了一个在某些情况下找不到 `normalize.css/normalize.css` 文件的问题。[ant-design/antd-init#52](https://github.com/ant-design/antd-init/issues/52)
- 修复构建文件在 IE8 下报错的问题。[#1804](https://github.com/ant-design/ant-design/issues/1804)
- 更新了第三方依赖。

## 1.1.0

`2016-05-18`

- Cascader 的选择框支持自定义渲染节点，并给 `displayRender` 方法增加了 `selectedOptions` 参数。[#1726](https://github.com/ant-design/ant-design/issues/1726)
- Input.Group 新增 `size` 属性，可设置控件尺寸。[#1732](https://github.com/ant-design/ant-design/issues/1732)
- Layout 新增常用布局：侧边导航展开收起模式。[#1643](https://github.com/ant-design/ant-design/issues/1643)
- Transfer 支持自定义渲染行数据。[#1664](https://github.com/ant-design/ant-design/issues/1664)
- Upload 的 children 为空时，不再显示上传按钮。[#1610](https://github.com/ant-design/ant-design/issues/1610)
- Table
  - 修复 `filter` 过滤数据后显示错误分页的问题。[#1669](https://github.com/ant-design/ant-design/issues/1669)
  - 修复 `pagination` 不指定时显示错误分页的问题。[#1683](https://github.com/ant-design/ant-design/issues/1683)
- Modal
  - 修复弹出时背景依然跟随滚动的问题。[#1751](https://github.com/ant-design/ant-design/issues/1751)
  - 修复关闭按钮获得焦点时的样式问题。[#1668](https://github.com/ant-design/ant-design/issues/1668)
- 将搜索输入框相关样式移到 Input 组件下。[7b7f846](https://github.com/ant-design/ant-design/commit/7b7f8461611e53f4f96ae8d64d37fe28ee8d2553)
- 修复 Select 获得焦点时的样式问题。[#1684](https://github.com/ant-design/ant-design/issues/1684)
- 修复 TreeSelect 占位符样式问题。[#1657](https://github.com/ant-design/ant-design/issues/1657)
- 修复了类型定义以更好地支持 `TypeScript`。[#1696](https://github.com/ant-design/ant-design/pull/1696) [@xujihui1985](https://github.com/xujihui1985)
- 优化了 LocaleProvider。[a3850a4](https://github.com/ant-design/ant-design/commit/a3850a4df84d7055a1a40600919f2f9ba1bbf2b2)
- 其他组件的样式优化。

## 1.0.1

`2016-05-11`

- 修复当 Table 的 `rowSelection.type` 为 'radio' 时的报错。[#1627](https://github.com/ant-design/ant-design/issues/1627)
- 修复 CheckboxGroup 与 `getFieldProps`共用时的问题。[#1631](https://github.com/ant-design/ant-design/issues/1631)
- 修复 RangePicker 中 TimePicker 不会受 locale 控制的问题。[#1635](https://github.com/ant-design/ant-design/issues/1635)
- 修复 Tag 组件缺失的问题。
- 修复 Table 的 className 不在最外层容器上的问题。
- 修复一个样式文件重复打包的问题。

## 1.0.0

`2016-05-09`

很高兴的通知各位，经过四个月时间的紧密开发，`antd@1.0.0` 终于发布了。从去年 5 月 7 日提交第一行代码以来，经过整整一年的开发迭代，antd 受到社区的大量关注，使用的公司和产品持续增加，已经日趋成熟。这个版本我们重构了底层代码和站点，持续完善现有组件功能和优化细节，其中很多都来自社区的贡献，无法一一感谢，欢迎各位持续关注和鞭策。在升级过程中遇到任何问题，请及时反馈给我们。

### 主要变化

- **兼容 React@15.x**。
- **全新单页站点**，使用 React 和 antd 进行了彻底重构，加载更快，访问更流畅。
- **样式支持按需加载**。可参考 [antd-init](https://github.com/ant-design/antd-init) 的模版代码, 需要配合 [babel-plugin-antd](https://github.com/ant-design/babel-plugin-antd#usage) 插件和 `style` 配置进行使用。[#900](https://github.com/ant-design/ant-design/issues/900)
- **提供独立的构建文件**。[文档](/docs/react/install#浏览器引入)
- 新增卡片组件 [Card](/components/card)。
- 新增评分组件 [Rate](/components/rate)。
- 新增 [LocaleProvider](/components/locale-provider) 组件，提供组件文案的国际化支持，并新增了英语和俄语的语言配置。[#1411](https://github.com/ant-design/ant-design/issues/1411)
- 更好的服务端渲染支持，修复了 Badge、Spin、Calendar、Upload 等组件服务端渲染的问题。
- 新增 antd.d.ts 以更好的支持 TypeScript。[@bang88](https://github.com/bang88)
- 布局组件支持响应式布局和栅格间隔设置。[#1082](https://github.com/ant-design/ant-design/issues/1082)
- Table 支持固定列和横向滚动。[#1265](https://github.com/ant-design/ant-design/issues/1265)

### 不兼容改动

此版本有部分不兼容的改动，升级时确保修改相应的使用代码。

- 推荐使用样式按需加载。如果依然需要整体载入样式，**样式入口文件已变为** `antd/dist/antd.css` 和 `antd/dist/antd.less`。如果你在项目中覆盖了 less 变量，less 文件的引用方式也有 [相应变更](https://github.com/ant-design/ant-design/issues/1558#issuecomment-218120000)。

   ```diff
   - import 'antd/lib/index.css';  // import 'antd/style/index.less';
   + import 'antd/dist/antd.css';  // import 'antd/dist/antd.less';
   ```

- 完全移除了 `0.12` 中废弃的 Validation 组件，可以直接 import [rc-form-validation](https://github.com/react-component/form-validation) 用以代替。[#1096](https://github.com/ant-design/ant-design/issues/1096)
- Breadcrumb.Item 的 `href` 属性被移除，请直接用 `a` 标签包裹可点击的内容。
- Modal 移除了 `align` 属性，现在可以使用 `style` 属性调整位置。
- `Modal.confirm` 等方法的配置项 `iconClassName` 重命名为 `iconType`。
- Select 移除了 `onChange` 中的 `label` 参数，新增了 `labelInValue` 属性。[#1695](https://github.com/ant-design/ant-design/issues/1695)
- 移除了 `import { Form } from 'antd/lib/form';` 的用法，应统一为 `import { Form } from 'antd';` 或 `import Form from 'antd/lib/form';`。

#### 有兼容提示的改动

这里的改动在升级后控制台会出现警告提示，请按提示进行修改。

- 废弃 QueueAnim，可以直接 import [rc-queue-anim](https://github.com/react-component/queue-anim) 用以代替。Ant Design 的动效方案已移至 [Ant Motion](http://motion.ant.design/components/queue-anim)，欢迎前往探索。
- Affix 的 `offset` 属性重命名为 `offsetTop`。
- Popover 的 `overlay` 属性重命名为 `content`。
- Progress.Line 使用方式改为 `<Progress />` 或 `<Progress type="line" />`。
- Progress.Circle 使用方式改为 `<Progress type="circle" />`。
- Spin 的 `spining` 属性更正为 `spinning`。
- Alert 的 type `warn` 重命名为 `warning`。[#1225](https://github.com/ant-design/ant-design/issues/1225)
- Tree 的 `onExpand` 参数从 `function(node, expanded, expandedKeys)` 调整为 `function(expandedKeys, {expanded, node})`。

### Bug 修复

- 修复 Table 的 `size` 为 `middle` 时，分页器大小无法控制的问题。[#1396](https://github.com/ant-design/ant-design/issues/1396)
- 修复 Table 的 `pagination.defaultCurrent` 失效的问题。
- 修复 Cascader 的 `defaultValue` 没有被 `value` 覆盖的问题。
- 修复 Select 同时设置 `allowClear` `disabled` 时还是会出现清除按钮的问题。[#1480](https://github.com/ant-design/ant-design/issues/1480)
- 修复 Transfer 的 `DataSource` 变化时已选中项没有同步的问题。[#1587](https://github.com/ant-design/ant-design/issues/1587)
- 修复 DatePicker 日期格式与国际化配置不同步的问题。[#1509](https://github.com/ant-design/ant-design/issues/1509)
- 修复 Button 禁用时事件仍然会冒泡的问题。[#1541](https://github.com/ant-design/ant-design/issues/1541)
- 修复 Carousel 自动播放时的卡顿和报错问题。[#1397](https://github.com/ant-design/ant-design/issues/1397)
- 修复 Tabs 的 card 类型内嵌标准 Tabs 时的样式问题。[#1617](https://github.com/ant-design/ant-design/issues/1617)
- 修复 Menu `horizontal` 和 `vertical` 模式不支持受控 `openKeys` 的问题。

### 其他改进

- 样式变量梳理，去除了部分无用的变量，另外还有大量样式细节问题修复。
- 依赖的 normalize.css 升级到 [4.x](https://github.com/necolas/normalize.css/blob/4.1.1/CHANGELOG.md)。
- 使用 ES2016 classes 重构了代码。[@waywardmonkeys](https://github.com/waywardmonkeys)
- Popover、Popconfirm 和 Tooltip 组件根据不同的弹出位置有了更精准方向的弹出动画。
- 补充 Select TreeSelect Switch Radio Checkbox 等组件的 `focus` 表现，增强表单组件的可用性。[#1358](https://github.com/ant-design/ant-design/issues/1358)
- message 和 notification 现在可以全局配置 `duration`。[#1143](https://github.com/ant-design/ant-design/issues/1143)
- DatePicker 和 TimePicker 的 `onChange(date, dateString)` 方法增加第二个参数用于获得格式化后的日期字符串。[#1104](https://github.com/ant-design/ant-design/issues/1104)
- DatePicker 和 DatePicker.RangePicker 现在可以设置内部 TimePikcer 的属性。[#1415](https://github.com/ant-design/ant-design/issues/1415)
- Checkbox
  - 支持类似 Radio 的使用方式 `<Checkbox>option</Checkbox>`。[#1029](https://github.com/ant-design/ant-design/issues/1029)
  - Checkbox.Group 现在允许 `label` 和 `value` 不同。[#1025](https://github.com/ant-design/ant-design/issues/1025)
  - Checkbox.Group 允许单独设置某个 Checkbox 为 `disabled`。[#1218](https://github.com/ant-design/ant-design/issues/1218)
- Breadcrumb
  - 支持路由模式下自定义链接 `linkRender`。[#1026](https://github.com/ant-design/ant-design/issues/1026)
  - 支持路由模式下自定义最后一项内容 `nameRender`。[#1304](https://github.com/ant-design/ant-design/issues/1304)
- Modal
  - 新增 `Modal.warning` 方法。
  - 弹出时背景不再跟随滚动。[#1195](https://github.com/ant-design/ant-design/issues/1195)
- Select
  - 搜索框和单选选择框合并，以优化视觉和交互效果。
  - 优化多选框的选中效果。
- Spin
  - 增加延时展示以优化体验。[#1273](https://github.com/ant-design/ant-design/issues/1273)
  - 增加 `tip` 属性用于定义加载文案。[#1046](https://github.com/ant-design/ant-design/issues/1046)
- Steps
  - 重构布局方式，以支持更灵活的自适应布局和优化了性能，并移除了 `maxDescriptionWidth` 属性。[#1099](https://github.com/ant-design/ant-design/issues/1099)
  - 新增 `status` 属性以指定当前步骤状态，同时支持错误步骤的展示。[#1098](https://github.com/ant-design/ant-design/issues/1098)
- Timeline
  - 新增 `dot` 属性，可自定义时间轴点。
  - 现在可以设置 `className` 和 `style` 的问题。
  - `color` 属性现在支持自定义色值。
- Tree
  - 当子节点被选中时，自动展开父节点。
  - 新增 `checkStrictly` 属性，支持父子节点选中关系脱离。
- Upload
  - 在上传文件列表中的文件被删除时，将触发 `onRemove` 事件。[#1240](https://github.com/ant-design/ant-design/issues/1240)
  - 增加 `onPreview` 支持文件的自定义预览方式。[#1240](https://github.com/ant-design/ant-design/issues/1240)
  - `data` 属性支持设为一个函数，用于动态修改上传参数。[react-component/upload#32](https://github.com/react-component/upload/pull/32)
- Slider `marks` 现在支持 JSX 并可以单独设置某个标记的样式。
- Tag 的 `onClose` 可以使用 `e.preventDefault()` 阻止默认事件。[#1267](https://github.com/ant-design/ant-design/issues/1267)
- Form.Item 在有多个 child 时也可以自动生成错误信息与校验状态，但一个 Form.Item 内仍然只能有一个表单控件。[#1287](https://github.com/ant-design/ant-design/issues/1287)
- Input 新增 `onPressEnter` 属性监听回车事件。
- Table 现在可以通过 `filteredValue` `sortOrder` 控制筛选和排序的状态。[#971](https://github.com/ant-design/ant-design/issues/971)
- Button 增加了 `icon` 属性。[#1199](https://github.com/ant-design/ant-design/issues/1199)
- SubMenu 增加 `onTitleClick` 属性。
- Affix 增加 `offsetBottm` 属性，支持固定在底部。[#1000](https://github.com/ant-design/ant-design/issues/1000)

### 相关工具发布

- [antd-init](http://github.com/ant-design/antd-init) 同步发布 `1.0.0` 版本，享受最新 [ant-tool](https://github.com/ant-tool/) 工具带来的流畅开发体验。
- [Ant Motion](http://motion.ant.design) 全新的动效设计解决方案。
- [Ant UX](http://ux.ant.design/) 发布 1.0 版本，提供多种平台的流程素材支持。

## 0.12.17

去 [GitHub](https://github.com/ant-design/ant-design/releases?after=1.0.0) 查看 `0.12.x` 及之前的更新日志。
