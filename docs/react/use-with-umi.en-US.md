---
group:
  title: Basic Usage
order: 2
title: Usage with Umi
---

In real project development, besides UI libraries like Ant Design, you may also need build tools, routing solutions, CSS solutions, data flow solutions, request libraries and request solutions, i18n solutions, permission solutions, Icons solutions, etc. We have launched [Umi](https://umijs.org/), an enterprise application framework based on React, based on the scenarios of business scenarios, which we recommend you to use in your projects.

Umi is a scalable enterprise front-end application framework and the underlying front-end framework of Ant Group, which has served 10,000+ applications directly or indirectly.

This article will guide you through creating a simple application from scratch using Umi, Ant Design and [Ant Design Pro](https://pro.ant.design/).

## Initialization Project

The recommended way to create a Umi scaffold is using [pnpm](https://pnpm.io/) to execute the following command.

```bash
$ mkdir myapp && cd myapp
$ pnpm create umi
```

> If you use npm, you can run `npm create umi` for the same effect; if you use yarn, run `yarn create umi`; if you use bun, which means you are a very hipster, you can run `bunx create-umi` (note that there is a `-` between create and umi).

Select "Simple App" here, because we want to start from "scratch".

```bash
? Pick Umi App Template › - Use arrow-keys. Return to submit.
❯   Simple App
    Ant Design Pro
    Vue Simple App
```

Here we recommend "pnpm". pnpm is better in speed and handling ghost dependencies.

```bash
? Pick Npm Client › - Use arrow-keys. Return to submit.
    npm
    cnpm
    tnpm
    yarn
❯   pnpm
```

For those in China, we recommend choosing "taobao", otherwise choose "npm".

```bash
? Pick Npm Registry › - Use arrow-keys. Return to submit.
❯   npm
    taobao
```

The tool then automatically installs the dependencies and executes the initialization script for the umi.

Before starting the project, let's install some more dependencies that will be used in this tutorial.

```bash
$ pnpm i @umijs/plugins -D
$ pnpm i antd axios @ant-design/pro-layout -S
```

`@umijs/plugins` is the official plugin set of Umi, containing a large number of plugins such as valtio, react-query, styled-components, locale, access, qiankun, etc. `antd` needs no introduction. `axios` is the request library; `@ant-design/pro-layout` is the component used to generate the layouts.

When finished, execute the following command to start the project.

```bash
$ npm run dev
umi dev
info  - Umi v4.0.46
        ╔════════════════════════════════════════════════════╗
        ║ App listening at:                                  ║
        ║  >   Local: http://localhost:8000                  ║
ready - ║  > Network: http://*********:8000                  ║
        ║                                                    ║
        ║ Now you can open browser with the above addresses↑ ║
        ╚════════════════════════════════════════════════════╝
```

Follow the prompts and click the url in the command line, which will automatically open the browser. If it goes well, you will see the following screen.

![](https://img.alicdn.com/imgextra/i2/O1CN01hWo9eO1ji9BZ1YHju_!!6000000004581-2-tps-774-928.png)

## Create New Routes

We're going to write an application to display a list of products. The first step is to create the routes, which can be thought of as the different pages that make up the application. Umi users don't usually need to care about the implementation behind Umi, but in case you're wondering, Umi's routes are based on react-router@6.3 (Note: not the latest 6.4, which contains loader and action functionality that is not required for Umi).

We can create routes with cli.

```bash
$ npx umi g page products
Write: src/pages/products.tsx
Write: src/pages/products.less
```

Then modify the configuration file `.umirc.ts` with the new route declaration.

```diff
import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
+    { path: "/products", component: "products" },
  ],
  npmClient: "pnpm",
});
```

Since the boilerplate uses configured routing, as the name implies, the routes are configured line by line by people, which is tedious but more flexible, this way you need to add the routes field to the configuration, see [Umi Documentation on Routing](https://umijs.org/docs/guides/routes). In addition, Umi also supports protocol-based routing, meaning that the file system is the route, so there is no need to configure routes to take effect.

Then we edit the `src/layouts/index.tsx` file and add the navigation to the `/products` path in the global layout route.

```diff
<li>
  <Link to="/docs">Docs</Link>
</li>
+ <li>
+   <Link to="/products">Products</Link>
+ </li>
```

Open http://localhost:8000/products and if it goes well, you will see the following page.

![](https://img.alicdn.com/imgextra/i2/O1CN01aNdyVG1bEMV7WEmBv_!!6000000003433-2-tps-712-276.png)

## Implementing Product UI components

As your application grows, you'll need to share UI elements across multiple pages (or use them multiple times on a single page), and in Umi you can abstract this out into components. Let's write a ProductList component so that we can display the product list in different places.

Create a new `src/components/ProductList.tsx` file with the following code.

```tsx
import React from 'react';
import { Button, Popconfirm, Table } from 'antd';

const ProductList: React.FC<{ products: { name: string }[]; onDelete: (id: string) => void }> = ({
  onDelete,
  products,
}) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
      render(text, record) {
        return (
          <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];
  return <Table rowKey="id" dataSource={products} columns={columns} />;
};

export default ProductList;
```

## Preparing Mock Data

Assuming we have agreed on an API interface with the backend developers, we can now use Mock data to locally mock up the data that the API should return, so that front-end and back-end development can proceed simultaneously without the front-end work being blocked because the back-end API is still being developed. Umi provides an out-of-the-box [Mock function](https://umijs.org/docs/guides/mock) that allows you to set up Mock data in a convenient and easy way.

Create a `mock` directory and add a new `products.ts` file to this directory with the following code.

```ts
import { defineMock } from 'umi';

type Product = {
  id: string;
  name: string;
};

let products: Product[] = [
  { id: '1', name: 'Umi' },
  { id: '2', name: 'Ant Design' },
  { id: '3', name: 'Ant Design Pro' },
  { id: '4', name: 'Dva' },
];

export default defineMock({
  'GET /api/products': (_, res) => {
    res.send({
      status: 'ok',
      data: products,
    });
  },
  'DELETE /api/products/:id': (req, res) => {
    products = products.filter((item) => item.id !== req.params.id);
    res.send({ status: 'ok' });
  },
});
```

Then visit http://localhost:8000/api/products and you will see the api response.

## Complete Products Page

With the UI components and Mock data done, it's time to bring them together. The request solution is needed here, and our choice here is react-query (if you want to say @tanstack/react-query, yes, they are the same library, and @tanstack/react-query is a renamed package of react-query). So before you start, you need to change the configuration to enable the [react-query plugin for Umi](https://umijs.org/docs/max/react-query) with one click.

First edit `.umirc.ts`.

```diff
import { defineConfig } from "umi";

export default defineConfig({
+  plugins: ['@umijs/plugins/dist/react-query'],
+  reactQuery: {},
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    { path: "/products", component: "products" },
  ],
  npmClient: 'pnpm',
});
```

Edit `src/pages/products.tsx` with the following code.

```tsx
import axios from 'axios';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'umi';
import ProductList from '@/components/ProductList';
import styles from './products.less';

export default function Page() {
  const queryClient = useQueryClient();
  const productsQuery = useQuery(['products'], {
    queryFn() {
      return axios.get('/api/products').then((res) => res.data);
    },
  });
  const productsDeleteMutation = useMutation({
    mutationFn(id: string) {
      return axios.delete(`/api/products/${id}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
  if (productsQuery.isLoading) return null;
  return (
    <div>
      <h1 className={styles.title}>Page products</h1>
      <ProductList
        products={productsQuery.data.data}
        onDelete={(id) => {
          productsDeleteMutation.mutate(id);
        }}
      />
    </div>
  );
}
```

Here, we pull the data from `/api/products` with `useQuery()` and submit a DELETE request to `/api/products/${id}` in the `onDelete` event with `useMutation()` to perform the delete operation. For more details on the use of react-query, please refer to [Umi Plugin for React Query](https://umijs.org/docs/max/react-query) and [React Query Official Website](https://tanstack.com/query/).

After saving, you should see the following screen.

![](https://img.alicdn.com/imgextra/i1/O1CN014Sq3Uq1IceoHSfGrR_!!6000000000914-1-tps-550-411.gif)

## ProLayout

A standard backend project generally need a layout, this layout is very often highly similar, [ProLayout](https://procomponents.ant.design/components/layout/) encapsulates the common menu, breadcrumbs, page headers and other functions, provides a non-dependent framework and an out-of-the-box advanced layout component. And support `side`, `mix`, `top` three modes, but also built-in menu selection, menu generation breadcrumbs, automatically set the logic of the page title.

Modify the configuration for each route to add a name field for ProLayout to do menu rendering use.

```diff
import { defineConfig } from "umi";

export default defineConfig({
  routes: [
-    { path: "/", component: "index" },
+    { path: "/", component: "index", name: "home" },
-    { path: "/docs", component: "docs" },
+    { path: "/docs", component: "docs", name: "docs" },
-    { path: "/products", component: "products" },
+    { path: "/products", component: "products", name: "products" },
  ],
  plugins: ["@umijs/plugins/dist/react-query"],
  reactQuery: {},
  npmClient: "pnpm",
});
```

Edit `src/layouts/index.tsx` with the following code.

```tsx
import { ProLayout } from '@ant-design/pro-layout';
import { Link, Outlet, useAppData, useLocation } from 'umi';

export default function Layout() {
  const { clientRoutes } = useAppData();
  const location = useLocation();
  return (
    <ProLayout
      route={clientRoutes[0]}
      location={location}
      title="Umi x Ant Design"
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children) {
          return defaultDom;
        }
        if (menuItemProps.path && location.pathname !== menuItemProps.path) {
          return (
            <Link to={menuItemProps.path} target={menuItemProps.target}>
              {defaultDom}
            </Link>
          );
        }
        return defaultDom;
      }}
    >
      <Outlet />
    </ProLayout>
  );
}
```

Here we first use umi's `useAppData` to get the global client route `clientRoutes`, which is a nested routing object, and we pass `clientRoutes[0]` to ProLayout; then we use `useLocation()` to get the location information, which is also passed to ProLayout to decide which menu should be highlighted; we also want to do a route jump when we click on the menu, so we need to customize ProLayout's menuItemRender method.

You may have found `src/layouts/index.less` has no place to refer to him, in order to keep the project file tidy, you can choose to delete him.

The browser will automatically refresh at this point, and if it goes well, you'll see the following screen.

![](https://img.alicdn.com/imgextra/i2/O1CN01jLPfng1WljHFhj3mc_!!6000000002829-2-tps-1670-934.png)

## Build Application

After completing the development and verifying it in the development environment, it is time to deploy it to our users by executing the following command.

```bash
$ npm run build
info  - Umi v4.0.46
✔ Webpack
  Compiled successfully in 5.31s
info  - File sizes after gzip:
  122.45 kB  dist/umi.js
  575 B      dist/src__pages__products.async.js
  312 B      dist/src__pages__index.async.js
  291 B      dist/layouts__index.async.js
  100 B      dist/layouts__index.chunk.css
  55 B       dist/src__pages__products.chunk.css
event - Build index.html
```

The build command will package all resources, including JavaScript, CSS, Web Fonts, images, Html, etc. You can find these files in the `dist/` directory.

## Next Step

We have completed a simple application and you may still have many questions, such as

- How to handle errors uniformly?
- How to handle more routing, such as dynamic routing, nested routing, permission routing, etc.?
- How to use a data flow scheme?
- How to modify webpack configuration or switch to vite build mode?
- etc.

You can.

- Visit [Umi official website](https://umijs.org/)
- Learn about [Umi's Routing](https://umijs.org/docs/guides/routes)
- Learn about [Umi Max](https://umijs.org/docs/max/introduce), which is more integrated than Umi
- Learn about the out-of-the-box middle and backend scaffolding [Ant Design Pro](https://pro.ant.design/)
- Learn about advanced layouts [ProLayout](https://procomponents.ant.design/components/layout)
- Learn about advanced tables [ProTable](https://procomponents.ant.design/components/table)
