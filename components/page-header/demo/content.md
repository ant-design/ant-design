---
order: 3
title:
  zh-CN: 带内容的例子
  en-US: Example with content
---

## zh-CN

带内容的例子,可以优先展示页面的主要信息。

## en-US

An example with content that gives priority to the main information of the page.

```jsx
import { PageHeader,Typography } from 'antd';

const { Paragraph } = Typography;

const routes = [
  {
    path: 'index',
    breadcrumbName: 'First-level Menu',
  },
  {
    path: 'first',
    breadcrumbName: 'Second-level Menu',
  },
  {
    path: 'second',
    breadcrumbName: 'Third-level Menu',
  },
];

const content = (
  <div className="content">
    <Paragraph>

      Ant Design interprets the color system into two levels: a system-level
      color system and a product-level color system.
    </Paragraph>
    <Paragraph>
      Ant Design&#x27;s design team preferred to design with the HSB color model,
      which makes it easier for designers to have a clear psychological
      expectation of color when adjusting colors, as well as facilitate
      communication in teams.
    </Paragraph>
    <p className="contentLink">
      <a>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
          alt="start"
        />
        Quick Start
      </a>
      <a>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
          alt="info"
        />
        Product Info
      </a>
      <a>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
          alt="doc"
        />
        Product Doc
      </a>
    </p>
  </div>
);

const extraContent = (
  <img
    src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
    alt="content"
  />
);

ReactDOM.render(
  <PageHeader title="Title" breadcrumb={{ routes }}>
    <div className="wrap">
      <div className="content">{content}</div>
      <div className="extraContent">{extraContent}</div>
    </div>
  </PageHeader>,
  mountNode,
);
```

<style>
#components-page-header-demo-content .wrap {
  display: flex;
}
#components-page-header-demo-content .content {
  flex: 1;
}
#components-page-header-demo-content .extraContent {
  min-width: 240px;
  text-align: right;
}
#components-page-header-demo-content .contentLink {
  padding-top: 16px;
}
#components-page-header-demo-content .contentLink a {
  display: inline-block;
  vertical-align: text-top;
  margin-right: 32px;
}
#components-page-header-demo-content .contentLink a img {
  margin-right: 8px;
}
</style>
