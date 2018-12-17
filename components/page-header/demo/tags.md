---
order: 1
title:
  zh-CN: 和 tag 一起使用
  en-US: Tag Page Header
---

## zh-CN

拥有 tag 的页头

## en-US

Page Header with tags

```jsx
import { PageHeader, Tag } from 'antd';

ReactDOM.render(<PageHeader title="页面标题" tags={<Tag color="red">警告</Tag>} />, mountNode);
```
