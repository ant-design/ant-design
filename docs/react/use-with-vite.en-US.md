---
group:
  title: Basic Usage
order: 3
title: Usage with Vite
---

[Vite](https://vitejs.dev/) is one of the best React application development tools. We are going to use `antd` within it and modify the vite config for some customized needs.

## Install and Initialization

Before all start, you may need install [yarn](https://github.com/yarnpkg/yarn/) or [pnpm](https://pnpm.io/).

<InstallDependencies npm='$ npm create vite antd-demo' yarn='$ yarn create vite antd-demo' pnpm='$ pnpm create vite antd-demo'></InstallDependencies>

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

Now we install `antd` from yarn or npm or pnpm.

<InstallDependencies npm='$ npm install antd --save' yarn='$ yarn add antd' pnpm='$ pnpm install antd --save'></InstallDependencies>

Modify `src/App.js`, import Button component from `antd`.

```jsx
import React from 'react';
import { Button } from 'antd';

const App = () => (
  <div className="App">
    <Button type="primary">Button</Button>
  </div>
);

export default App;
```

OK, you should now see a blue primary button displayed on the page. Next you can choose any components of `antd` to develop your application. Visit other workflows of `Vite` at its [User Guide](https://vitejs.dev/).

We are successfully running antd components now, go build your own application!
