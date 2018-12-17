---
order: 1
title:
  zh-CN: 带面包屑页头
  en-US: Breadcrumb Page Header
---

## zh-CN

与面包屑一起使用

## en-US

Breadcrumb Page Header

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
  <PageHeader title="页面标题" breadcrumb={{ routes }} subTitle="解释一下标题" />,
  mountNode,
);
```
