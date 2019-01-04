---
order: 2
title:
  zh-CN: 带面包屑页头
  en-US: Use with breadcrumbs
---

## zh-CN

带面包屑页头

## en-US

Use with breadcrumbs

```jsx
import { PageHeader } from 'antd';

const routes = [
  {
    path: 'index',
    breadcrumbName: '一级菜单',
  },
  {
    path: 'first',
    breadcrumbName: '二级菜单',
  },
  {
    path: 'second',
    breadcrumbName: '三级菜单',
  },
];

ReactDOM.render(
  <PageHeader
    onBack={() => window.history.back()}
    title="页面标题"
    breadcrumb={{ routes }}
  />,
  mountNode
);

```
