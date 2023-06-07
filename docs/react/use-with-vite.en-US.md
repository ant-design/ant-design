---
order: 4
title: Use in vite
---

[vite](https://vitejs.dev/) is one of the best React application development tools. We are going to use `antd` within it and modify the vite config for some customized needs.

---

## Install and Initialization

Before all start, you may need install [yarn](https://github.com/yarnpkg/yarn/) or [pnpm](https://pnpm.io/).

```bash
$ npm create vite@latest antd-demo

# or

$ yarn create vite antd-demo

# or

$ pnpm create vite antd-demo
```

The tool will create and initialize environment and dependencies automatically, please try config your proxy setting, or use another npm registry if any network errors happen during it.

Then we go inside `antd-demo` install dependencies and start it.

```bash
$ cd antd-demo
$ npm install
$ npm run dev
```

Open the browser at http://localhost:5173/. It renders a header saying `Vite + React` on the page.

## Import antd

Below is the default directory structure.

```
├── public
│   └── vite.svg
├── src
│   └── assets
│       └── react.svg
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── main.js
│   └── logo.svg
├── index.html
├── package.json
└── vite.config.ts
```

Now we install `antd` from yarn or npm.

```bash
$ npm install antd --save
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

OK, you should now see a blue primary button displayed on the page. Next you can choose any components of `antd` to develop your application. Visit other workflows of `vite` at its [User Guide](https://vitejs.dev/).

We are successfully running antd components now, go build your own application!

## Advanced Guides

In the real world, we usually have to modify default vite config for custom needs such as themes.

```js
/* vite.config.js */
export default {
  // ...
};
```

These configuration options are for you to explore on your own, and are beyond the scope of this article.

### Customize Theme

Ref to the [Customize Theme documentation](/docs/react/customize-theme). Modify theme with ConfigProvider:

```tsx
import { ConfigProvider } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
    <MyApp />
  </ConfigProvider>
);

export default App;
```

## Summary

Finally, we used antd with vite successfully.

Next part, We will introduce how to use antd in [TypeScript](/docs/react/use-in-typescript) and [Umi](/docs/react/practical-projects), let's keep moving!
