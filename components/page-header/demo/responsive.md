---
order: 4
iframe: 240
title:
  zh-CN: 响应式
  en-US: responsive
---

## zh-CN

在不同大小的屏幕下，应该有不同的表现

## en-US

Under different screen sizes, there should be different performance

```jsx
import { PageHeader, Tabs, Button, Statistic, Descriptions } from 'antd';

const { TabPane } = Tabs;

const renderContent = (column = 2) => (
  <Descriptions size="small" column={column}>
    <Descriptions.item label="Created">Lili Qu</Descriptions.item>
    <Descriptions.item label="Association">
      <a>421421</a>
    </Descriptions.item>
    <Descriptions.item label="Creation Time">2017-01-10</Descriptions.item>
    <Descriptions.item label="Effective Time">2017-10-10</Descriptions.item>
    <Descriptions.item label="Remarks">
      Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
    </Descriptions.item>
  </Descriptions>
);

const extraContent = (
  <div
    style={{
      display: 'flex',
      width: 'max-content',
      justifyContent: 'flex-end',
    }}
  >
    <Statistic
      title="Status"
      value="Pending"
      style={{
        marginRight: 32,
      }}
    />
    <Statistic title="Price" prefix="$" value={568.08} />
  </div>
);

ReactDOM.render(
  <div>
    <PageHeader
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
      extraContent={extraContent}
      footer={
        <Tabs defaultActiveKey="1">
          <TabPane tab="Details" key="1" />
          <TabPane tab="Rule" key="2" />
        </Tabs>
      }
    >
      {renderContent()}
    </PageHeader>
  </div>,
  mountNode,
);
```

<style>
tr:last-child td {
  padding-bottom: 0;
}
</style>
