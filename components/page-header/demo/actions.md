---
order: 4
title:
  zh-CN: 组合起来的例子
  en-US: Compose example
---

## zh-CN

使用操作区，并自定义子节点，适合使用在需要展示一些复杂的信息，帮助用户快速了解这个页面的信息和操作。

## en-US

Use the operating area and customize the sub-nodes, suitable for use in the need to display some complex information to help users quickly understand the information and operations of this page.

```jsx
import { PageHeader, Tag, Button, Statistic, Descriptions } from 'antd';

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
    >
      <Descriptions size="small" column={3}>
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
    </PageHeader>
    <br />
    <PageHeader
      onBack={() => window.history.back()}
      title="Title"
      tags={<Tag color="blue">Running</Tag>}
      subTitle="This is a subtitle"
      extra={[
        <Button key="3">Operation</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">
          Primary
        </Button>,
      ]}
    >
      <div
        style={{
          display: 'flex',
        }}
      >
        <Statistic title="Status" value="Pending" />
        <Statistic
          title="Price"
          prefix="$"
          value={568.08}
          style={{
            margin: '0 32px',
          }}
        />
        <Statistic title="Balance" prefix="$" value={3345.08} />
      </div>
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
