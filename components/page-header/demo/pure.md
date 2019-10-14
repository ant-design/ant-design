---
order: 2
title:
  zh-CN: 纯净模式，没有白底
  en-US: Pure mode, no white background
---

## zh-CN

在某些情况下，pageHeader 不需要自己的背景颜色。

## en-US

In some cases, pageHeader does not require its own background color.

```jsx
import { PageHeader, Button, Descriptions } from 'antd';

ReactDOM.render(
  <div
    style={{
      backgroundColor: '#F5F5F5',
      padding: 24,
    }}
  >
    <PageHeader
      type="ghost"
      onBack={() => window.history.back()}
      title="Title"
      subTitle="This is a subtitle"
      extra={[
        <Button key="3">Operation</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">
          Primary
        </Button>,
      ]}
    >
      <Descriptions size="small" column={3}>
        <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
        <Descriptions.Item label="Association">
          <a>421421</a>
        </Descriptions.Item>
        <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
        <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
        <Descriptions.Item label="Remarks">
          Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  </div>,
  mountNode,
);
```

<style>
#components-page-header-demo-pure .code-box-demo .ant-page-header {
  border: 1px solid #ebedf0;
}
</style>
