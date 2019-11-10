---
order: 1
title: Getting Started
---

Ant Design React is dedicated to providing a **good development experience** for programmers. Make sure that you have installed [Node.js](https://nodejs.org/)(> 8.0.0) correctly.

> Before delving into Ant Design React, a good knowledge base of [React](https://reactjs.org) and [JavaScript ES2015](http://babeljs.io/docs/learn-es2015/) is needed.

---

## First Example

Here is a simple example to show usage of Ant Design React.

<iframe src="https://codesandbox.io/embed/wk04r016q8?fontsize=14" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### 1. Create one codesandbox

Visit http://u.ant.design/codesandbox-repro to create a codesandbox. Don't forget to press the save button.

### 2. Using antd component

Replace the content of `index.js` with the following code. As you can see, there is no difference between antd's components and typical React components.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message } from 'antd';
import 'antd/dist/antd.css';
import './index.css';

class App extends React.Component {
  state = {
    date: null,
  };

  handleChange = date => {
    message.info(`Selected Date: ${date ? date.format('YYYY-MM-DD') : 'None'}`);
    this.setState({ date });
  };

  render() {
    const { date } = this.state;
    return (
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={this.handleChange} />
        <div style={{ marginTop: 20 }}>
          Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### 3. Explore more components

You can look up components in the side menu like the [Alert](/components/alert) component. Plenty of examples are provided in the component pages and API documentation.

Click the "Open in Editor" icon in the first example to open an editor with source code to use out-of-the-box. Now you can import the `Alert` component into the codesandbox:

```diff
- import { DatePicker, message } from 'antd';
+ import { DatePicker, message, Alert } from 'antd';
```

Add the following jsx into the `render` function.

```diff
  <DatePicker onChange={value => this.handleChange(value)} />
  <div style={{ marginTop: 20 }}>
-   Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}
+   <Alert message={`Selected Date: ${date ? date.format('YYYY-MM-DD') : 'None'}`} type="success" />
  </div>
```

Now you can see the result in the preview section.

<img width="420" src="https://gw.alipayobjects.com/zos/antfincdn/QjCr7oLcpT/c7ce72d2-601e-4130-a33b-456d4652bb2d.png" alt="codesandbox screenshot" />

OK! Now you know how to use antd components in a clear way. You are welcome to explore more components in the codesandbox. We also strongly recommend using codesandbox to provide a reproducible demo when reporting a bug.

### 4. Next Step

In the real world you will need a development workflow consisting of `compile/build/deploy/lint/debug`. You can find and read articles on the subject or try other scaffolds provided below:

- [Ant Design Pro](http://pro.ant.design/)
- [antd-admin](https://github.com/zuiidea/antd-admin)
- [d2-admin](https://github.com/d2-projects/d2-admin)
- more scaffolds at [Scaffold Market](http://scaffold.ant.design/)

## Compatibility

Ant Design React supports all modern browsers and IE9+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| --- | --- | --- | --- | --- | --- |
| IE9, IE10, IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

We offer very limited support for IE9/10 which means some styles and animations will be mininal for them. Also, we use Flex layout in a few components.

> Note: Different than Ant Design, Ant Design Pro supports IE11+.

Polyfills are needed for IE browsers. We recommend [babel-preset-env](https://babeljs.io/docs/en/babel-preset-env) for it. You can set `targets` config if you are using [umi](http://umijs.org/).

Ant Design 3.0 supports both React 15 and 16 but we strongly suggest React 16 for better performance and fewer bugs.

#### IE8 note

> We don't support IE8 after `antd@2.0`.

## Customized Work Flow

If you want to customize your work flow, we recommend using [webpack](http://webpack.github.io/) to build and debug code.

Also, you can use any [scaffold](https://github.com/enaqx/awesome-react#boilerplates) available in the React ecosystem. If you encounter problems, you can use our [webpack config](https://github.com/ant-tool/atool-build/blob/master/src/getWebpackCommonConfig.js) and [modify it](http://ant-tool.github.io/webpack-config.html).

If you are trying [parcel](https://parceljs.org), here is [a demo repository](https://github.com/ant-design/parcel-antd).

There are some [scaffolds](http://scaffold.ant.design/) which have already integrated antd, so you can try and start with one of these and even contribute.

## Import on Demand

If you see logs like in the screenshot below, you might be importing all components by writing `import { Button } from 'antd';`. This will affect your app's network performance.

```
You are using a whole package of antd, please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.
```

> ![console warning](https://zos.alipayobjects.com/rmsportal/GHIRszVcmjccgZRakJDQ.png)

However, we can import individual components on demand:

```jsx
import Button from 'antd/es/button';
import 'antd/es/button/style'; // or antd/es/button/style/css for css format file
```

> Note: antd supports ES6 tree shaking, so `import { Button } from 'antd';` will drop the js code you don't use too.

We strongly recommend using [babel-plugin-import](https://github.com/ant-design/babel-plugin-import), which can convert the following code to the 'antd/es/xxx' way:

```jsx
import { Button } from 'antd';
```

And this plugin can load styles too. Read [usage](https://github.com/ant-design/babel-plugin-import#usage) for more details.

> FYI, babel-plugin-import's `style` option will importing some global reset styles, don't use it if you don't need those styles. You can import styles manually via `import 'antd/dist/antd.css'` and override the global reset styles.

## Customization

- [Customize Theme](/docs/react/customize-theme)
- [Local Iconfont](https://github.com/ant-design/antd-init/tree/master/examples/local-iconfont)
