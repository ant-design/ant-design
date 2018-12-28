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
    <p>
      段落示意：随着商业化的趋势，越来越多的企业级产品对更好的用户体验有了进一步的要求。带着这样的一个终极目标，我们（蚂蚁金服体验技术部）经过大量的项目实践和总结，逐步打磨出一个服务于企业级产品的设计体系 Ant Design。基于『确定』和『自然』的设计价值观，通过模块化的解决方案，降低冗余的生产成本，让设计者专注于更好的用户体验。
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
.wrap {
  display: flex;
}
.content {
  flex: 1;
}
.extraContent {
  min-width: 240px;
  text-align: right;
}
.contentLink {
  padding-top: 16px;
}
.contentLink a {
  display: inline-block;
  vertical-align: text-top;
  margin-right: 32px;
}
.contentLink a img {
  margin-right: 8px;
}

</style>
