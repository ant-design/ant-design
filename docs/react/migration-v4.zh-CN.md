---
order: 8
title: 从 v3 到 v4
---

我们提供了一个 codemod cli 工具 [@ant-design/codemod-v4](https://github.com/ant-design/codemod-v4) 以帮助你快速升级到 v4 版本。

## 使用

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

## 写在前面

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
