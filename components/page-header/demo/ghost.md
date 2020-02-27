---
order: 2
title:
  zh-CN: 白底模式
  en-US: white background mode
---

## zh-CN

默认 PageHeader 是透明底色的。在某些情况下，PageHeader 需要自己的背景颜色。

## en-US

The default PageHeader is a transparent background. In some cases, PageHeader needs its own background color.

```jsx
import { PageHeader, Button, Descriptions } from 'antd';

ReactDOM.render(
  <div className="site-page-header-ghost-wrapper">
    <PageHeader
      ghost={false}
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

```css
.site-page-header-ghost-wrapper {
  background-color: #f5f5f5;
  padding: 24px;
}
```
