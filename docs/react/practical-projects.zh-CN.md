---
order: 3
title: 项目实战
---

[dva](https://github.com/dvajs/dva) 是一个基于 react 和 redux 的轻量应用框架，概念来自 elm，支持 side effects、热替换、动态加载、react-native、SSR 等，已在生产环境广泛应用。

本文会引导你使用 dva 和 antd 从 0 开始创建一个简单应用。

会包含以下内容：

---

## 安装 dva

通过 npm 安装 dva 。

```bash
$ npm install dva-cli -g
```

## 创建新应用

安装完 dva-cli 之后，就可以在 terminal 里访问到 `dva` 命令。现在，你可以通过 `dva new` 创建新应用。

```bash
$ dva new dva-quickstart
```

这会创建 `dva-quickstart` 目录，包含项目初始化目录和文件，并提供开发服务器、构建脚本、数据 mock 服务、代理服务器等功能。

然后我们 `cd` 进入 `dva-quickstart` 目录，并启动开发服务器：

```bash
$ cd dva-quickstart
$ npm start
```

几秒钟后，你会看到以下输出：

```bash
          proxy: load rule from proxy.config.js
          proxy: listened on 8989
📦  411/411 build modules
webpack: bundle build is now finished.
```

在浏览器里打开 http://localhost:8989 ，你会看到 dva 的欢迎界面。

## 使用 antd

通过 npm 安装 `antd` 和 `babel-plugin-import` 。`babel-plugin-import` 是用来按需加载 antd 的脚本和样式的，详见 [repo](https://github.com/ant-design/babel-plugin-import) 。

```bash
$ npm install antd babel-plugin-import --save
```

编辑 `webpack.config.js`，使 `babel-plugin-import` 插件生效。

```diff
+ webpackConfig.babel.plugins.push(['import', {
+   libraryName: 'antd',
+   style: 'css',
+ }]);
```

> 注：这里不需要手动重启开发服务器，保存 `webpack.config.js` 后会自动重启。

## 定义路由

我们要写个应用来先显示产品列表。首先第一步是创建路由，路由可以想象成是组成应用的不同页面。

新建 route component `routes/Products.js`，内容如下：

```javascript
import React from 'react';

const Products = (props) => {
  return (
    <h2>List of Products</h2>
  );
};

export default Products;
```

添加路由信息到路由表，编辑 `router.js` :

```diff
+ import Products from './routes/Products';
...
+ <Route path="/products" component={Products} />
```

然后在浏览器里打开 http://localhost:8989/#/products ，你应该能看到前面定义的 `<h2>` 标签。

## 编写 UI Component

随着应用的发展，你会需要在多个页面分享 UI 元素 (或在一个页面使用多次)，在 dva 里你可以把这部分抽成 component 。

我们来编写一个 `ProductList` component，这样就能在不同的地方显示产品列表了。

新建 `components/ProductList.js` 文件：

```javascript
import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button } from 'antd';

const ProductList = ({ onDelete, products }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
      render(text, record) {
        return (
          <Popconfirm title="Delete?" onConfirm={onDelete.bind(this, record.id)}>
            <Button>删除</Button>
          </Popconfirm>
        );
      },
    },
  ];
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

## 定义 Model

完成 UI 后，现在开始处理数据和逻辑。

dva 通过 model 的概念把一个领域的模型管理起来，包含同步更新 state 的 reducers，处理异步逻辑的 effects，订阅数据源的 subscriptions 。

新建 model `models/products.js` ：

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

这个 model 里：

- `namespace` 表示在全局 state 上的 key
- `state` 是初始值，在这里是空数组
- `reducers` 等同于 redux 里的 reducer，接收 action，同步更新 state

然后别忘记在 `index.js` 里载入他：

```diff
// 3. Model
+ app.model(require('./models/products'));
```

## connect 起来

到这里，我们已经单独完成了 model 和 component，那么他们如何串联起来呢?

dva 提供了 connect 方法。如果你熟悉 redux，这个 connect 就是 react-redux 的 connect 。

编辑 `routes/Products.js`，替换为以下内容：

```javascript
import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';

const Products = (props) => {

  function handleDelete(id) {
    props.dispatch({
      type: 'products/delete',
      payload: id,
    });
  }

  return (
    <div>
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete} products={props.products} />
    </div>
  );
};

// export default Products;
export default connect(({ products }) => ({
  products
}))(Products);
```

最后，我们还需要一些初始数据让这个应用 run 起来。编辑 `index.js`：

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

刷新浏览器，应该能看到以下效果：

<p style="text-align: center">
  <img src="https://zos.alipayobjects.com/rmsportal/GQJeDDeUCSTRMMg.gif" />
</p>

## 构建应用

完成开发并且在开发环境验证之后，就需要部署给我们的用户了。先执行下面的命令：

```bash
$ npm run build
```

几秒后，输出应该如下：

```bash
Child
    Time: 14008ms
         Asset       Size  Chunks             Chunk Names
    index.html  255 bytes          [emitted]
     common.js    1.18 kB       0  [emitted]  common
      index.js     504 kB    1, 0  [emitted]  index
     index.css     127 kB    1, 0  [emitted]  index
```

`build` 命令会打包所有的资源，包含 JavaScript, CSS, web fonts, images, html 等。然后你可以在 `dist/` 目录下找到这些文件。

## 下一步

我们已经完成了一个简单应用，你可能还有很多疑问，比如：

- 如何处理异步请求
- 如何优雅地加载初始数据
- 如何统一处理出错，以及特定操作的出错
- 如何动态加载路由和 Model，以加速页面载入速度
- 如何实现 hmr
- 如何 mock 数据
- 等等

你可以：

- 访问 [dva 官网](https://github.com/dvajs/dva)
- 查看所有 [API](https://github.com/dvajs/dva#api)
- [教程](https://github.com/dvajs/dva-docs/blob/master/v1/zh-cn/tutorial/01-%E6%A6%82%E8%A6%81.md)，一步步完成一个中型应用
- 看看 [dva 版 hackernews](https://github.com/dvajs/dva-hackernews) 是[如何实现](https://github.com/sorrycc/blog/issues/9)的
