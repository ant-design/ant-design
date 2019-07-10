---
order: 1
title:
  zh-CN: 标准样式
  en-US: Basic Page Header
---

## zh-CN

标准页头，适合使用在需要简单描述的场景。

## en-US

Standard header, suitable for use in scenarios that require a brief description.

```jsx
import { PageHeader, Button } from 'antd';

ReactDOM.render(
  <PageHeader
    onBack={() => null}
    title="Title"
    subTitle="This is a subtitle"
    extra={[
      <Button key="3">Operation</Button>,
      <Button key="2">Operation</Button>,
      <Button key="1" type="primary">
        Primary
      </Button>,
    ]}
  />,
  mountNode,
);
```

<style>
.code-box-demo .ant-page-header {
  border: 1px solid rgb(235, 237, 240);
}
<style>
