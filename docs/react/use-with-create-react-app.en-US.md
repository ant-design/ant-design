---
order: 4
title: Use in create-react-app
---

[create-react-app](https://github.com/facebookincubator/create-react-app) is one of the best React application development tools. We are going to use `antd` within it and modify the webpack config for some customized needs.

---

## Install and Initialization

Before all start, you may need install [yarn](https://github.com/yarnpkg/yarn/).

```bash
$ yarn create react-app antd-demo

# or

$ npx create-react-app antd-demo
```

The tool will create and initialize environment and dependencies automatically, please try config your proxy setting or use another npm registry if any network errors happen during it.

Then we go inside `antd-demo` and start it.

```bash
$ cd antd-demo
$ yarn start
```

Open the browser at http://localhost:3000/. It renders a header saying "Welcome to React" on the page.

## Import antd

Below is the default directory structure.

```
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   └── logo.svg
└── yarn.lock
```

Now we install `antd` from yarn or npm.

```bash
$ yarn add antd
```

Modify `src/App.js`, import Button component from `antd`.

```jsx
import React from 'react';
import { Button } from 'antd';
import 'antd/dist/reset.css';
import './App.css';

const App = () => (
  <div className="App">
    <Button type="primary">Button</Button>
  </div>
);

export default App;
```

OK, you should now see a blue primary button displayed on the page. Next you can choose any components of `antd` to develop your application. Visit other workflows of `create-react-app` at its [User Guide](https://create-react-app.dev/docs/getting-started).

We are successfully running antd components now, go build your own application!

## Test with Jest

`create-react-app` comes with `jest` built in. Jest does not support `esm` modules, and Ant Design uses them. In order to test your Ant Design application with Jest you have to add the following to your `package.json` :

```json
"jest": {
  "transformIgnorePatterns": [
    "/node_modules/(?!antd|@ant-design|rc-.+?|@babel/runtime).+(js|jsx)$"
  ]
}
```

## Advanced Guides

In the real world, we usually have to modify default webpack config for custom needs such as themes. We can achieve that by using [craco](https://github.com/gsoft-inc/craco) which is one of create-react-app's custom config solutions.

Install craco and modify the `scripts` field in `package.json`.

```bash
$ yarn add @craco/craco
```

```diff
/* package.json */
"scripts": {
-   "start": "react-scripts start",
-   "build": "react-scripts build",
-   "test": "react-scripts test",
+   "start": "craco start",
+   "build": "craco build",
+   "test": "craco test",
}
```

Then create a `craco.config.js` at root directory of your project for further overriding.

```js
/* craco.config.js */
module.exports = {
  // ...
};
```

### Customize Theme

Ref to the [Customize Theme documentation](/docs/react/customize-theme). Modify theme with ConfigProvider:

```tsx
import { ConfigProvider } from 'antd';
import React from 'react';

export default () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b',
      },
    }}
  >
    <MyApp />
  </ConfigProvider>
);
```

## eject

You can also eject your application using [yarn run eject](https://facebook.github.io/create-react-app/docs/available-scripts#npm-run-eject) for a custom setup of create-react-app, although you should dig into it by yourself.

## Summary

Finally, we used antd with create-react-app successfully, the source code of this guide was pushed to [create-react-app-antd](https://github.com/ant-design/create-react-app-antd) which you could clone and use it directly.

Next part, We will introduce how to use antd in [TypeScript](/docs/react/use-in-typescript) and [Umi](/docs/react/practical-projects), let's keep moving!
