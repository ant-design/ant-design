---
order: 6
title: 更新日志
toc: false
timeline: true
---

`antd` 严格遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

#### 发布周期

* 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
* 次版本号：每月发布一个带有新特性的向下兼容的版本。
* 主版本号：含有破坏性更新和新特性，不在发布周期内。

---

## 3.1.1

`2018-01-08`

- 📖 发布了全新的官网和设计文档。
- 📖 更新了项目实战文档到 [roadhog 2.0](https://github.com/sorrycc/blog/issues/55)。[5dcf1c0](https://github.com/ant-design/ant-design/commit/5dcf1c015fc2674adb09434bf766549d6f3f0022)
- 📖 发布了 Ant Design 3.0 的 sketch 模板包。[22dfe88](https://github.com/ant-design/ant-design/commit/22dfe88ab043c1e116382fc96b7d78cabf125054)
- 🐞 修复 Dropdown 组件的 TypeScript 类型定义中 trigger 属性缺少 contextMenu 事件的问题。[#8646](https://github.com/ant-design/ant-design/issues/8646) [@cjahv](https://github.com/cjahv)
- 🐞 修复 Button 内使用 HOC 组件时两个中文字符间未添加空格的问题。
- 🐞 修复 List 组件在 IE 11 下的样式兼容问题。[#8784](https://github.com/ant-design/ant-design/issues/8784)
- 🐞 修复 Select 组件 notFoundContent 属性不生效的问题。[#8809](https://github.com/ant-design/ant-design/issues/8809)
- 🐞 修复 BackTop 组件在 React 16 下 target 属性出现警告的问题。[#8848](https://github.com/ant-design/ant-design/issues/8848)
- 🐞 修复当设置 gutter 后 List 组件出现横向滚动条的问题。[#8799](https://github.com/ant-design/ant-design/issues/8799)
- 🐞 修复 Anchor.Link 的 href 属性不支持完整链接的问题。[#8808](https://github.com/ant-design/ant-design/issues/8808)
- 🌟 优化中文引号的字体。[c6fcc31](https://github.com/ant-design/ant-design/commit/c6fcc3121758dfe6ac5b50c1b55790eb42b805c5)

## 3.1.0

`2017-12-29`

新年快乐！~ 2018年了，00后都成年了！少年赶紧提个 PR 给我们吧！~

- 🐞 修复组件 Spin 可能出现跳动的问题。[#8602](https://github.com/ant-design/ant-design/issues/8602) [@jhsu](https://github.com/jhsu)
- 🐞 修复 Table 在设置 `size=small` 的情况下出现多余 padding 的问题。[#8724](https://github.com/ant-design/ant-design/issues/8724)
- 🐞 修复 Checkbox.Group 在 Form 中和 label 的对齐问题。[#8739](https://github.com/ant-design/ant-design/issues/8739)
- 🐞 修复 Affix 组件出现滚动条的问题。[#8606](https://github.com/ant-design/ant-design/issues/8606)
- 🐞 修复组件 List "No Data" 和加载动画重叠的问题. [#8647](https://github.com/ant-design/ant-design/issues/8647)
- 🌟 为 Input 添加 onKeyUp。[#8705](https://github.com/ant-design/ant-design/issues/8705) [@delesseps](https://github.com/delesseps)
- 🌟 折叠面板 Collapse 添加 `showArrow` 来支持隐藏箭头。[#8536](https://github.com/ant-design/ant-design/pull/8536) [@apieceofbart](https://github.com/apieceofbart)
- 🌟 评分 Rate 组件添加 `allowClear`，支持再次点击后重置。[#8627](https://github.com/ant-design/ant-design/issues/8627)
- 🌟 优化 BackTop 组件的响应式效果。[#8719](https://github.com/ant-design/ant-design/issues/8719) [@JetRunner](https://github.com/JetRunner)
- 🌟 Modal 组件添加 `destroyOnClose` 支持关闭时销毁 Modal 里的子元素。[#8769](https://github.com/ant-design/ant-design/pull/8769) [@Rohanhacker](https://github.com/Rohanhacker)
- 🌟 组件 Pagination 添加 `hideOnSinglePage` 支持当只有一页时隐藏组件。[#8615](https://github.com/ant-design/ant-design/pull/8615) [@camsong](https://github.com/camsong)
- 🌟 支持 List 组件自定义加载动画。
- 👻 你现在可以通过 CodeSandbox 来打开官方文档中的示例了。

## 3.0.3

`2017-12-22`

- 🐞 Form.create 返回值增加 `React.SFC` 类型的支持。[#8672](https://github.com/ant-design/ant-design/issues/8672)
- 🐞 修复 Form 控件高度和对齐的问题。[#8701](https://github.com/ant-design/ant-design/issues/8701)
- 🐞 修复前后置标签与 Input 高度不一致的问题。[#8680](https://github.com/ant-design/ant-design/issues/8680)
- 🐞 修复 Table 固定列时左右未对齐的问题。[#8660](https://github.com/ant-design/ant-design/issues/8660)

## 3.0.2

`2017-12-17`

- 📝 提供了 3.0 迁移工具。[e71b68dd](https://github.com/ant-design/ant-design/commit/e71b68dd1d2ff91200fea6dd9d56e6aa5653edbc)
- 📝 重写了 [开源贡献指南](https://github.com/ant-design/ant-design/blob/master/.github/CONTRIBUTING.zh-CN.md)
- 🌟 优化 notification 在小屏幕下的显示效果。[#8631](https://github.com/ant-design/ant-design/issues/8631)
- 🌟 优化了 Pagination 的样式和并修复了对齐和边距问题。
- 🐞 升级 react-slick 到 `0.16.0`，修复 peerDependencies 安装警告。[#8455](https://github.com/ant-design/ant-design/issues/8455)
- 🐞 修复固定列头的表格大小设置无效的问题。[#8577](https://github.com/ant-design/ant-design/issues/8577)
- 🐞 修复 DatePicker 等时间组件的 `locale` 属性失效的问题。[#8635](https://github.com/ant-design/ant-design/issues/8635)
- 🐞 修复 Popover 的箭头偏移和大小无法覆盖的问题。[#8548](https://github.com/ant-design/ant-design/issues/8548) [#8549](https://github.com/ant-design/ant-design/issues/8549)
- 🐞 修复 AutoComponent 的 `notFoundContent` 设置无效的问题。[#8553](https://github.com/ant-design/ant-design/issues/8553)
- 🐞 微调 RangePicker 的垂直对齐问题。
- 🐞 Layout.Sider 的响应式断点和栅格系统保持一致。[#8620](https://github.com/ant-design/ant-design/issues/8620)
- 🐞 修复一个 collapsedWidth 为 0 时，收缩后子菜单依然会显示的问题。[#8587](https://github.com/ant-design/ant-design/issues/8587)
- 🐞 修复 Card 的 `Meta.title` 文本无法自动截断的问题。[#8597](https://github.com/ant-design/ant-design/issues/8597)
- 🐞 修复带边框的 List 下的分页样式边距。[#8562](https://github.com/ant-design/ant-design/issues/8562)
- 🐞 修复一个 Menu 指定了不存在的 defaultOpenKeys 时子菜单无法展开的问题。[#8475](https://github.com/ant-design/ant-design/issues/8475)
- 🐞 修复 Input、AutoComplete、Transfer 的 `InputProps` 和 `SearchProps` TypeScript 类型命名冲突。[#8478](https://github.com/ant-design/ant-design/issues/8478)

## 3.0.1

`2017-12-11`

* 移除 Card 无用 DOM wrapper，以和 2.x 保持一致。
* 修复 `antd/lib/style/v2-compatible-reset.css` 缺失问题。[28d13e2](https://github.com/ant-design/ant-design/commit/28d13e2539817f87b8a2029ea22d9c30b377167f)
* 修复 Affix 比浏览器可见区域还高时被截断的问题。[31a0654](https://github.com/ant-design/ant-design/commit/31a0654ef990eb7bae2b18095fa0d5230b9be1da)
* 修复 Collapse 展开动画。[edd592c](https://github.com/ant-design/ant-design/commit/edd592cb9dd79d534853e7a0c1b648382e3f1a12)
* 修复 Form 内大尺寸 Input、Button 的对齐问题。[#8459](https://github.com/ant-design/ant-design/issues/8459)
* Menu
  * 修复弹层在 Safari 下消失的问题。[#8453](https://github.com/ant-design/ant-design/issues/8453)
  * 修复展开动画。[edd592c](https://github.com/ant-design/ant-design/commit/edd592cb9dd79d534853e7a0c1b648382e3f1a12)
* 修复 Notification 样式编译错误。[#8437](https://github.com/ant-design/ant-design/issues/8437)
* 修复迷你 Pagination 的背景色问题。[e13c6d8](https://github.com/ant-design/ant-design/commit/e13c6d87fa6bf7d5cf4b2d5154a85b4793997de5)
* Table
  * 修复在移动端样式错乱的问题。[#8465](https://github.com/ant-design/ant-design/issues/8465)
  * 修复嵌套表格与 size 属性共用时的样式问题。[#8525](https://github.com/ant-design/ant-design/issues/8525)
* TypeScript
  * 修复 AutoComplete 的 TypeScript 定义。[#8383](https://github.com/ant-design/ant-design/pull/8383) [@nidhi-ag](https://github.com/nidhi-ag)
  * 修复 Divider 的 TypeScript 定义。[#8504](https://github.com/ant-design/ant-design/pull/8504) [@cyyyu](https://github.com/cyyyu)
  * 修复 Dropdown 的 TypeScript 定义。[#8444](https://github.com/ant-design/ant-design/issues/8444)
  * 修复 List 的 TypeScript 定义。[e27061e](https://github.com/ant-design/ant-design/commit/e27061ea5b2f2d3273b45862d9b87285448f0998) [1b2a955](https://github.com/ant-design/ant-design/commit/1b2a9550d9595dd2f31f79d1bdd52695ec792692)
  * 修复 Table 的 TypeScript 定义。[#8507](https://github.com/ant-design/ant-design/issues/8507) [#8515](https://github.com/ant-design/ant-design/pull/8515) [@danedavid](https://github.com/danedavid)

## 3.0.0

`2017-12-04`

更多内容见 [Ant Design 3.0 发布公告](https://medium.com/ant-design/announcing-ant-design-3-0-70e3e65eca0c)！

### 主要变化

- 全新的[色彩系统](https://ant.design/docs/spec/colors-cn#Color-Palettes)，组件主色由 『`#108EE9`』 改为 『`#1890FF`』，新主色我们称之为『拂晓蓝』。
- 全新的视觉样式和组件尺寸，更现代更美观。
- 基础字体大小由 `12px` 增大到 `14px`。
- 默认语言由中文改为英文。
- 全面支持 React 16。
- 更友好的 TypeScript 支持。
- 新的 [List](https://ant.design/components/list-cn/) 组件。
- 新的 [Divider](https://ant.design/components/divider-cn/) 组件。
- 新增 30 个[图标](https://ant.design/components/icon-cn/)。

### 不兼容改动

此版本有部分不兼容的改动，升级时确保修改相应的使用代码。另外由于人肉查找代码中的废弃用法过于低效，所以我们提供了 [antd-migration-helper](https://github.com/ant-design/antd-migration-helper) 用于扫描代码中的废弃用法。

- Card 的 `noHovering` 属性重命名为 `hoverable`，且默认值改为 `true`。
- 调整了 Grid 的响应式断点值。详见 [#7230](https://github.com/ant-design/ant-design/pull/7230)
- Form `getFieldDecorator` 的 `exclusive` 参数被移除，此类场景应该由 Radio.Group、Checkbox.Group 之类的组件来完成。
- 新增 `Form.createFormField` 方法，`mapPropsToFields` 返回的字段都需要由该方法创建。

  ```diff
  import { Form } from 'antd';

  Form.create({
    mapPropsToFields() {
      return {
  -     name: { value: 'antd' },
  +     name: Form.createFormField({ value: 'antd' }),
      };
    },
  })
  ```

- 优化了全局的重置样式，如果升级后你的全局样式有问题，可以引入我们提供的 2.x 兼容样式。

  ```javascript
  import 'antd/lib/style/v2-compatible-reset';
  ```

  或者在 less 里引入

  ```less
  @import '~antd/lib/style/v2-compatible-reset.less';
  ```

- 由于默认语言改为英文，如果你需要显示中文，现在需要配置 `LocalProvider`。

  ```javascript
  import { LocaleProvider } from 'antd';
  import zhCN from 'antd/lib/locale-provider/zh_CN';

  ReactDOM.render(
    <LocaleProvider locale={zhCN}><YourApp /></LocaleProvider>,
    document.getElementById('root')
  );
  ```

- Form 下的表单控件不再默认为 `size="large"`。
- `Input.Search` 默认的 🔍 图标只作为装饰，不再响应用户交互。需要添加可交互按钮请使用 `enterButton`。
- UMD 版本的  `dist/antd.js` 不再包含 moment，使用的时候需要自己引入 moment。
  ```diff
  <html>
    <head>
  +   <script src="https://unpkg.com/moment@2.19.3/moment.js"></script>
      <script src="https://unpkg.com/antd@3.0.0/dist/antd.js"></script>
    </head>
  </html>
  ```

### 以下在 2.x 中废弃的特性被移除

- 🗑 移除了 DatePicker.Calendar， 请直接使用 Calendar 组件。
- 🗑 移除了 DatePicker 的 `toggleOpen` 属性， 请使用 `onOpenChange` 代替。
- 🗑 移除了 Form 的 `inline`、`horizontal`、`vertical` 属性，请使用 `layout` 代替。
- 🗑 移除了 Select 的 `multiple`、`tags`、`combobox` 属性，请使用 `mode` 代替。
- 🗑 移除了 Input 对 `type='textarea'` 的支持，请直接使用 `Input.TextArea` 组件。
- 🗑 移除了 Mention 的 `toEditorState` 方法，请使用 `toContentState` 代替。

### 新增功能及改进

- 🌟 Tabs 新增 `size="large"`。
- 🌟 Row 的 `gutter` 属性新增响应式断点的支持，可以使用诸如 `gutter={{ sm: 16, lg: 32 }}` 的设置。
- 🌟 Spin 新增 `indicator` 属性，用于设置自定义的加载指示符。 [#7977](https://github.com/ant-design/ant-design/pull/7977) [@kossel](https://github.com/ant-design/ant-design/pull/7977)
- 🌟 Input.Search 新增 `enterButton` 用于设置自定义的搜索图标。[#7596](https://github.com/ant-design/ant-design/issues/7596)
- 🌟 Mention 新增 `placement`, 用于设置下拉框的弹出方向。
- 🌟 Carousel 新增 `next()`、`prev()`、`goTo(slideNumber)` 方法，用于控制面板展示。
- 🌟 Button 新增链接支持，当提供 `href` 时会自动渲染为 `<a>`。[#8343](https://github.com/ant-design/ant-design/pull/8343)
- 🌟 Steps 进行了重构，首次渲染的时候不会再闪烁。 [#6010](https://github.com/ant-design/ant-design/issues/6010)
- 🌟 Switch 新增 `loading` 属性，用于表现加载中的状态。
- Menu
  - 🌟 我们使用了 [rc-trigger](https://github.com/react-component/trigger) 重构了菜单以支持延迟加载和窗口边缘浮层自适应方向。
  - 🌟 新增 `subMenuOpenDelay` 和 `subMenuCloseDelay`，用于设置子菜单打开和关闭的延迟。
  - 🌟 新增 `forceSubMenuRender`，用于强制渲染子菜单。[#5586](https://github.com/ant-design/ant-design/issues/5586)
- Form
  - 🌟 新增显示验证信息时的动画效果。
  - 🌟 新增按条件渲染表单项的支持。[#react-component/117](https://github.com/react-component/form/issues/117)
- Message
  - 🌟 `duration` 允许可选 [#7857](https://github.com/ant-design/ant-design/issues/7857) [@monkindey](https://github.com/monkindey)
- Badge
  - 🌟 新增 `offset` 属性，用于设置状态点的位置偏移。
  - 🌟 `status` 允许与 `children` 同时使用。[#8164](https://github.com/ant-design/ant-design/issues/8164)
- Card
  - 🌟 新增 `inner` 类型。[例子](https://ant.design/components/card-cn/#components-card-demo-inner)。
  - 🌟 新增 `cover`、`actions` 以及 `Meta` 子组件。[例子](https://ant.design/components/card-cn/#components-card-demo-meta)。
- DatePicker
  - 🌟 新增 `mode` 和 `onPanelChange`，用户控制面板的展示模式。[例子](https://ant.design/components/date-picker-cn/#components-date-picker-demo-mode)。
  - 🌟 新增 `WeekPicker` 子组件。[例子](https://ant.design/components/date-picker-cn/#components-date-picker-demo-basic)
  - 🌟 新增 `dateRender` 属性，用于自定义日期单元格的渲染。
- TimePicker
  - 🌟 新增 `hourStep`、`minuteStep`、`secondStep`，用于设置时间步长。[例子](https://ant.design/components/time-picker-cn/#components-time-picker-demo-interval-options)
  - 🌟 新增 `focusOnOpen`，用于设置在打开面板的时候是否聚焦输入框。
- Table
  - 🌟 新增 `components` 属性，用于覆盖表格元素的默认标签。
    ```javascript
    // 支持覆盖的元素
    const components = {
      table: MyTable,
      header: {
        wrapper: HeaderWrapper,
        row: HeaderRow,
        cell: HeaderCell,
      },
      body: {
        wrapper: BodyWrapper,
        row: BodyRow,
        cell: BodyCell,
      },
    };

    <Table components={components} columns={columns} data={data} />
    ```
  - 🌟 新增 `onRow` 属性，用于设置表格列的属性。
  - 🌟 新增 `onHeaderRow`，用户设置表格头部列的属性。
  - 🌟 新增 `column[onCell]`，用户设置单元格的属性。
  - 🌟 新增 `column[onHeaderCell]`，用于设置头部单元格的属性。
  - 🌟 新增 `column[align]`，用于设置列内文字的对其方向。
  - 🌟 新增 `column[defaultSortOrder]`，用于设置列的默认排序。[#8111](https://github.com/ant-design/ant-design/pull/8111) [@megawac](https://github.com/megawac)
  - 🌟 新增 `rowSelection[fixed]`，用于固定选择列。
  - 🙅 废弃 `getBodyWrapper`，请使用 `components` 属性代替。
  - 🙅 废弃以下属性 `onRowClick`，`onRowDoubleClick`、`onRowContextMenu`、`onRowMouseEnter`、`onRowMouseLeave`，请使用 `onRow` 代替。
    ```javascript
    <Table onRow={(record) => ({
      onClick: () => {},
      onDoubleClick: () => {},
      onContextMenu: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
    })} />
    ```
- Select
  - 🌟 默认和多选模式下 Option 的值允许使用 number。
  - 🌟 新增 `maxTagCount 和 `maxTagPlaceholder`，用与设置最多可显示的选中项。
  - 🌟 新增 `showAction`，用于设置出发下拉框打开的事件。
  - 🌟 新增 `onMouseEnter` 和 `onMouseLeave` 事件回调。
- LocaleProvider
  - 🇮🇸 新增冰岛语。[#7561](https://github.com/ant-design/ant-design/pull/7561) [@paunovic-stefan](https://github.com/paunovic-stefan)
  - 🇪🇬 新增埃及语。[#7888](https://github.com/ant-design/ant-design/pull/7888) [@mohamed-seada-1994](https://github.com/mohamed-seada-1994)
  - 🇺🇦 新增乌克兰语。[#8169](https://github.com/ant-design/ant-design/pull/8169) [@anxolerd](https://github.com/anxolerd)

### Bug 修复

- Form
  - 🐞 修复输入框的图标会被验证图标覆盖的问题。
  - 🐞 修复使用大尺寸输入框时，验证图标不居中的问题。
- 🐞 修复 Menu 按键时的报错。[#8089](https://github.com/ant-design/ant-design/issues/8089)

### 其他

- 在 TypeScript 中使用时不再需要设置 `allowSyntheticDefaultImports`。
- 从 `peerDependencies` 中移除了 `react@0.14` 和 `react@15`，虽然目前 antd 3.0.0 依然可以在旧版本的 React 上使用，但是我们在未来有可能使用 React 16 的新特性，所以强烈建议升级到 React 16，见[升级文档](https://reactjs.org/blog/2017/09/26/react-v16.0.html)。
- 全面支持 ES Module ，antd 及其依赖的底层 react-component 组件全部提供了 ES Module 的构建版本，如果你使用 webpack 3，可以把 `babel-plugin-import` 的 `libraryDirectory` 设置为 `es`，以获得 Tree Shaking 的优化效果。
- 最后，我们会继续维护 2.x 的分支到明年 6 月份。

## 2.x

去 [GitHub](https://github.com/ant-design/ant-design/blob/2.x-stable/CHANGELOG.zh-CN.md) 查看 `2.x` 的 Change Log。

## 1.11.4

去 [GitHub](https://github.com/ant-design/ant-design/blob/1.x-stable/CHANGELOG.md) 查看 `0.x` 到 `1.x` 的 Change Log。
