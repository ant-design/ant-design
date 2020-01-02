---
order: 8
title: V3 to V4
---

We provide a codemod cli tool [@ant-design/codemod-v4](https://github.com/ant-design/codemod-v4) to help you quickly upgrade to antd v4.

## Usage

Before running the codemod cli, please submit your local code changes.

```shell
# run directly with npx
npx -p @ant-design/codemod-v4 antd4-codemod src

# or global installation
# use npm
npm i -g @ant-design/codemod-v4
# or use yarn
yarn add -g @ant-design/codemod-v4

# run
antd4-codemod src
```

## TL;DR

`@ant-design/codemod-v4` will help you migrate to antd v4, `@ant-design/compatible` is the workaround for the deprecated APIs and components, so you don't need to do it yourself in general. The blew content is the migration detail.

#### Replace deprecated `Form` and `Mention` from `@ant-design/compatible`

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

#### Replace components string icon prop with new `@ant-design/icons`

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

#### Replace v3 Icon with the new `@ant-design/icons`

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

#### Replace v3 LocaleProvider with v4 ConfigProvider component

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

#### Replace `Modal.method()` string icon property with the new `@ant-design/icons`

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
