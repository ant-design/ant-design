---
order: 5
title:
  zh-CN: 复杂的例子
  en-US: Complex example
---

## zh-CN

使用操作区，并自定义子节点

## en-US

Use the action area and customize the child nodes

```jsx
import { PageHeader, Tag, Tabs, Button, Row, Col } from 'antd';

const TabPane = Tabs.TabPane;

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
    <Description term="创建人">曲丽丽</Description>
    <Description term="关联单据">
      <a>421421</a>
    </Description>
    <Description term="创建时间">2017-01-10</Description>
    <Description term="生效日期">2017-10-10</Description>
    <Description term="单据备注" span={24}>
      浙江省杭州市西湖区工专路
    </Description>
  </Row>
);

const extraContent = (
  <Row>
    <Col span={12}>
      <span className="label">状态</span>
      <p className="detail">待审批</p>
    </Col>
    <Col span={12}>
      <span className="label"> 订单价格</span>
      <p className="detail">¥ 568.08</p>
    </Col>
  </Row>
);

ReactDOM.render(
  <PageHeader
    onBack={() => window.history.back()}
    title="页面标题"
    subTitle="这是一个附属标题"
    tags={<Tag color="red">警告</Tag>}
    extra={[
      <Button key="3">次操作</Button>,
      <Button key="2">次操作</Button>,
      <Button key="1" type="primary">
        主操作
      </Button>,
    ]}
    footer={
      <Tabs defaultActiveKey="1">
        <TabPane tab="详情" key="1" />
        <TabPane tab="规则" key="2" />
      </Tabs>
    }
  >
    <div className="wrap">
      <div className="content padding">{content}</div>
      <div className="extraContent">{extraContent}</div>
    </div>
  </PageHeader>,
  mountNode
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
#components-page-header-demo-actions .extraContent .label {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 22px;
}
#components-page-header-demo-actions .extraContent .label {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 22px;
}
#components-page-header-demo-actions .extraContent .detail {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 28px;
}
</style>
