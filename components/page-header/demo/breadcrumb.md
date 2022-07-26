---
order: 3
title:
  zh-CN: 带面包屑页头
  en-US: Use with breadcrumbs
---

## zh-CN

带面包屑页头，适合层级比较深的页面，让用户可以快速导航。

## en-US

With breadcrumbs, it is suitable for deeper pages, allowing users to navigate quickly.

```tsx
import { PageHeader } from 'antd';
import React from 'react';

const routes = [
  {
    path: 'index',
    breadcrumbName: 'First-level Menu',
  },
  {
    path: 'first',
    breadcrumbName: 'Second-level Menu',
  },
  {
    path: 'second',
    breadcrumbName: 'Third-level Menu',
  },
];

const App: React.FC = () => (
  <PageHeader
    className="site-page-header"
    title="Title"
    breadcrumb={{ routes }}
    subTitle="This is a subtitle"
  />
);

export default App;
```
