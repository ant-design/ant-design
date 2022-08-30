---
order: 8
title: 从 v4 到 v5
---

本文档将帮助你从 antd `4.x` 版本升级到 antd `5.x` 版本，如果你是 `3.x` 或者更老的版本，请先参考之前的[升级文档](/docs/react/migration-v4-cn)升级到 4.x。

## 升级准备

1. 请先升级到 4.x 的最新版本，按照控制台 warning 信息移除/修改相关的 API。

## 5.0 有哪些不兼容的变化

### 设计规范调整

- 基础圆角调整，由统一的 `2px` 改为四级圆角，分别为 `2px` `4px` `6px` `8px`，分别应用于不同场景，比如默认尺寸的 Button 的圆角调整为了 `6px`。
- 主色调整，由 <div style="display: inline-block; width: 16px; height: 16px; border-radius: 4px; background: #1890ff; vertical-align: text-bottom;" /> `#1890ff` 改为 <div style="display: inline-block; width: 16px; height: 16px; border-radius: 4px; background: #1677ff; vertical-align: text-bottom;" /> `#1677ff`。
- 整体阴影调整，由原本的三级阴影调整为两级，分别对应

### 兼容性调整

- 不再支持 IE 浏览器

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
- 废弃 Button.Group，请使用 `Space` 代替。

#### 组件重构与废弃

- PageHeader 和 Comment 组件在 ant-design 中废弃，移至 pro-components 中维护，如果仍需使用可以从兼容包中引入。

## 开始升级

#### 安装兼容包

安装 `@ant-design/compatible` 通过指定 `v5-compatible-v4` tag 确认为 v5 兼容 v4 版本：

```bash
npm install --save @ant-design/compatible@v5-compatible-v4
```

#### 将已废弃的 `Form` 和 `Mention` 组件通过 `@ant-design/compatible` 包引入

```diff
- import { Form, Input, Button, Mention } from 'antd';
+ import { Form, Mention } from '@ant-design/compatible';
+ import '@ant-design/compatible/assets/index.css';
+ import { Input, Button } from 'antd';

  ReactDOM.render(
    <>
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
    </>
  );
```

> **注意：**从 `@ant-design/compatible` 引入的老版本 Form 组件，样式类名会从 `.ant-form` 变成 `.ant-legacy-form`，如果你对其进行了样式覆盖，也需要相应修改。

#### 用新的 `@ant-design/icons` 替换字符串类型的 `icon` 属性值

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

#### 将 v3 Icon 组件转换成 `@ant-design/icons` 中引入

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

#### 将 v3 LocaleProvider 组件转换成 v4 ConfigProvider 组件

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

#### 将 `Modal.method()` 中字符串 icon 属性的调用转换成从 `@ant-design/icons` 中引入

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

## 遇到问题

v4 做了非常多的细节改进和重构，我们尽可能收集了已知的所有不兼容变化和相关影响，但是有可能还是有一些场景我们没有考虑到。如果你在升级过程中遇到了问题，请到 [GitHub issues](http://new-issue.ant.design/) 和 [codemod Issues](https://github.com/ant-design/codemod-v4/issues) 进行反馈。我们会尽快响应和相应改进这篇文档。
