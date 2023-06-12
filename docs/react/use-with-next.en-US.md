---
order: 4
title: Usage with Next.js
---

[Next.js](https://nextjs.org/) is currently the most popular React server-side isomorphic framework in the world. This article will try to use `antd` components in projects created by Next.js.

## Install and Initialization

Before all start, you may need install [yarn](https://github.com/yarnpkg/yarn/) or [pnpm](https://pnpm.io/).

<InstallDependencies npm='$ npx create-next-app antd-demo' yarn='$ yarn create next-app antd-demo' pnpm='$ pnpm create next-app antd-demo'></InstallDependencies>

The tool will create and initialize environment and dependencies automatically, please try config your proxy setting, or use another npm registry if any network errors happen during it.

After the initialization is complete, we enter the project and start.

```bash
$ cd antd-demo
$ npm run dev
```

Open the browser at http://localhost:3000/. if you see the NEXT logo, it is considered a success.

## Import antd

Now we install `antd` from yarn or npm.

```bash
$ npm install antd --save
```

Modify `src/app/page.tsx`, import Button component from `antd`.

```jsx
import React from 'react';
import { Button } from 'antd';

const Home = () => (
  <div className="App">
    <Button type="primary">Button</Button>
  </div>
);

export default Home;
```

OK, you should now see a blue primary button displayed on the page. Next you can choose any components of `antd` to develop your application. Visit other workflows of `Next.js` at its [User Guide](https://nextjs.org/).

We are successfully running antd components now, go build your own application!
