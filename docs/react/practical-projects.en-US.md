---
order: 2
title: Real project with umi and dva
---

In real project development, you might need a data flow solution like Redux or MobX. Ant Design React is a UI library that can be used with any data flow solution and application framework within the React ecosystem. We have launched dva based on Redux, as well as a pluggable enterprise application framework umi, which is recommended for use in your projects.

Dva is a lightweight data flow solution based on Redux. The concept comes from elm. It supports side effects, hot module replacement, dynamic loading, react-native, SSR, etc. It has been widely used in production.

And [umi](http://umijs.org/) is a routing-based framework that supports [next.js-like conventional routing](https://umijs.org/guide/router.html) and various advanced routing functions, such as [routing-level on-demand loading](https://umijs.org/en/plugin/umi-plugin-react.html#dynamicimport). With a complete [plugin system](https://umijs.org/plugin/) that covers every life cycle from source code to build product, umi is able to support various functional extensions and business needs; meanwhile [Umi UI](https://umijs.org/guide/umi-ui.html) is provided to enhance the development experience and development efficiency through Visual Aided Programming (VAP).

> You may also be interested in [Ant Design Pro](https://pro.ant.design/), an Out-of-box UI solution for enterprise applications based on umi, dva and ant design.

This article will guide you to create a simple application from zero using Umi UI, dva and antd.

## Install Umi UI

It is recommended to use yarn to create an application and execute the following command.

> If you are using npm, execute `npm install umi -g` and the effect will be the same.

```bash
$ yarn global add umi
$ umi -v
2.10.4
```

Make sure the umi version is above 2.10.0.

## Create New App

Start the app,

```bash
$ umi ui

🚀 Starting Umi UI using umi@2.10.4...
🧨  Ready on http://localhost:3000/
```

After starting, Umi UI will automatically open the browser, then click `Create Project`, select the path and enter `App name`, as shown below.

<img src="https://gw.alipayobjects.com/zos/antfincdn/kQSR2zWDQ6/26543f59-07de-44b7-8b1d-b34e1266de8b.png" width="718" />

Click `Next`, select `Basic Template`, select `antd` and `dva` on the technology stack, then click `Finish`.

<img src="https://gw.alipayobjects.com/zos/antfincdn/Pz9ayQpkWw/3c8a0190-ac32-444f-812e-3d1eff422507.png" width="718" />

In the project creation process, wait a few minutes.

<img src="https://gw.alipayobjects.com/zos/antfincdn/UtFy3fYg9n/bb7ef7c0-2fdb-403e-9b5a-d4ba02390483.png" width="718" />

After creating, go to `Overview` and click on the shortcut entry `Run Dev`.

<img src="https://gw.alipayobjects.com/zos/antfincdn/sZj2WeXiqc/44ddbc70-386c-4c8a-8deb-6a4a93a3afb2.png" width="718" />

In the task page, click `Start`,

<img src="https://gw.alipayobjects.com/zos/antfincdn/%24ot6F6Bj2L/a4c49cda-4ff8-409f-8054-9281199b6270.png" width="718" />

When prompted, open [http://localhost:8000](http://localhost:8000) in your browser, you will see the welcome page of umi.

<img src="https://gw.alipayobjects.com/zos/antfincdn/2Bm%24zoeBpz/ba708131-c7ac-41f0-92a0-c86007291b6a.png" width="718" />

## Integrate antd

After selecting `antd` earlier, antd's dependencies are automatically handled and loaded on demand. You can check the `Configuration` to make sure antd is turned on.

<img src="https://gw.alipayobjects.com/zos/antfincdn/0EFiWipONe/7aea9287-09ff-4396-bb20-d8da28483c2c.png" width="718" />

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

Click `Open in editor`,

<img src="https://gw.alipayobjects.com/zos/antfincdn/yXRYDK88RS/2252c0f6-747f-422c-aeb6-dc518d74c8ea.png" width="718" />

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

Now that we've written our application and verified that it works in development, it's time to get it ready for deployment to our users. To do so, click `build` in Task page.

<img src="https://gw.alipayobjects.com/zos/antfincdn/P31ZGMwzGe/d5365860-f7c6-4abe-98c0-36d6b1b3a65a.png" width="718" />

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
