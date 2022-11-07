---
category: Components
subtitle: 面包屑
type: 导航
title: Breadcrumb
cover: https://gw.alipayobjects.com/zos/alicdn/9Ltop8JwH/Breadcrumb.svg
---

显示当前页面在系统层级结构中的位置，并能向上返回。

## 何时使用

- 当系统拥有超过两级以上的层级结构时；
- 当需要告知用户『你在哪里』时；
- 当需要向上导航的功能时。

### 4.24.0 用法升级

```__react
import Alert from '../alert';
ReactDOM.render(<Alert message="在 4.24.0 版本后，我们提供了 <Breadcrumb.Item menu={{ items: [...] }}> 的简写方式，有更好的性能和更方便的数据组织方式，开发者不再需要自行拼接 JSX。同时我们废弃了原先的写法，你还是可以在 4.x 继续使用，但会在控制台看到警告，并会在 5.0 后移除。" />, mountNode);
```

```jsx
// >=4.24.0 可用，推荐的写法 ✅
const items = [
  { label: '菜单项一', key: 'item-1' }, // 菜单项务必填写 key
  { label: '菜单项二', key: 'item-2' },
];
return (
  <Breadcrumb>
    <Breadcrumb.Item menu={{ items }}>Ant Design</Breadcrumb.Item>
  </Breadcrumb>
);

// <4.24.0 可用，>=4.24.0 时不推荐 🙅🏻‍♀️
const menu = (
  <Menu>
    <Menu.Item>菜单项一</Menu.Item>
    <Menu.Item>菜单项二</Menu.Item>
  </Menu>
);
return (
  <Breadcrumb>
    <Breadcrumb.Item overlay={menu}>Ant Design</Breadcrumb.Item>
  </Breadcrumb>
);
```

## API

### Breadcrumb

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| itemRender | 自定义链接函数，和 react-router 配置使用 | (route, params, routes, paths) => ReactNode | - |  |
| params | 路由的参数 | object | - |  |
| routes | router 的路由栈信息 | [routes\[\]](#routes) | - |  |
| separator | 分隔符自定义 | ReactNode | `/` |  |

### Breadcrumb.Item

| 参数          | 说明                     | 类型                               | 默认值 | 版本   |
| ------------- | ------------------------ | ---------------------------------- | ------ | ------ |
| className     | 自定义类名               | string                             | -      |        |
| dropdownProps | 弹出下拉菜单的自定义配置 | [Dropdown](/components/dropdown)   | -      |        |
| href          | 链接的目的地             | string                             | -      |        |
| menu          | 菜单配置项               | [MenuProps](/components/menu/#API) | -      | 4.24.0 |
| onClick       | 单击事件                 | (e:MouseEvent) => void             | -      |        |

### Breadcrumb.Separator

| 参数     | 说明           | 类型      | 默认值 | 版本 |
| -------- | -------------- | --------- | ------ | ---- |
| children | 要显示的分隔符 | ReactNode | `/`    |      |

> 注意：在使用 `Breadcrumb.Separator` 时，其父组件的分隔符必须设置为 `separator=""`，否则会出现父组件默认的分隔符。

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
