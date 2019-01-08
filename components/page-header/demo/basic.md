---
order: 1
title:
  zh-CN: 标准样式
  en-US: Basic Page Header
---

## zh-CN

标准页头

## en-US

Basic Page Header

```jsx
import { PageHeader } from 'antd';

ReactDOM.render(
  <PageHeader
    onBack={() => window.history.back()}
    title="Title"
    subTitle="This is a subtitle"
  />,
  mountNode
);

```

<style>
.code-box-demo .ant-page-header {
  border: 1px solid rgb(235, 237, 240);
}
<style>
