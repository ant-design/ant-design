---
category: Components
group: 导航
title: Breadcrumb
subtitle: 面包屑
description: 显示当前页面在系统层级结构中的位置，并能向上返回。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*I5a2Tpqs3y0AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Tr90QKrE_LcAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

- 当系统拥有超过两级以上的层级结构时；
- 当需要告知用户『你在哪里』时；
- 当需要向上导航的功能时。

## 代码演示 {#examples}

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/withIcon.tsx">带有图标的</code>
<code src="./demo/withParams.tsx">带有参数的</code>
<code src="./demo/separator.tsx">分隔符</code>
<code src="./demo/overlay.tsx">带下拉菜单的面包屑</code>
<code src="./demo/separator-component.tsx">独立的分隔符</code>
<code src="./demo/debug-routes.tsx">Debug Routes</code>
<code src="./demo/style-class.tsx" version="6.0.0">自定义语义结构的样式和类</code>
<code src="./demo/component-token.tsx" debug>组件 Token</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

### Breadcrumb

| 参数 | 说明 | 类型 | 默认值 | 版本 | [全局配置](/components/config-provider-cn#component-config) |
| --- | --- | --- | --- | --- | --- |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - | 6.0.0 | 6.0.0 |
| dropdownIcon | 自定义下拉图标 | ReactNode | `<DownOutlined />` | 6.2.0 | 6.2.0 |
| items | 路由栈信息（>=5.3.0 推荐使用，旧版请使用 `Breadcrumb.Item` 子组件方式） | [ItemType\[\]](#itemtype) | - | 5.3.0 | × |
| itemRender | 自定义链接函数，和 react-router 配合使用，详见[示例](#use-with-browserhistory) | (route, params, routes, paths) => ReactNode | - |  | × |
| params | 路由的参数 | object | - |  | × |
| separator | 分隔符自定义 | ReactNode | `/` |  | 6.0.0 |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - | 6.0.0 | 6.0.0 |

### ItemType

> type ItemType = Omit<[RouteItemType](#routeitemtype), 'title' | 'path'> | [SeparatorType](#separatortype)

### RouteItemType

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| className | 自定义类名 | string | - |  |
| dropdownProps | 弹出下拉菜单的自定义配置 | [Dropdown](/components/dropdown-cn) | - |  |
| href | 链接的目的地，不能和 `path` 共用 | string | - |  |
| path | 拼接路径，每一层都会拼接前一个 `path` 信息。不能和 `href` 共用 | string | - |  |
| menu | 菜单配置项 | [MenuProps](/components/menu-cn/#api) | - | 4.24.0 |
| onClick | 单击事件 | (e:MouseEvent) => void | - |  |
| title | 名称 | ReactNode | - | 5.3.0 |

### SeparatorType

```ts
const item = {
  type: 'separator', // Must have
  separator: '/',
};
```

| 参数      | 说明           | 类型        | 默认值 | 版本  |
| --------- | -------------- | ----------- | ------ | ----- |
| type      | 标记为分隔符   | `separator` |        | 5.3.0 |
| separator | 要显示的分隔符 | ReactNode   | `/`    | 5.3.0 |

### 和 browserHistory 配合 {#use-with-browserhistory}

和 react-router 一起使用时，默认生成的 url 路径是带有 `#` 的，如果和 browserHistory 一起使用的话，你可以使用 `itemRender` 属性定义面包屑链接。

```jsx
import { Link } from 'react-router';

const items = [
  {
    path: '/index',
    title: 'home',
  },
  {
    path: '/first',
    title: 'first',
    children: [
      {
        path: '/general',
        title: 'General',
      },
      {
        path: '/layout',
        title: 'Layout',
      },
      {
        path: '/navigation',
        title: 'Navigation',
      },
    ],
  },
  {
    path: '/second',
    title: 'second',
  },
];

function itemRender(currentRoute, params, items, paths) {
  const isLast = currentRoute?.path === items[items.length - 1]?.path;

  return isLast ? (
    <span>{currentRoute.title}</span>
  ) : (
    <Link to={`/${paths.join('/')}`}>{currentRoute.title}</Link>
  );
}

return <Breadcrumb itemRender={itemRender} items={items} />;
```

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## 主题变量（Design Token）{#design-token}

<ComponentTokenTable component="Breadcrumb"></ComponentTokenTable>
