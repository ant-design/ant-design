---
order: 3
title:
  zh-CN: 带面包屑页头
  en-US: Breadcrumb Page Header
---

## zh-CN

与面包屑一起使用

## en-US

Breadcrumb Page Header

```jsx
import { PageHeader } from 'antd';

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
    <p>
      Ant Design interprets the color system into two levels: a system-level
      color system and a product-level color system.
    </p>
    <p>
      Ant Design&#x27;s design team preferred to design with the HSB color model,
      which makes it easier for designers to have a clear psychological
      expectation of color when adjusting colors, as well as facilitate
      communication in teams.
    </p>
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
#components-page-header-demo-content .content p {
  margin-bottom: 8px;
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
#components-page-header-demo-content .content.padding {
  padding-left: 40px;
}
#components-page-header-demo-content .content .description {
  display: table;
}
#components-page-header-demo-content .description .term {
  display: table-cell;
  margin-right: 8px;
  padding-bottom: 8px;
  white-space: nowrap;
  line-height: 20px;
}
#components-page-header-demo-content .description .term:after {
  position: relative;
  top: -0.5px;
  margin: 0 8px 0 2px;
  content: ":";
}
#components-page-header-demo-content .description .detail {
  display: table-cell;
  padding-bottom: 8px;
  width: 100%;
  line-height: 20px;
}
#components-page-header-demo-content .extraContent .label {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 22px;
}
#components-page-header-demo-content .extraContent .label {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 22px;
}
#components-page-header-demo-content .extraContent .detail {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 28px;
}
</style>
