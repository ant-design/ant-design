---
order: 1
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
    <p>
      段落示意：蚂蚁金服务设计平台
      ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。
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
        <img src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" alt="info" />
        产品简介
      </a>
      <a>
        <img src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" alt="doc" />
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
  <PageHeader
    title="页面标题"
    extraContent={extraContent}
    breadcrumb={{ routes }}
    content={content}
  />,
  mountNode,
);
```

<style>
  .contentLink{
    padding-top:16px;
  }
  .contentLink a{
    display: inline-block;
    vertical-align: text-top;
    margin-right:32px;
  }
  .contentLink a img{
    margin-right:8px
  }
</style>
