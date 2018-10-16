---
order: 1
title: Getting Started
---

Ant Design React is dedicated to providing a **good development experience** for programmers. Make sure that you had installed [Node.js](https://nodejs.org/)(> 8.0.0) correctly.

> Before delving into Ant Design React, a good knowledge base of [React](http://facebook.github.io/react/) and [JavaScript ES2015](http://babeljs.io/docs/learn-es2015/) is needed.

---

## Playground

The following CodeSandbox demo is the simplest use case, and it's also a good habit to fork this demo to provide a re-producible demo while reporting a bug.

<iframe src="https://codesandbox.io/embed/wk04r016q8?fontsize=12" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## First Local Development

During development, you may need to compile and debug JSX and ES2015 code, and even proxy some of the requests to mock data or other external services. All of these can be done with quick feedback provided through hot reloading of changes.

### 1. Installation

[antd-init](https://github.com/ant-design/antd-init/) is a demo-only scaffold tool. If you want to create real world projects, [create-umi](https://github.com/umijs/create-umi) and [create-react-app](https://github.com/facebookincubator/create-react-app) is our recommendation.

```bash
$ npm install antd-init -g
```

Read [the documentation of `antd-init`](https://github.com/ant-design/antd-init/) and [the documentation of `ant-tool`](http://ant-tool.github.io/) to explore more features.

Also, you can try other scaffolds provided below:

- [Ant Design Pro](http://pro.ant.design/)
- [antd-admin](https://github.com/zuiidea/antd-admin)
- [d2-admin](https://github.com/d2-projects/d2-admin)
- more scaffolds at [Scaffold Market](http://scaffold.ant.design/)

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
import { LocaleProvider, DatePicker, message } from 'antd';
// The default locale is en-US, but we can change it to other language
import frFR from 'antd/lib/locale-provider/fr_FR';
import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }
  handleChange(date) {
    message.info('Selected Date: ' + (date ? date.toString() : ''));
    this.setState({ date });
  }
  render() {
    return (
      <LocaleProvider locale={frFR}>
        <div style={{ width: 400, margin: '100px auto' }}>
          <DatePicker onChange={value => this.handleChange(value)} />
          <div style={{ marginTop: 20 }}>Date: {this.state.date && this.state.date.toString()}</div>
        </div>
      </LocaleProvider>
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

Entry files will be built and generated in `dist` directory, where we can deploy it to different environments.

> This guide is designed to help you to understand how to use antd, so it may not be similar to what you do in the real world.
> But you can use those tools in your project, depending on your context and needs.

## Compatibility

Ant Design React supports all the modern browsers and IE9+.

You need to provide [es5-shim](https://github.com/es-shims/es5-shim) and [es6-shim](https://github.com/paulmillr/es6-shim) and other polyfills for IE browsers.

If you are using babel, we strongly recommend using [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) and [babel-plugin-transform-runtime](https://babeljs.io/docs/plugins/transform-runtime/) instead of those two shims.

> Please avoid using both the babel and shim methods at the same time.

> If you run into problems with [startsWith ](https://github.com/ant-design/ant-design/issues/3400#issuecomment-253181445), you should import  [es6-shim](https://github.com/paulmillr/es6-shim) or [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) as a workaround.

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
    <script src="https://as.alipayobjects.com/g/component/??es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js"></script>
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

If you want to customize your work flow, we recommend using [webpack](http://webpack.github.io/) to build and debug code.

Also, you can use any [scaffold](https://github.com/enaqx/awesome-react#boilerplates) available in the React ecosystem. If you encounter problems, you can use our [webpack config](https://github.com/ant-tool/atool-build/blob/master/src/getWebpackCommonConfig.js) and [modify it](http://ant-tool.github.io/webpack-config.html).

If you are trying [parcel](https://parceljs.org), here is [a demo repository](https://github.com/ant-design/parcel-antd).

There are some [scaffolds](http://scaffold.ant.design/) which have already integrated antd, so you can try and start with one of these, and even contribute.


## Import on Demand

If you see logs like below screenshot, you might be importing all components by writing `import { Button } from 'antd';`. This will affect your app's network performance.

```
You are using a whole package of antd, please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.
```

> ![console warning](https://zos.alipayobjects.com/rmsportal/GHIRszVcmjccgZRakJDQ.png)

However, we can import individual components on demand:

```jsx
import Button from 'antd/lib/button';
import 'antd/lib/button/style'; // or antd/lib/button/style/css for css format file
```

> `antd/es/button` to import es version module for tree shaking.

We strongly recommend using [babel-plugin-import](https://github.com/ant-design/babel-plugin-import), which can convert the following code to the 'antd/lib/xxx' way:

```jsx
import { Button } from 'antd';
```

And this plugin can load styles too, read [usage](https://github.com/ant-design/babel-plugin-import#usage) for more details.

> FYI, babel-plugin-import's `style` option will importing some global reset styles, don't use it if you don't need those styles. You can import styles manually via `import 'antd/dist/antd.css'` and override the global reset styles.

## Customization

- [Customize Theme](/docs/react/customize-theme)
- [Local Iconfont](https://github.com/ant-design/antd-init/tree/master/examples/local-iconfont)

## Tips

- You can use any `npm` modules.
- We recommend writing code in [ES2015](http://babeljs.io/blog/2015/06/07/react-on-es6-plus) as `babel` has been integrated into our work flow.
