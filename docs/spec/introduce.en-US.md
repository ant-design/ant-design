---
category: Ant Design
order: 0
title: Introduction
---

<div style="text-align:center;margin:40px 0;">
  <img width="600" src="https://gw.alipayobjects.com/zos/rmsportal/lcamFWetlMgLkLmDUgmZ.png">
</div>

In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of development. After massive project practice and summaries, Ant Design, a design language for background applications, is refined by Ant UED Team, which aims to uniform the user interface specs for internal background projects, lower the unnecessary cost of design differences and implementation and liberate the resources of design and front-end development.

Ant Design which is specially created for internal desktop applications, is committed to improving the experience of users and product designers. User interface designers and user experience designers, collectively, are considered as product designers, and the boundaries of product managers, interaction designers, visual designers, front-end developers and develop engineers are blurred. Taking advantage of unitary specifications, Ant Design makes design and prototype more simple and accessible for all project members, which comprehensively promotes experience and development efficiency of background applications and products.

---

## Guidelines and Resources

We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.

- [Principles](/docs/spec/proximity)
- [Patterns](/docs/pattern/navigation)
- [Resource Download](/docs/resource/download)

## Front-end Implementation

[React](http://facebook.github.io/react/) is used to encapsulate a library of components which embody our design language. We welcome the community to implement [our design system](https://ant.design/docs/spec/introduce) in other front-end frameworks of their choice.

```__react
import { Icon } from 'antd';

const LinkIcon = () => (
  <Icon type="export" className="outside-link-icon" />
);

const LinksList = () => (
  <ul>
    <li>
      <a href="/docs/react/introduce" target="_blank">Ant Design of React</a>
      (official implementation)
    </li>
    <li>
      <a href="http://ng.ant.design" target="_blank">
        NG-ZORRO - Ant Design of Angular<LinkIcon />
      </a>
    </li>
    <li>
      <a href="http://ng.mobile.ant.design" target="_blank">
        NG-ZORRO-MOBILE - Ant Design Mobile of Angular<LinkIcon />
      </a>
    </li>
    <li>
      <a href="http://vue.ant.design" target="_blank">Ant Design of Vue<LinkIcon /></a>
    </li>
    <li>
      <a href="https://github.com/FE-Driver/vue-beauty" target="_blank">
        vue-beauty (vue)<LinkIcon />
      </a>
    </li>
    <li>
      <a href="https://github.com/priornix/antizer" target="_blank">
        antizer (ClojureScript)<LinkIcon />
      </a>
    </li>
    <li>
      <a href="https://github.com/idcos/antd-ember" target="_blank">
        antd-ember<LinkIcon />
      </a>
    </li>
    <li>
      <a href="https://github.com/zzuu666/antue" target="_blank">
        antue (vue)<LinkIcon />
      </a>
    </li>
  </ul>
);

ReactDOM.render(<LinksList />, mountNode);
```

## Who's using Ant Design

- [Ant Financial](http://www.antgroup.com/index.htm?locale=en_US)
- [Alibaba](http://www.alibaba.com/)
- [Tencent](http://www.tencent.com)
- [Baidu](http://www.baidu.com)
- [Koubei](http://www.koubei.com/)
- [Meituan](http://www.meituan.com)
- [Didi](http://www.xiaojukeji.com/)
- [Eleme](https://www.ele.me/)
- [Other Users](https://github.com/ant-design/ant-design/issues/477)

> If your company or products use Ant Design, and you'd like to be added to this growing list, click [here](https://github.com/ant-design/ant-design/issues/477) to leave us a message.

## Words From Community

- Hacknews: [Show HN: Antd – A set of high-quality React components](https://news.ycombinator.com/item?id=13053137)
- Alligator: [Crafting Beautiful UIs in React Using Ant Design](https://alligator.io/react/beautiful-uis-ant-design/)
- Hackernoon: [Interesting JavaScript Libraries born in China](https://hackernoon.com/interesting-javascript-libraries-born-in-china-d50d1bb81355)

## How to Contribute

Contributions to Ant Design on Github are welcomed! Whether you have questions, concerns, or suggestions for improving Ant Design - please don't hesitate to reach out to us [here](https://github.com/ant-design/ant-design/issues).
