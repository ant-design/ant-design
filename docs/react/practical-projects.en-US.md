---
order: 3
title: Real project with dva
---

[dva](https://github.com/dvajs/dva) is a React and redux based, lightweight and elm-style framework, which supports side effects, hot module replacement, dynamic on demand, react-native, SSR. And it has been widely used in production environment.

This article will guide you to create a simple application from zero using dva and antd.

Include the following:

---

## Install dva-cli

Install dva-cli with npm, and make sure the version is larger then `0.7.0`.

```bash
$ npm install dva-cli -g
$ dva -v
0.7.0
```

## Create New App

After installed dva-cli, you can have access to the `dva` command in terminal ([can't access?](http://stackoverflow.com/questions/15054388/global-node-modules-not-installing-correctly-command-not-found)). Now, create a new application with `dva new`.

```bash
$ dva new dva-quickstart
```

This creates `dva-quickstart` directory, that contains the project directories and files, and provides development server, build script, mock service, proxy server and so on.

Then `cd` the `dva-quickstart` directory, and start the development server.

```bash
$ cd dva-quickstart
$ npm start
```

After a few seconds, you will see the following output:

```bash
Compiled successfully!

The app is running at:

  http://localhost:8000/

Note that the development build is not optimized.
To create a production build, use npm run build.
```

Open http://localhost:8000 in your browser, you will see dva welcome page.

## Integrate antd

Install `antd` and `babel-plugin-import` with npm. `babel-plugin-import` is used to automatically import scripts and stylesheets from antd in demand. See [repo](https://github.com/ant-design/babel-plugin-import) 。

```bash
$ npm install antd babel-plugin-import --save
```

Edit `.roadhogrc` to integrate `babel-plugin-import`.

```diff
  "extraBabelPlugins": [
-    "transform-runtime"
+    "transform-runtime",
+    ["import", { "libraryName": "antd", "style": "css" }]
  ],
```

> Notice: dva-cli's build and server is bases on roadhog, view [roadhog#Configuration](https://github.com/sorrycc/roadhog/blob/master/README_en-us.md#configuration) for more `.roadhogrc` Configuration.

## Define Router

We need to write an application displaying the list of products. The first step is to create a route.

Create a route component `routes/Products.js`:

```javascript
import React from 'react';

const Products = (props) => (
  <h2>List of Products</h2>
);

export default Products;
```

Add routing information to router, edit `router.js`:

```diff
+ import Products from './routes/Products';
...
+ <Route path="/products" component={Products} />
```

Then open http://localhost:8000/#/products in your browser, you should be able to see the `<h2>` tag defined before.

## Write UI Components

As your application grows and you notice you are sharing UI elements between multiple pages (or using them multiple times on the same page), in dva it's called reusable components.

Let's create a `ProductList` component that we can use in multiple places to show a list of products.

Create `components/ProductList.js` and typing:

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button } from 'antd';

const ProductList = ({ onDelete, products }) => {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Actions',
    render: (text, record) => {
      return (
        <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
          <Button>Delete</Button>
        </Popconfirm>
      );
    },
  }];
  return (
    <Table
      dataSource={products}
      columns={columns}
    />
  );
};

ProductList.proptypes = {
  onDelete: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductList;
```

## Define Model

After complete the UI, we will begin processing the data and logic.

dva manages domain model with `model`, with reducers for synchronous state update, effects for async logic, and subscriptions for data source subscribe.

Let's create a model `models/products.js` and typing:

```javascript
import dva from 'dva';

export default {
  namespace: 'products',
  state: [],
  reducers: {
    'delete'(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
};
```

In this model:

- `namespace` represent the key on global state
- `state` is the initial value, here is an empty array
- `reducers` is equal to reducer in redux, accepting action, and update state synchronously

Then don't forget to require it in `index.js`:

```diff
// 3. Model
+ app.model(require('./models/products'));
```

## Connect

So far, we have completed a separate model and component. Then how to connect these together?

dva provides a `connect` method. If you are familiar with redux, this `connect` is from react-router.

Edit `routes/Products.js` and replace with following:

```javascript
import React from 'react';
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

// export default Products;
export default connect(({ products }) => ({
  products,
}))(Products);
```

Finally, we need some initial data to make the application run together. Edit `index.js`:

```diff
- const app = dva();
+ const app = dva({
+   initialState: {
+     products: [
+       { name: 'dva', id: 1 },
+       { name: 'antd', id: 2 },
+     ],
+   },
+ });
```

Refresh your browser, you should see the following result:

<p style="text-align: center">
  <img src="https://zos.alipayobjects.com/rmsportal/GQJeDDeUCSTRMMg.gif" />
</p>

## Build

Now that we've written our application and verified that it works in development, it's time to get it ready to deploy to our users. To do so, run the following command:

```bash
$ npm run build
```

After a few seconds, the output should be as follows:

```bash
> @ build /private/tmp/myapp
> roadhog build

Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  82.98 KB  dist/index.js
  270 B     dist/index.css
```

The `build` command packages up all of the assets that make up your application —— JavaScript, templates, CSS, web fonts, images, and more. Then you can find these files in the `dist /` directory.

## What's Next

We have completed a simple application, but you may still have lots of questions, such as:

- How to dealing with async logic
- How to load initial data elegantly
- How to handle onError globally and locally
- How to load Routes and Models on demand
- How to implement HMR
- How to mock data
- and so on...

You can:

- Visit [dva official website](https://github.com/dvajs/dva).
- Be familiar with the [8 Conpects](https://github.com/dvajs/dva/blob/master/docs/Concepts.md), and understand how they are connected together
- Know all [dva APIs](https://github.com/dvajs/dva/blob/master/docs/API.md)
- Checkout [dva knowledgemap](https://github.com/dvajs/dva-knowledgemap), including all the basic knowledge with ES6, React, dva
- Checkout [more FAQ](https://github.com/dvajs/dva/issues?q=is%3Aissue+is%3Aclosed+label%3Afaq)
- If your project is created with [dva-cli](https://github.com/dvajs/dva-cli) , checkout how to [Configure it](https://github.com/sorrycc/roadhog#配置)
