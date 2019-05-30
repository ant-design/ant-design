---
order: 5
title:
  zh-CN: 复杂的例子
  en-US: Complex example
---

## zh-CN

使用操作区，并自定义子节点，适合使用在需要展示一些复杂的信息，帮助用户快速了解这个页面的信息和操作。

## en-US

Use the operating area and customize the sub-nodes, suitable for use in the need to display some complex information to help users quickly understand the information and operations of this page.

```jsx
import { PageHeader, Tag, Tabs, Button, Statistic, Row, Col } from 'antd';

const { TabPane } = Tabs;

const Description = ({ term, children, span = 12 }) => (
  <Col span={span}>
    <div className="description">
      <div className="term">{term}</div>
      <div className="detail">{children}</div>
    </div>
  </Col>
);

const content = (
  <Row>
    <Description term="Created">Lili Qu</Description>
    <Description term="Association">
      <a>421421</a>
    </Description>
    <Description term="Creation Time">2017-01-10</Description>
    <Description term="Effective Time">2017-10-10</Description>
    <Description term="Remarks" span={24}>
      Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
    </Description>
  </Row>
);

const extraContent = (
  <Row>
    <Col span={12}>
      <Statistic title="Status" value="Pending" />
    </Col>
    <Col span={12}>
      <Statistic title="Price" prefix="$" value={568.08} />
    </Col>
  </Row>
);

ReactDOM.render(
  <PageHeader
    onBack={() => window.history.back()}
    title="Title"
    subTitle="This is a subtitle"
    tags={<Tag color="red">Warning</Tag>}
    extra={[
      <Button key="3">Operation</Button>,
      <Button key="2">Operation</Button>,
      <Button key="1" type="primary">
        Primary
      </Button>,
    ]}
    footer={
      <Tabs defaultActiveKey="1">
        <TabPane tab="Details" key="1" />
        <TabPane tab="Rule" key="2" />
      </Tabs>
    }
  >
    <div className="wrap">
      <div className="content padding">{content}</div>
      <div className="extraContent">{extraContent}</div>
    </div>
  </PageHeader>,
  mountNode,
);
```

<style>
#components-page-header-demo-actions .wrap {
  display: flex;
}
#components-page-header-demo-actions .content {
  flex: 1;
}
#components-page-header-demo-actions .extraContent {
  min-width: 240px;
  text-align: right;
}
#components-page-header-demo-actions .content.padding {
  padding-left: 40px;
}
#components-page-header-demo-actions .content .description {
  display: table;
}
#components-page-header-demo-actions .description .term {
  display: table-cell;
  margin-right: 8px;
  padding-bottom: 8px;
  white-space: nowrap;
  line-height: 20px;
}
#components-page-header-demo-actions .description .term:after {
  position: relative;
  top: -0.5px;
  margin: 0 8px 0 2px;
  content: ":";
}
#components-page-header-demo-actions .description .detail {
  display: table-cell;
  padding-bottom: 8px;
  width: 100%;
  line-height: 20px;
}
</style>
