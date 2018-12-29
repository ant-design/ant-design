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
    breadcrumbName: '一级菜单',
  },
  {
    path: 'first',
    breadcrumbName: '二级菜单',
  },
  {
    path: 'second',
    breadcrumbName: '三级菜单',
  },
];

const content = (
  <div className="content">
    <p>Ant Design 将色彩体系解读成两个层面：系统级色彩体系和产品级色彩体系。</p>
    <p>
      Ant Design 的设计团队倾向于采用 HSB
      色彩模型进行设计，该模型更便于设计师在调整色彩时对于颜色有明确的心理预期，同时也方便团队间的沟通。
    </p>
    <p>
      Ant Design 的基础色板共计 120 个颜色，包含 12
      个主色以及衍生色。这些颜色基本可以满足中后台设计中对于颜色的需求
    </p>
    <p className="contentLink">
      <a>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
          alt="start"
        />
        快速开始
      </a>
      <a>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
          alt="info"
        />
        产品简介
      </a>
      <a>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
          alt="doc"
        />
        产品文档
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
  <PageHeader title="页面标题" breadcrumb={{ routes }}>
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
