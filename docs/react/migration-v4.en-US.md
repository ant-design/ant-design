---
order: 8
title: V3 to V4
---

This document will help you upgrade from antd `3.x` version to antd `4.x` version. If you are using `2.x` or older version, please refer to the previous [upgrade document](https://github.com/ant-design/ant-design/blob/2adf8ced24da7b3cb46a3475854a83d76a98c536/CHANGELOG.en-US.md#300) to 3.x.

## Upgrade preparation

1. Please upgrade to the latest version of 3.x first, and remove / modify related APIs according to the console warning message.
2. Upgrade project React 16.12.0 or above.
   - If you are still using React 15, please refer to [React 16 Upgrade Documentation](https://reactjs.org/blog/2017/09/26/react-v16.0.html#breaking-changes).
   - For the remaining React 16 obsolete lifecycle APIs, please refer to [Migration Guide](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path).

## Incompatible changes in v4

### Design specification

- Line height changes from `1.5`(`21px`) to `1.5715`(`22px`).
- Basic rounded corner adjustment, changed from `4px` to `2px`.
- Exchanged Selected and Hovered color.
- Global shadow optimization, adjusted to three layers of shadows to distinguish control hierarchies.
- Icon in the bubble confirmation box has been changed from a question mark to an exclamation mark.
- The color of selected components is changed to `@blue-1: #E6F7FF`, and the corresponding hover color is changed to `@gray-2: #FAFAFA`.
- The color of the error was adjusted from `@red-5: #F5222D` to`@red-5: #FF4D4F`.
- The color brightness of the dividing line has been reduced from `#E8E8E8` to`#F0F0F0`.
- DatePicker interactive redo, range selection can now select start and end time separately.
- Table change default background color from transparent to white.
- Smaller Tabs bar width.
- New Tabs interaction and dom structure is changed in `4.3.0`.

### Compatibility

- The minimum supported version of IE is IE 11.
- The minimum supported version of React is React 16.9, and some components have started to refactor using hooks.
  - Internal using `useMemo` for performance, do not use mutable data as props.

#### Remove deprecated API

- LocaleProvider has been removed, please use `ConfigProvider` instead.
- Mention removed, use `Mentions` instead.
- Removed the `iconType` property of Alert. Please use `icon` instead.
- Removed the `iconType` attribute of Modal.xxx. Please use `icon` instead.
- Removed the Form.create method, `form` is now available in `Form.useForm`.
- Removed the `id` attribute of Form.Item. Please use `htmlFor` instead.
- The `setContentRef` property of Typography has been removed, please use `ref` instead.
- Removed the `allowEmpty` property of TimePicker, please use `allowClear` instead.
- Removed `AfterClose` attribute of Tag, please use `OnClose` instead.
- Removed the `noHovering` property of Card, please use `hoverable` instead.
- Removed the `vertical` property of Carousel. Please use `dotPosition` instead.
- Removed `wrapClassName` property of Drawer, please use `className` instead.
- Removed the `autosize` property of TextArea. Please use `autoSize` instead.
- Removed the `offset` attribute of Affix. Please use `offsetTop` instead.
- Removed the `onSearchChange` property of Transfer. Please use `onSearch` instead.
- Removed the `body` attribute of Transfer. Please use `children` instead.
- Removed the `lazy` attribute of Transfer, which did not really optimize the effect.
- Removed `combobox` mode, please use `AutoComplete` instead.
- Removed the `rowSelection.hideDefaultSelections` property of Table, please use `SELECTION_ALL` and `SELECTION_INVERT` in `rowSelection.selections` instead, [Custom Selection](/components/table/#components-table-demo-row-selection-custom).
- Deprecated Button.Group, please use `Space` instead.

#### Icon upgrade

In `antd @ 3.9.0`, we introduced the svg icon ([Why use the svg icon?](https://github.com/ant-design/ant-design/issues/10353)). The icon API using the string name cannot be loaded on demand, so the svg icon file is fully introduced, which greatly increases the size of the packaged product. In 4.0, we adjusted the icon usage API to support tree shaking, reducing the default package size of antd by about 150 KB (Gzipped).

Legacy Icon usage will be discarded:

```jsx
import { Icon, Button } from 'antd';

const Demo = () => (
  <div>
    <Icon type="smile" />
    <Button icon="smile" />
  </div>
);
```

It will be imported on demand in v4:

```diff
  import { Button } from 'antd';

  // tree-shaking supported
- import { Icon } from 'antd';
+ import { SmileOutlined } from '@ant-design/icons';

  const Demo = () => (
      <div>
-       <Icon type="smile" />
+       <SmileOutlined />
      <Button icon={<SmileOutlined />} />
    </div>
  );

  // or directly import
  import SmileOutlined from '@ant-design/icons/SmileOutlined';
```

You will still be able to continue using the compatibility pack:

```jsx
import { Button } from 'antd';
import { Icon } from '@ant-design/compatible';

const Demo = () => (
  <div>
    <Icon type="smile" />
    <Button icon="smile" />
  </div>
);
```

#### Component refactoring

- Form rewrite.
  - No need to use `Form.create`.
  - Nest fields definition changes from `'xxx.yyy'` to `['xxx', 'yyy']`.
  - See [here](/components/form/v3) for migration documentation.
- DatePicker rewrite
  - Provide the `picker` property for selector switching.
  - Range selection can now select start and end times individually.
  - `onPanelChange` will also trigger when panel value changed.
  - [Date cell className of Custom style demo](/components/date-picker/#components-date-picker-demo-date-render) changed from `ant-calendar-date` to `ant-picker-cell-inner`.
- Tree, Select, TreeSelect, AutoComplete rewrite
  - use virtual scrolling.
  - `onBlur` no longer trigger value change and return React origin `event` object instead.
  - AutoComplete no longer support `optionLabelProp`. Please set Option `value` directly.
  - Select remove `dropdownMenuStyle` prop.
  - Use `listHeight` to config popup height instead of `dropdownStyle`.
  - `filterOption` return origin data with second params instead. No need to use `option.props.children` for matching.
  - Tree, TreeSelect will display `label` when `title` and `label` are both set. The adjustment is for aligning behavior with `labelInValue`. [New behavior](https://codesandbox.io/s/keen-curran-d3qnp) (show 'label' on first node). [Old behavior](https://codesandbox.io/s/muddy-darkness-57lb3) (show 'title' on first node).
- The Grid component uses flex layout.
- Button's `danger` is now treated as a property instead of a button type.
- Input, Select set `value` to `undefined` is uncontrolled mode now.
- Table rewrite.
  - will keep at least one column even if `columns` is empty.
  - Nest `dataIndex` definition changes from `'xxx.yyy'` to `['xxx', 'yyy']`.
- Pagination will default set `showSizeChanger` to `true` since `4.1.0`. This change also applied on Table component.
- Tabs rewrite. ([4.3.0](https://github.com/ant-design/ant-design/pull/24552))
  - Dom structrue is changed, please check style if you override tabs css.
  - `onPrevClick` 和 `onNextClick` would be not working anymore since we improve tabs scroll behavior.

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

## Start upgrading

You can manually check the code one by one against the above list for modification. In addition, we also provide a codemod cli tool [@ant-design/codemod-v4](https://github.com/ant-design/codemod-v4) To help you quickly upgrade to v4.

Before running codemod cli, please submit your local code changes.

```shell
# Run directly through npx
npx -p @ant-design/codemod-v4 antd4-codemod src

# Or global installation
# Use npm
npm i -g @ant-design/codemod-v4
# Use yarn
yarn global add @ant-design/codemod-v4

# Execute
antd4-codemod src
```

<img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*QdcbQoLC-cQAAAAAAAAAAABkARQnAQ" alt="codemod running" width="720" />

For parts that cannot be modified automatically, codemod will prompt on the command line, and it is recommended to modify them manually as prompted. After modification, you can run the above command repeatedly to check.

<img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*KQwWSrPirlUAAAAAAAAAAABkARQnAQ" alt="contains an invalid icon" width="720" />

> Note that codemod cannot cover all scenarios, and it is recommended to check for incompatible changes one by one.

### Migration tool modification details

`@ant-design/codemod-v4` will help you migrate to antd v4. Obsolete components will be kept running through @ant-design/compatible. Generally, you don't need to migrate manually. The following sections detail the overall migration and changes.

#### Import the obsolete Form and Mention components via @ant-design/compatible package

```diff
- import { Form, Input, Button, Mention } from 'antd';
+ import { Form, Mention } from '@ant-design/compatible';
+ import '@ant-design/compatible/assets/index.css';
+ import { Input, Button } from 'antd';

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

> **Note:** Old Form imported from `@ ant-design / compatible` has change the class name from `.ant-form` to `.ant-legacy-form`. Need to be modified accordingly if override the style.

#### Replace component's string icon prop with the new `@ant-design/icons`

```diff
  import { Avatar, Button, Result } from 'antd';
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

#### Replace v3 Icon with `@ant-design/icons`

```diff
- import { Icon, Input } from 'antd';
+ import { Input } from 'antd';
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

#### Replace v3 LocaleProvider with v4 ConfigProvider

```diff
- import { LocaleProvider } from 'antd';
+ import { ConfigProvider } from 'antd';

  ReactDOM.render(
-   <LocaleProvider {...yourConfig}>
+   <ConfigProvider {...yourConfig}>
      <Main />
-   </LocaleProvider>
+   </ConfigProvider>
    mountNode,
  );
```

#### Replace `Modal.method()` icon string with `@ant-design/icons`

```diff
  import { Modal } from 'antd';
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

## Encounter problems

v4 made a lot of detailed improvements and refactoring. We collected all known incompatible changes and related impacts as much as possible, but there may be some scenarios we have not considered. If you encounter problems during the upgrade, please go to [GitHub issues](http://new-issue.ant.design/) and [codemod Issues](https://github.com/ant-design/codemod-v4/issues) for feedback. We will respond and improve this document as soon as possible.
