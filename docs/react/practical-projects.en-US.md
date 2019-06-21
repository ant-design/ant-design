---
order: 2
title: Real project with umi and dva
---

In real project development, you might need a data flow solution like Redux or MobX. Ant Design React is a UI library that can be used with any data flow solution and application framework within the React ecosystem. We have launched dva based on Redux, as well as a pluggable enterprise application framework umi, which is recommended for use in your projects.

Dva is a lightweight data flow solution based on Redux. The concept comes from elm. It supports side effects, hot module replacement, dynamic loading, react-native, SSR, etc. It has been widely used in production.

And [umi](http://umijs.org/) is a routing-based framework that supports [next.js-like conventional routing](https://umijs.org/guide/router.html) and various advanced routing functions, such as [routing-level on-demand loading](https://umijs.org/en/plugin/umi-plugin-react.html#dynamicimport). With a complete [plugin system](https://umijs.org/plugin/) that covers every life cycle from source code to build product, umi is able to support various functional extensions and business needs.

> You may also be interested in [Ant Design Pro](https://pro.ant.design/), an Out-of-box UI solution for enterprise applications based on umi, dva and ant design.

This article will guide you to create a simple application from zero using umi, dva and antd.

## Create New App

First create an empty directory,

```bash
$ mkdir myapp
$ cd myapp
```

It is recommended to use yarn to create an application and execute the following command.

> If you are using npm, execute `npm create umi` and the effect will be the same.

```bash
$ yarn create umi

yarn create v1.12.0
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...

success Installed "create-umi@0.9.5" with binaries:
      - create-umi
```

Yarn will install the latest version of [create-umi](https://github.com/umijs/create-umi) and then create the app with interactive ui.

Select `app` and press Enter to confirm.

```
? Select the boilerplate type
  ant-design-pro  - Create project with an layout-only ant-design-pro boilerplate, use together with umi block.
❯ app             - Create project with a simple boilerplate, support typescript.
  block           - Create a umi block.
  library         - Create a library with umi.
  plugin          - Create a umi plugin.
```

Select `antd` and `dva` and press Enter to confirm.

```bash
   create package.json
   create mock/.gitkeep
   create src/assets/yay.jpg
   create src/layouts/index.css
   create src/layouts/index.js
   create src/pages/index.css
   create src/pages/index.js
   create src/global.css
   create .gitignore
   create .editorconfig
   create .env
   create .umirc.js
   create .eslintrc
   create .prettierrc
   create .prettierignore
   create src/models/.gitkeep
   create src/dva.js
✨  File Generate Done
✨  Done in 966.73s.
```

Then install dependencies,

```bash
$ yarn
```

Then start the app,

```bash
$ yarn start
```

After a few seconds, you will see the following output,

```bash
 DONE  Compiled successfully in 212ms

  App running at:
  - Local:   http://localhost:8000/
  - Network: http://{{ YourIP }}:8000/
```

Open [http://localhost:8000](http://localhost:8000) in your browser, you will see the welcome page of umi.

<img src="https://gw.alipayobjects.com/zos/rmsportal/lewbQdlEHzuNDpaxykUP.png" width="718" />

## Integrate antd

After selecting `antd` earlier, antd's dependencies are automatically handled and loaded on demand. You can check the configuration in `.umirc.js` to make sure antd is turned on.

```js
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
      },
    ],
  ],
};
```

> And if you want to use a fixed version of antd, you can install additional antd dependency in your project, and the antd dependencies declared in package.json will be used first.

## Create Routes

We need to write an application displaying the list of products. The first step is to create a route.

If you don't have npx, you need to install it first to execute the commands under node_modules.

```bash
$ yarn global add npx
```

Then create a `/products` route,

```bash
$ npx umi g page products

   create src/pages/products.js
   create src/pages/products.css
✔  success
```

Then open [http://localhost:8000/products](http://localhost:8000/products) in your browser and you should see the corresponding page.

## Write UI Components

As your application grows and you notice you are sharing UI elements between multiple pages (or using them multiple times on the same page), in umi it's called reusable components.

Let's create a `ProductList` component that we can use in multiple places to show a list of products.

Create `src/components/ProductList.js` by typing:

```js
import { Table, Popconfirm, Button } from 'antd';

const ProductList = ({ onDelete, products }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
      render: (text, record) => {
        return (
          <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];
  return <Table dataSource={products} columns={columns} />;
};

export default ProductList;
```

## Define dva Model

After completing the UI, we will begin processing the data and logic.

dva manages the domain model with `model`, with reducers for synchronous state updates, effects for async logic, and subscriptions for data source subscribe.

Let's create a model `src/models/products.js` by typing,

```js
export default {
  namespace: 'products',
  state: [],
  reducers: {
    delete(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
};
```

In this model:

- `namespace` represents the key on global state
- `state` is the initial value, here it is an empty array
- `reducers` is equivalent to a reducer in redux, accepting an action, and update state simultaneously

In umi, the model files under `src/models` will be automatically injected, you don't need to inject manually.

## Connect

So far, we have completed a separate model and component. How do we connect them together?

dva provides a `connect` method. If you are familiar with redux, this connect is from react-redux.

Edit `src/pages/products.js` and replace it with the following,

```js
import { connect } from 'dva';
import ProductList from '../components/ProductList';

const Products = ({ dispatch, products }) => {
  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  return (
    <div>
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  );
};

export default connect(({ products }) => ({
  products,
}))(Products);
```

Finally, we need some initial data to make the application run together. Edit `src/app.js`,

```js
export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
    initialState: {
      products: [{ name: 'dva', id: 1 }, { name: 'antd', id: 2 }],
    },
  },
};
```

Refresh your browser, you should see the following result:

<img src="https://zos.alipayobjects.com/rmsportal/GQJeDDeUCSTRMMg.gif" />

## Build

Now that we've written our application and verified that it works in development, it's time to get it ready for deployment to our users. To do so, run the following command,

```bash
$ npm run build
```

After a few seconds, the output should be as follows,

```bash
> @ build /private/tmp/sorrycc-V0lLrF
> umi build

[5:01:58 PM] webpack compiled in 11s 615ms


 DONE  Compiled successfully in 11622ms                                           5:01:58 PM

File sizes after gzip:

  340.44 KB  dist/umi.js
  17.82 KB   dist/umi.css
```

The `build` command packages up all of the assets that make up your application —— JavaScript, templates, CSS, web fonts, images, and more. Then you can find these files in the `dist/` directory.

## What's Next

We have completed a simple application, but you may still have lots of questions, such as:

- How to handle onError globally and locally?
- How to handle routes?
- How to mock data?
- How to deploy?
- ant so on...

You can:

- Visit [umi official website](https://umijs.org/) and [dva official website](https://dvajs.com/)
- Know [the umi routes](https://umijs.org/zh/guide/router.html)
- Know [how to deploy umi application](https://umijs.org/zh/guide/deploy.html)
- Checkout [dva knowledge](https://dvajs.com/knowledgemap/), including all the basic knowledge with ES6, React, dva
- Be familiar with the [8 Concepts of dva](https://dvajs.com/guide/concepts.html), and understand how they are connected together
