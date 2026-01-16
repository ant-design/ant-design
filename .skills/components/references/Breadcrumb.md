# Breadcrumb — 面包屑

## 功能概述

显示当前页面在系统层级结构中的位置，并能向上返回。

## 应用场景

- 当系统拥有超过两级以上的层级结构时；。
- 当需要告知用户『你在哪里』时；。
- 当需要向上导航的功能时。

## 输入字段

### Breadcrumb 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `dropdownIcon`: ReactNode，自定义下拉图标，默认 `<DownOutlined />`，版本 6.2.0。
- `itemRender`: (route, params, routes, paths) => ReactNode，自定义链接函数，和 react-router 配置使用。
- `params`: object，路由的参数。
- `items`: [items\[\]](#itemtype)，路由栈信息，版本 5.3.0。
- `separator`: ReactNode，分隔符自定义，默认 `/`。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。

### RouteItemType 属性

#### 必填

- 无必填属性。

#### 可选

- `className`: string，自定义类名。
- `dropdownProps`: [Dropdown](/components/dropdown-cn)，弹出下拉菜单的自定义配置。
- `href`: string，链接的目的地，不能和 `path` 共用。
- `path`: string，拼接路径，每一层都会拼接前一个 `path` 信息。不能和 `href` 共用。
- `menu`: [MenuProps](/components/menu-cn/#api)，菜单配置项，版本 4.24.0。
- `onClick`: (e:MouseEvent) => void，单击事件。
- `title`: ReactNode，名称，版本 5.3.0。

### SeparatorType 属性

#### 必填

- 无必填属性。

#### 可选

- `type`: `separator`，标记为分隔符，版本 5.3.0。
- `separator`: ReactNode，要显示的分隔符，默认 `/`，版本 5.3.0。

## 方法

无公开方法。

## 使用建议

所有子页面都应有面包屑；首页作为第一项；当前页无链接；配合路由使用 itemRender。

## 示例代码

```tsx
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const App: React.FC = () => (
  <>
    <Breadcrumb
      items={[
        { title: 'Home' },
        { title: 'Application Center', href: '' },
        { title: 'Application List', href: '' },
        { title: 'An Application' },
      ]}
    />

    <Breadcrumb
      items={[
        { href: '', title: <HomeOutlined /> },
        {
          href: '',
          title: (
            <>
              <UserOutlined />
              <span>Application List</span>
            </>
          ),
        },
        { title: 'Application' },
      ]}
    />

    <Breadcrumb
      items={[
        { title: 'Ant Design' },
        {
          title: 'Component',
          menu: {
            items: [
              { key: '1', label: <a href="">General</a> },
              { key: '2', label: <a href="">Layout</a> },
              { key: '3', label: <a href="">Navigation</a> },
            ],
          },
        },
        { title: 'Button' },
      ]}
    />

    <Breadcrumb
      separator=">"
      items={[{ title: 'Home' }, { title: 'Application Center' }, { title: 'Application List' }]}
    />

    <Breadcrumb
      itemRender={(route, params, routes, paths) => {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? <span>{route.title}</span> : <Link to={route.path!}>{route.title}</Link>;
      }}
      items={[
        { path: '/', title: 'Home' },
        { path: '/apps', title: 'Application List' },
        { title: 'An Application' },
      ]}
    />
  </>
);
```

## 返回结果

渲染一个面包屑导航，用于展示层级位置。
