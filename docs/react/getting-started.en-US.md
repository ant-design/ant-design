---
order: 1
title: Getting Started
---

Ant Design React is dedicated to providing a **good development experience** for programmers and make sure that you had installed [Node.js](https://nodejs.org/)(> v4.x) correctly.

---

Before delving into Ant Design React, a good knowledge of [React](http://facebook.github.io/react/) and [JavaScript ES2015](http://babeljs.io/docs/learn-es2015/) is needed.

## First Example

The following CodePen demo is the simplest usage case, and it's also a good habit to fork this demo to provide a re-producible demo while reporting a bug. Please don't use this demo as a scaffold in production.

- [antd CodePen](http://codepen.io/anon/pen/wGOWGW?editors=001)

## Standard Development Flow

During development, you may need to compile and debug JSX and ES2015 code, and even proxy some of the request to mocked data or some external services. And all of these to be done with a quick feedback provided through hot reloading of changes.

Such features, together with packaging the production version are covered in this work flow.

### 1. Installation

[antd-init](https://github.com/ant-design/antd-init/) is a demo only scaffold tool. If you want to create real world projects, [dva-cli](https://github.com/dvajs/dva-cli) is our recommendation.

```bash
$ npm install antd-init -g
```

Read [the documentation of `antd-init`](https://github.com/ant-design/antd-init/) and [the documentation of `ant-tool`](http://ant-tool.github.io/) to explore more features.

> Also, you can use scaffold/demo which is provided by community:
>
>   - [antd-admin](https://github.com/zuiidea/antd-admin)
>   - [reactSPA](https://github.com/JasonBai007/reactSPA)
>   - [react-redux-antd by Justin-lu](https://github.com/Justin-lu/react-redux-antd)
>   - [react-redux-antd by okoala](https://github.com/okoala/react-redux-antd)
>   - [react-antd-admin](https://github.com/fireyy/react-antd-admin)
>   - [react-antd-redux-router-starter](https://github.com/yuzhouisme/react-antd-redux-router-starter)
>   - [react-redux-antd-starter](https://github.com/BetaRabbit/react-redux-antd-starter)
>   - more scaffolds at [Scaffold Market](http://scaffold.ant.design/)

### 2. Create a New Project

A new project can be created using CLI tools.

```bash
$ mkdir antd-demo && cd antd-demo
$ antd-init
```

`antd-init` will run `npm install` after a project is created. If it fails, you can run `npm install` by yourself.

### 3. Use antd's Components

By default, besides the scaffolding needed to start the development, a fully working Todo application is created.
You may study this example later. For now, just follow this guide in order to get some experience working with the result of `antd-init`.

Replace the content of `index.js` with the following code.
As you can see, there is no difference between antd's components and usual React components.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message } from 'antd';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }
  handleChange(date) {
    message.info('Selected Date: ' + date.toString());
    this.setState({ date });
  }
  render() {
    return (
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={value => this.handleChange(value)} />
        <div style={{ marginTop: 20 }}>Date: {this.state.date.toString()}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

> All the components in antd are listed in the sidebar.

### 4. Development & Debugging

Run your project and visit http://127.0.0.1:8000

```bash
$ npm start
```

### 5. Building & Deployment

```bash
$ npm run build
```

Entry files will be built and generated in `dist` directory, then we can deploy it to different environments.

> This guide is designed to help you to understand how to use antd, so it may not be similar to what you do in the real world.
> But you can use those tools in your project, depending on your context and needs.

## Compatibility

Ant Design React supports all the modern browsers and IE9+.

You need to provide [es5-shim](https://github.com/es-shims/es5-shim) and [es6-shim](https://github.com/paulmillr/es6-shim) and other polyfills for IE browsers. If you are using babel, we strongly recommend to use [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) and [babel-plugin-transform-runtime](https://babeljs.io/docs/plugins/transform-runtime/).

> If you run into problem about [startsWith ](https://github.com/ant-design/ant-design/issues/3400#issuecomment-253181445), you should import  [es6-shim](https://github.com/paulmillr/es6-shim) or [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) as workaround.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <!-- import stylesheet -->
    <link rel="stylesheet" href="/index.css">
    <!-- Polyfills -->
    <!--[if lt IE 10]>
    <script src="https://as.alipayobjects.com/g/component/??console-polyfill/0.2.2/index.js,es5-shim/4.5.7/es5-shim.min.js,es5-shim/4.5.7/es5-sham.min.js,es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js,html5shiv/3.7.2/html5shiv.min.js,media-match/2.0.2/media.match.min.js"></script>
    <![endif]-->
    <!--[if lte IE 11]>
    <script src="https://as.alipayobjects.com/g/component/??es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js"></script>
    <![endif]-->
  </head>
  <body>
  </body>
  <!-- import common dependencies -->
  <script src="/common.js"></script>
  <!-- import entry file -->
  <script src="/index.js"></script>
</html>
```

#### IE8 note

> We don't support IE8 after `antd@2.0`.

You may encounter problems like [#28](https://github.com/ant-tool/atool-build/issues/28) and [#858](https://github.com/ant-design/ant-design/issues/858), since `babel@6.x` doesn't support IE8. You can refer to this [webpack config](https://github.com/ant-design/antd-init/blob/f5fb9479ca973fade51fd6754e50f8b3fafbb1df/boilerplate/webpack.config.js#L4-L8).

> More about how to use React in IE8: https://github.com/xcatliu/react-ie8

## Customized Work Flow

If you want to customize your work flow, we recommend to use [webpack](http://webpack.github.io/) to build and debug code.

Also, you can use any [scaffold](https://github.com/enaqx/awesome-react#boilerplates) available in React ecosystem. If you encounter problems, you can use our [webpack config](https://github.com/ant-tool/atool-build/blob/master/src/getWebpackCommonConfig.js) and [modify it](http://ant-tool.github.io/webpack-config.html).

There are some [scaffolds](https://github.com/ant-design/ant-design/issues/129) which have already integrated antd, so you can try and start with one of these, and even contribute.

## Import on Demand

If you see logs like below screenshot, you might import all components by writing `import { Button } from 'antd';`, this will affect your app's network perfermance.

```
You are using a whole package of antd, please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.
```

> ![](https://zos.alipayobjects.com/rmsportal/GHIRszVcmjccgZRakJDQ.png)

However, we can import individual components on demand:

```jsx
import Button from 'antd/lib/button';
import 'antd/lib/button/style'; // or antd/lib/button/style/css for css format file
```

We strongly recommend to use [babel-plugin-import](https://github.com/ant-design/babel-plugin-import), which can convert the following code to the 'antd/lib/xxx' way:

```jsx
import { Button } from 'antd';
```

And this plugin can load styles too, read [usage](https://github.com/ant-design/babel-plugin-import#usage) for more details.

## Customization

- [Customize Theme](/docs/react/customize-theme)
- [Local Iconfont](https://github.com/ant-design/antd-init/tree/master/examples/local-iconfont)

## Tips

- You can use any `npm` modules.
- We recommend to write code in [ES2015](http://babeljs.io/blog/2015/06/07/react-on-es6-plus) as `babel` has been integrated in our work flow.
