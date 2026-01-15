# Breadcrumb — 面包屑

## 功能概述

显示当前页面在系统层级结构中的位置，并能向上返回。

## 输入字段

### 必填

- `items`: BreadcrumbItem[]，路由项配置数组。

### BreadcrumbItem 结构

```tsx
interface BreadcrumbItem {
  title: ReactNode; // 标题
  path?: string; // 路径（配合 itemRender 使用）
  href?: string; // 链接地址
  menu?: MenuProps; // 下拉菜单配置
  className?: string; // 类名
  dropdownProps?: DropdownProps; // Dropdown 属性
  onClick?: (e) => void; // 点击回调
}
```

### 可选

- `separator`: ReactNode，分隔符，默认 `/`。
- `itemRender`: (item, params, items, paths) => ReactNode，自定义渲染。
- `params`: object，路由参数。

## 使用建议

所有子页面都应有面包屑；首页作为第一项；当前页无链接；配合路由使用 itemRender。

## 示例代码

```tsx
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const App: React.FC = () => (
  <>
    {/* 基础用法 */}
    <Breadcrumb
      items={[
        { title: 'Home' },
        { title: 'Application Center', href: '' },
        { title: 'Application List', href: '' },
        { title: 'An Application' },
      ]}
    />

    {/* 带图标 */}
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

    {/* 带下拉菜单 */}
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

    {/* 自定义分隔符 */}
    <Breadcrumb
      separator=">"
      items={[{ title: 'Home' }, { title: 'Application Center' }, { title: 'Application List' }]}
    />

    {/* 配合 React Router */}
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
