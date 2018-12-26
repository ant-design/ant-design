---
order: 5
title:
  zh-CN: 复杂的例子
  en-US: Basic Page Header
---

## zh-CN

使用操作区

## en-US

Basic Page Header

```jsx
import { PageHeader, Tag, Tabs, Button, Row, Col } from "antd";

const TabPane = Tabs.TabPane;

const Description = ({ term, children }) => (
  <Col span={12}>
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
    <Description term="单据备注">浙江省杭州市西湖区工专路</Description>
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
    title="页面标题"
    subTitle="解释一下标题"
    tags={<Tag color="red">警告</Tag>}
    extra={[
      <Button>次操作</Button>,
      <Button>次操作</Button>,
      <Button type="primary">主操作</Button>,
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
.content.padding {
  padding-left: 40px;
}
.content .description {
  display: table;
}
.description .term {
  display: table-cell;
  margin-right: 8px;
  padding-bottom: 8px;
  white-space: nowrap;
  line-height: 20px;
}
.description .term:after {
  position: relative;
  top: -0.5px;
  margin: 0 8px 0 2px;
  content: ":";
}
.description .detail {
  display: table-cell;
  padding-bottom: 8px;
  width: 100%;
  line-height: 20px;
}
.extraContent .label {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 22px;
}
.extraContent .label {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 22px;
}
.extraContent .detail {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 28px;
}
</style>