---
order: 4
title: Usage with create-react-app
---

[create-react-app](https://create-react-app.dev/) is one of the best React application development tools, This article will try to use `create-react-app` to create a project, and introduce antd.

## Install and Initialization

Before all start, you may need install [yarn](https://github.com/yarnpkg/yarn/) or [pnpm](https://pnpm.io/).

<InstallDependencies npm='$ npx create-react-app antd-demo' yarn='$ yarn create react-app antd-demo' pnpm='$ pnpm create react-app antd-demo'></InstallDependencies>

The tool will create and initialize environment and dependencies automatically, please try config your proxy setting or use another npm registry if any network errors happen during it.

Then we go inside project and start it.

```bash
$ cd antd-demo
$ yarn start
```

Open the browser at http://localhost:3000/. It renders a header saying `Welcome to React` on the page.

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
import { Button } from 'antd';
import React from 'react';

const App = () => (
  <div className="App">
    <Button type="primary">Button</Button>
  </div>
);

export default App;
```

OK, you should now see a blue primary button displayed on the page. Next you can choose any components of `antd` to develop your application. Visit other workflows of `create-react-app` at its [User Guide](https://create-react-app.dev/docs/getting-started).

We are successfully running antd components now, go build your own application!
