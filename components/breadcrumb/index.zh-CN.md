---
category: Components
subtitle: 面包屑
type: 导航
title: Breadcrumb
---

显示当前页面在系统层级结构中的位置，并能向上返回。

## 何时使用

- 当系统拥有超过两级以上的层级结构时；
- 当需要告知用户『你在哪里』时；
- 当需要向上导航的功能时。

## API

### Breadcrumb

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| itemRender | 自定义链接函数，和 react-router 配置使用 | (route, params, routes, paths) => ReactNode | - | 3.17.0 |
| params | 路由的参数 | object | - | 3.17.0 |
| routes | router 的路由栈信息 | [routes\[\]](#routes) | - | 3.17.0 |
| separator | 分隔符自定义 | string\|ReactNode | '/' | 3.17.0 |

### Breadcrumb.Item

| 参数      | 参数           | 类型                                   | 默认值 | 版本   |
| --------- | -------------- | -------------------------------------- | ------ | ------ |
| href      | 链接的目的地   | string                                 | -      | 3.17.0 |
| separator | 自定义的分隔符 | string\|ReactNode                      | '/'    | 3.17.0 |
| overlay   | 下拉菜单的内容 | [Menu](/components/menu) \| () => Menu | -      | 3.17.0 |
| onClick   | 单击事件       | (e:MouseEvent)=>void                   | -      | 3.17.0 |

### routes

```ts
interface Route {
  path: string;
  breadcrumbName: string;
  children: Array<{
    path: string;
    breadcrumbName: string;
  }>;
}
```

### 和 browserHistory 配合

和 react-router 一起使用时，默认生成的 url 路径是带有 `#` 的，如果和 browserHistory 一起使用的话，你可以使用 `itemRender` 属性定义面包屑链接。

```jsx
import { Link } from 'react-router';

const routes = [
  {
    path: 'index',
    breadcrumbName: 'home',
  },
  {
    path: 'first',
    breadcrumbName: 'first',
    children: [
      {
        path: '/general',
        breadcrumbName: 'General',
      },
      {
        path: '/layout',
        breadcrumbName: 'Layout',
      },
      {
        path: '/navigation',
        breadcrumbName: 'Navigation',
      },
    ],
  },
  {
    path: 'second',
    breadcrumbName: 'second',
  },
];

function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
  );
}

return <Breadcrumb itemRender={itemRender} routes={routes} />;
```
