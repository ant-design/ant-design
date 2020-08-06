---
order: 8
title: 从 v3 到 v4
---

本文档将帮助你从 antd `3.x` 版本升级到 antd `4.x` 版本，如果你是 `2.x` 或者更老的版本，请先参考之前的[升级文档](https://github.com/ant-design/ant-design/blob/2adf8ced24da7b3cb46a3475854a83d76a98c536/CHANGELOG.zh-CN.md#300)升级到 3.x。

## 升级准备

1. 请先升级到 3.x 的最新版本，按照控制台 warning 信息移除/修改相关的 API。
2. 升级项目 React 16.12.0 以上。
   - 如果你仍在使用 React 15，请参考 [React 16 升级文档](https://reactjs.org/blog/2017/09/26/react-v16.0.html#breaking-changes)。
   - 其余 React 16 废弃生命周期 API 请参考 [迁移导引](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)。

## 4.0 有哪些不兼容的变化

### 设计规范调整

- 行高从 `1.5`(`21px`) 调整为 `1.5715`(`22px`)。
- 基础圆角调整，由`4px` 改为 `2px`。
- Selected 颜色和 Hovered 颜色进行了交换。
- 全局阴影优化，调整为三层阴影区分控件层次关系。
- 气泡确认框中图标的使用改变，由问号改为感叹号。
- 部分组件选中颜色统一改为 `@blue-1: #E6F7FF`，对应 `hover` 颜色改为 `@gray-2: #FAFAFA`。
- 报错色色值调整，由 `@red-5: #F5222D` 改为 `@red-5: #FF4D4F`。
- 分割线颜色明度降低，由 `#E8E8E8` 改为 `#F0F0F0`。
- DatePicker 交互重做，面板和输入框分离，范围选择现可单独选择开始和结束时间。
- Table 默认背景颜色从透明修改为白色。
- Tabs 火柴棍样式缩短为和文字等长。
- Tabs 交互重做，DOM 结构改变。`4.3.0`

### 兼容性调整

- IE 最低支持版本为 IE 11。
- React 最低支持版本为 React 16.9，部分组件开始使用 hooks 进行重构。
  - 重构通过 `useMemo` 进行性能优化，请勿使用 mutable data 作为参数。

#### 移除废弃的 API

- 移除了 LocaleProvider，请使用 `ConfigProvider` 替代。
- 移除了 Mention，请使用 `Mentions` 替代。
- 移除了 Alert 的 `iconType` 属性，请使用 `icon` 替代。
- 移除了 Modal.xxx 的 `iconType` 属性，请使用 `icon` 替代。
- 移除了 Form.create 方法，`form` 现可由 `Form.useForm` 获取。
- 移除了 Form.Item 的 `id` 属性，请使用 `htmlFor` 替代。
- 移除了 Typography 的 `setContentRef` 属性，请使用 `ref` 替代。
- 移除了 TimePicker 的 `allowEmpty` 属性，请使用 `allowClear` 替代。
- 移除了 Tag 的 `afterClose` 属性，请使用 `onClose` 替代。
- 移除了 Card 的 `noHovering` 属性，请使用 `hoverable` 替代。
- 移除了 Carousel 的 `vertical` 属性，请使用 `dotPosition` 替代。
- 移除了 Drawer 的 `wrapClassName` 属性，请使用 `className` 替代。
- 移除了 TextArea 的 `autosize` 属性，请使用 `autoSize` 替代。
- 移除了 Affix 的 `offset` 属性，请使用 `offsetTop` 替代。
- 移除了 Transfer 的 `onSearchChange` 属性，请使用 `onSearch` 替代。
- 移除了 Transfer 的 `body` 属性，请使用 `children` 替代。
- 移除了 Transfer 的 `lazy` 属性，它并没有起到真正的优化效果。
- 移除了 Select 的 `combobox` 模式，请使用 `AutoComplete` 替代。
- 移除了 Table 的 `rowSelection.hideDefaultSelections` 属性，请在 `rowSelection.selections` 中使用 `SELECTION_ALL` 和 `SELECTION_INVERT` 替代，[自定义选择项](/components/table/#components-table-demo-row-selection-custom)。

#### 图标升级

在 `antd@3.9.0` 中，我们引入了 svg 图标（[为何使用 svg 图标？](https://github.com/ant-design/ant-design/issues/10353)）。使用了字符串命名的图标 API 无法做到按需加载，因而全量引入了 svg 图标文件，这大大增加了打包产物的尺寸。在 4.0 中，我们调整了图标的使用 API 从而支持 tree shaking，减少 antd 默认包体积约 150 KB(Gzipped)。

旧版 Icon 使用方式将被废弃：

```jsx
import { Icon, Button } from '@allenai/varnish';

const Demo = () => (
  <div>
    <Icon type="smile" />
    <Button icon="smile" />
  </div>
);
```

4.0 中会采用按需引入的方式：

```diff
  import { Button } from '@allenai/varnish';

  // tree-shaking supported
- import { Icon } from '@allenai/varnish';
+ import { SmileOutlined } from '@ant-design/icons';

  const Demo = () => (
    <div>
-     <Icon type="smile" />
+     <SmileOutlined />
      <Button icon={<SmileOutlined />} />
    </div>
  );

  // or directly import
  import SmileOutlined from '@ant-design/icons/SmileOutlined';
```

你将仍然可以通过兼容包继续使用：

```jsx
import { Button } from '@allenai/varnish';
import { Icon } from '@ant-design/compatible';

const Demo = () => (
  <div>
    <Icon type="smile" />
    <Button icon="smile" />
  </div>
);
```

#### 组件重构

- Form 重写
  - 不再需要 `Form.create`。
  - 嵌套字段支持从 `'xxx.yyy'` 改成 `['xxx', 'yyy']`。
  - 迁移文档请查看[此处](/components/form/v3)。
- DatePicker 重写
  - 提供 `picker` 属性用于选择器切换。
  - 范围选择现在可以单独选择开始和结束时间。
  - `onPanelChange` 在面板值变化时也会触发。
  - [自定义单元格样式](/components/date-picker-cn/#components-date-picker-demo-date-render)的类名从 `ant-calendar-date` 改为 `ant-picker-cell-inner`。
- Tree、Select、TreeSelect、AutoComplete 重新写
  - 使用虚拟滚动。
  - `onBlur` 时不再修改选中值，且返回 React 原生的 `event` 对象。
  - AutoComplete 不再支持 `optionLabelProp`，请直接设置 Option `value` 属性。
  - Select 移除 `dropdownMenuStyle` 属性。
  - 如果你需要设置弹窗高度请使用 `listHeight` 来代替 `dropdownStyle` 的高度样式。
  - `filterOption` 第二个参数直接返回原数据，不在需要通过 `option.props.children` 来进行匹配。
- Grid 组件使用 flex 布局。
- Button 的 `danger` 现在作为一个属性而不是按钮类型。
- Input、Select 的 `value` 为 `undefined` 时改为非受控状态。
- Table 重写
  - 在没有 `columns` 时仍然会保留一列。
  - 嵌套 `dataIndex` 支持从 `'xxx.yyy'` 改成 `['xxx', 'yyy']`。
- Pagination 自 `4.1.0` 起大于 50 条数据默认会展示 `pageSize` 切换器，这条规则同样会运用于 Table 上。
- Tabs 重写（[4.3.0](https://github.com/ant-design/ant-design/pull/24552)）
  - Dom 结构变化，如有覆盖样式需要仔细检查。
  - 横向滚动交互变化，`onPrevClick` 和 `onNextClick` 不再工作。

```diff
<Table
  columns={[
    {
      title: 'Age',
-     dataIndex: 'user.age',
+     dataIndex: ['user', 'age'],
    },
  ]}
/>
```

## 开始升级

你可以手动对照上面的列表逐条检查代码进行修改，另外，我们也提供了一个 codemod cli 工具 [@ant-design/codemod-v4](https://github.com/ant-design/codemod-v4) 以帮助你快速升级到 v4 版本。

在运行 codemod cli 前，请先提交你的本地代码修改。

```shell
# 通过 npx 直接运行
npx -p @ant-design/codemod-v4 antd4-codemod src

# 或者全局安装
# 使用 npm
npm i -g @ant-design/codemod-v4
# 或者使用 yarn
yarn global add @ant-design/codemod-v4

# 运行
antd4-codemod src
```

<img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*QdcbQoLC-cQAAAAAAAAAAABkARQnAQ" alt="codemod running" width="720" />

对于无法自动修改的部分，codemod 会在命令行进行提示，建议按提示手动修改。修改后可以反复运行上述命令进行检查。

<img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*KQwWSrPirlUAAAAAAAAAAABkARQnAQ" alt="contains an invalid icon" width="720" />

> 注意 codemod 不能涵盖所有场景，建议还是要按不兼容的变化逐条排查。

### 迁移工具修改详情

`@ant-design/codemod-v4` 会帮你迁移到 antd v4, 废弃的组件则通过 `@ant-design/compatible` 保持运行, 一般来说你无需手动迁移。下方内容详细介绍了整体的迁移和变化，你也可以参照变动手动修改。

#### 将已废弃的 `Form` 和 `Mention` 组件通过 `@ant-design/compatible` 包引入

```diff
- import { Form, Input, Button, Mention } from '@allenai/varnish';
+ import { Form, Mention } from '@ant-design/compatible';
+ import '@ant-design/compatible/assets/index.css';
+ import { Input, Button } from '@allenai/varnish';

  ReactDOM.render( (
    <div>
      <Form>
        {getFieldDecorator('username')(<Input />)}
        <Button>Submit</Button>
      </Form>
      <Mention
        style={{ width: '100%' }}
        onChange={onChange}
        defaultValue={toContentState('@afc163')}
        defaultSuggestions={['afc163', 'benjycui']}
        onSelect={onSelect}
      />
    </div>
  );
```

> **注意：**从 `@ant-design/compatible` 引入的老版本 Form 组件，样式类名会从 `.ant-form` 变成 `.ant-legacy-form`，如果你对其进行了样式覆盖，也需要相应修改。

#### 用新的 `@ant-design/icons` 替换字符串类型的 `icon` 属性值

```diff
  import { Avatar, Button, Result } from '@allenai/varnish';
+ import { QuestionOutlined, UserOutlined } from '@ant-design/icons';

  ReactDOM.render(
    <div>
-     <Button type="primary" shape="circle" icon="search" />
+     <Button type="primary" shape="circle" icon={SearchOutlined} />
-     <Avatar shape="square" icon="user" />
+     <Avatar shape="square" icon={UserOutlined} />
      <Result
-       icon="question"
+       icon={<QuestionOutlined />}
        title="Great, we have done all the operations!"
        extra={<Button type="primary">Next</Button>}
      />
    </div>,
    mountNode,
  );

```

#### 将 v3 Icon 组件转换成 `@ant-design/icons` 中引入

```diff
- import { Icon, Input } from '@allenai/varnish';
+ import { Input } from '@allenai/varnish';
+ import Icon, { CodeFilled, SmileOutlined, SmileTwoTone } from '@ant-design/icons';

  const HeartSvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
      <path d="M923 plapla..." />
    </svg>
  );

  const HeartIcon = props => <Icon component={HeartSvg} {...props} />;

  ReactDOM.render(
    <div>
-     <Icon type="code" theme="filled" />
+     <CodeFilled />
-     <Icon type="smile" theme="twoTone" twoToneColor="#eb2f96" />
+     <SmileTwoTone twoToneColor="#eb2f96" />
-     <Icon type="code" theme={props.fill ? 'filled' : 'outlined'} />
+     <LegacyIcon type="code" theme={props.fill ? 'filled' : 'outlined'} />
      <HeartIcon />
      <Icon viewBox="0 0 24 24">
        <title>Cool Home</title>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </Icon>
      <Input suffix={<SmileOutlined />} />
    </div>,
    mountNode,
  );

```

#### 将 v3 LocaleProvider 组件转换成 v4 ConfigProvider 组件

```diff
- import { LocaleProvider } from '@allenai/varnish';
+ import { ConfigProvider } from '@allenai/varnish';

  ReactDOM.render(
-   <LocaleProvider {...yourConfig}>
+   <ConfigProvider {...yourConfig}>
      <Main />
-   </LocaleProvider>
+   </ConfigProvider>
    mountNode,
  );
```

#### 将 `Modal.method()` 中字符串 icon 属性的调用转换成从 `@ant-design/icons` 中引入

```diff
  import { Modal } from '@allenai/varnish';
+ import { AntDesignOutlined } from '@ant-design/icons';

  Modal.confirm({
-  icon: 'ant-design',
+  icon: <AntDesignOutlined />,
   title: 'Do you Want to delete these items?',
   content: 'Some descriptions',
   onOk() {
     console.log('OK');
   },
   onCancel() {
     console.log('Cancel');
   },
 });
```

## 遇到问题

v4 做了非常多的细节改进和重构，我们尽可能收集了已知的所有不兼容变化和相关影响，但是有可能还是有一些场景我们没有考虑到。如果你在升级过程中遇到了问题，请到 [GitHub issues](http://new-issue.ant.design/) 和 [codemod Issues](https://github.com/ant-design/codemod-v4/issues) 进行反馈。我们会尽快响应和相应改进这篇文档。
