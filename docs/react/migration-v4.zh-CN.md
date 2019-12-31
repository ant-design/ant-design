---
order: 7
title: 从 v3 到 v4
---

本文档将帮助你从 antd `3.x` 版本升级到 antd `4.x` 版本，如果你是 `2.x` 或者更老的版本，请先参考之前的[升级文档](链接)升级到 3.x。

## 升级准备

1. 请先升级到 3.x 的最新版本，按照控制台 warning 信息移除/修改相关的 API。
2. 升级项目 React 16.12.0 以上。
   - 如果你仍在使用 React 15，请参考[React 16 升级文档](https://reactjs.org/blog/2017/09/26/react-v16.0.html#breaking-changes)
   - 其余 React 16 废弃生命周期 API 请参考 [迁移导引](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

## 4.0 有哪些不兼容的变化

- 组件样式上的变化（主要是设计改动...blah blah）

### 兼容性调整

- IE 最低支持版本为 IE 11
- React 最低支持版本为 React 16.9

- 移除了 2.x/3.x 里已废弃的哪些功能
- 图标的改动
- 哪些组件重构了等等
- 其他组件的 break change...

（这里详细列出所有的 break change 和修改方式，方便用户逐条排查）

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
yarn add -g @ant-design/codemod-v4

# 运行
antd4-codemod src
```

（此处要补一些截图）

对于无法自动修改的部分，codemod 会在命令行进行提示，建议按提示手动修改。修改后可以反复运行上述命令进行检查。

（此处要补一些截图）

> 注意 codemod 不能涵盖所有场景，建议还是要按不兼容的变化逐条排查。

### 迁移工具修改详情

`@ant-design/codemod-v4` 会帮你迁移到 antd v4, 废弃的 API 和组件则通过 `@ant-design/compatible` 保持运行, 一般来说你无需手动迁移。下方内容详细介绍了整体的迁移和变化。

#### 将已废弃的 `Form` 和 `Mention` 组件通过 `@ant-design/compatible` 包引入

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

#### 用新的 `@ant-design/icons` 替换组件的字符串 icon prop

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

v4 做了非常多的细节改进和重构，我们尽可能收集了已知的所有不兼容变化和相关影响，但是有可能还是有一些场景我们没有考虑到。如果你在升级过程中遇到了问题，请到 [GitHub issues](链接) 和 [codemod Issues](链接) 进行反馈。我们会尽快响应和相应改进这篇文档。
