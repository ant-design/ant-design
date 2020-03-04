---
order: 3
title: 项目实战
---

在真实项目开发中，你可能会需要 Redux 或者 MobX 这样的数据流方案，Ant Design React 作为一个 UI 库，可以和任何 React 生态圈内的数据流方案以及应用框架搭配使用。我们基于 Redux 推出了自己的最佳实践 dva，以及可插拔的企业级应用框架 umi，推荐你在项目中使用。

[dva](http://dvajs.com/) 是一个基于 Redux 的 轻量级数据流方案，概念来自 elm，支持 side effects、热替换、动态加载、react-native、SSR 等，已在生产环境广泛应用。

[umi](http://umijs.org/) 则是一个可插拔的企业级 react 应用框架。umi 以路由为基础的，支持[类 next.js 的约定式路由](https://umijs.org/zh/guide/router.html)，以及各种进阶的路由功能，并以此进行功能扩展，比如[支持路由级的按需加载](https://umijs.org/zh/plugin/umi-plugin-react.html#dynamicimport)。然后配以完善的[插件体系](https://umijs.org/zh/plugin/)，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求，同时提供 [Umi UI](https://umijs.org/zh/guide/umi-ui.html) 通过可视化辅助编程（VAP）提高开发体验和研发效率。

> 你可能也会对 [Ant Design Pro](https://pro.ant.design/) 感兴趣，这是一个基于 umi、dva 和 ant design 的开箱即用的中台前端/设计解决方案。

本文会引导你使用 Umi、dva 和 antd 从 0 开始创建一个简单应用。

## 安装 Umi

推荐使用 yarn 创建 Umi 脚手架，执行以下命令。

```bash
$ mkdir myapp && cd myapp
$ yarn create @umijs/umi-app
$ yarn
```

> 如果你使用 npm，可执行 `npx @umijs/create-umi-app`，效果一致。

## 安装插件集

执行以下命令，安装插件集（包括 antd、dva、国际化等常用插件）：

```bash
# 或 npm i @umijs/preset-react -D
$ yarn add @umijs/preset-react -D
```

> 插件默认使用 `"antd": "^4.0.0"`，如果要使用固定版本的 antd，你可以在项目里安装额外的 antd 依赖，`package.json` 里声明的 antd 依赖会被优先使用。

## 新建路由

我们要写个应用来先显示产品列表。首先第一步是创建路由，路由可以想象成是组成应用的不同页面。

然后通过命令创建 `/products` 路由，

```bash
$ npx umi g page products --typescript

Write: src/pages/products.tsx
Write: src/pages/products.css
```

在 `.umirc.ts` 中配置路由，如果有国际化需要，可以配置 `locale` 开启 antd 国际化：

```diff
import { defineConfig } from 'umi';

export default defineConfig({
+ locale: { antd: true },
  routes: [
    { path: '/', component: '@/pages/index' },
+   { path: '/products', component: '@/pages/products' },
  ],
});
```

运行 `yarn start` 然后在浏览器里打开 [http://localhost:8000/products](http://localhost:8000/products)，你应该能看到对应的页面。

## 编写 UI Component

随着应用的发展，你会需要在多个页面分享 UI 元素 (或在一个页面使用多次)，在 umi 里你可以把这部分抽成 component 。

我们来编写一个 `ProductList` component，这样就能在不同的地方显示产品列表了。

然后新建 `src/components/ProductList.tsx` 文件：

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

## 定义 dva Model

完成 UI 后，现在开始处理数据和逻辑。

dva 通过 `model` 的概念把一个领域的模型管理起来，包含同步更新 state 的 reducers，处理异步逻辑的 effects，订阅数据源的 subscriptions 。

新建 model `src/models/products.ts`，

```js
export default {
  namespace: 'products',
  state: [
    { name: 'dva', id: 'dva' },
    { name: 'antd', id: 'antd' },
  ],
  reducers: {
    delete(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
};
```

这个 model 里：

- `namespace` 表示在全局 state 上的 key
- `state` 是初始值，在这里是空数组
- `reducers` 等同于 redux 里的 reducer，接收 action，同步更新 state

umi 里约定 `src/models` 下的 model 会被自动注入，你无需手动注入。

## connect 起来

到这里，我们已经单独完成了 model 和 component，那么他们如何串联起来呢?

dva 提供了 `connect` 方法。如果你熟悉 redux，这个 connect 来自 react-redux。

编辑 `src/pages/products.tsx`，替换为以下内容：

```js
import { connect } from 'umi';
import ProductList from '@/components/ProductList';

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

执行启动命令：

```bash
$ yarn start
```

访问 [http://localhost:8000](http://localhost:8000/)，应该能看到以下效果：

<img src="https://gw.alipayobjects.com/zos/antfincdn/dPsy4tFHN3/umi.gif" />

## 构建应用

完成开发并且在开发环境验证之后，就需要部署给我们的用户了，执行以下命令：

```bash
$ yarn build
```

![](https://gw.alipayobjects.com/zos/antfincdn/Zd3f%242NdOK/b911d244-f1a5-4d61-adc5-3710cd86cd1b.png)

构建会打包所有的资源，包含 JavaScript, CSS, web fonts, images, html 等。你可以在 `dist/` 目录下找到这些文件。

## 下一步

我们已经完成了一个简单应用，你可能还有很多疑问，比如：

- 如何统一处理出错？
- 如何处理更多路由，比如动态路由，嵌套路由，权限路由等？
- 如何 mock 数据？
- 如何部署？
- 等等

你可以：

- 访问 [umi 官网](https://umijs.org/)和 [dva 官网](https://dvajs.com/)
- 理解 [umi 的路由](https://umijs.org/zh/guide/router.html)
- 理解 [如何部署 umi 应用](https://umijs.org/zh/guide/deploy.html)
- 查看 [dva 知识地图](https://dvajs.com/knowledgemap/)，包含 ES6, React, dva 等所有基础知识
- 理解 [dva 的 8 个概念](https://dvajs.com/guide/concepts.html)，以及他们是如何串起来的
