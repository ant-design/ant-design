---
category: Ant Design
order: 0
title: Introduction
---

<div style="text-align:center;margin:40px 0;">
  <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ">
</div>

Ant Financial has a large number of enterprise-level products. With complex scenarios, designers and developers often need to respond fast due to frequent changes in product demands and concurrent R & D workflow. Many similar contents exist in the process. Through abstraction, we could obtain some stable and highly reusable components and pages.

On the other hand, with the trend of commercialization, more and more enterprise products begin to pursue better user experiences. Under this situation, Ant User-Experience Design Team builds a design system for enterprise products based on four design values of Natural, Certain, Meaningful, and Growing. It aims to uniform the user interface specs and reduce redundancies and excessive production costs, helping product designers to focus on better user experience.

---

## Guidelines and Resources

We provide comprehensive design guidelines, best practices, resources, and tools to help designers produce high-quality product prototypes.

- [Design values](/docs/spec/values)
- [Design patterns](/docs/spec/overview)
- [Visualization](/docs/spec/visual)
- [Illustrations](/docs/spec/illustration)
- [Design resources](/docs/resources)
- [Sketch toolbox](http://kitchen.alipay.com/)
- [Articles](/docs/spec/article)

## Front-end Implementation

[React](http://facebook.github.io/react/) is used to encapsulate a library of components which embody our design language. We welcome the community to implement [our design system](/docs/spec/introduce) in other front-end frameworks of their choice.

```__react
import {
  ExportOutlined,
} from '@ant-design/icons';

const LinkIcon = () => (
  <ExportOutlined className="outside-link-icon" />
);

const LinksList = () => (
  <ul>
    <li>
      <a href="/docs/react/introduce" target="_blank">Ant Design of React </a>
      (official implementation)
    </li>
    <li>
      <a href="http://ng.ant.design" target="_blank">
        NG-ZORRO - Ant Design of Angular
      </a>
    </li>
    <li>
      <a href="http://ng.mobile.ant.design" target="_blank">
        NG-ZORRO-MOBILE - Ant Design Mobile of Angular
      </a>
    </li>
    <li>
      <a href="http://vue.ant.design" target="_blank">Ant Design of Vue</a>
    </li>
    <li>
      <a href="https://ant-design-blazor.github.io/" target="_blank">
        Ant Design Blazor
      </a>
    </li>
    <li>
      <a href="https://ecomfe.github.io/santd" target="_blank">
        San UI Toolkit for Ant Design
      </a>
    </li>
    <li>
      <a href="https://github.com/priornix/antizer" target="_blank">
        antizer (ClojureScript)
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
- [Introduction to Ant Design](https://blog.logrocket.com/introduction-to-ant-design/)
- [Build a React App with Ant Design Principles ](https://developer.okta.com/blog/2020/09/16/ant-design-react-app)
- [Meet Antd, an enterprise React UI library](https://medium.com/javascript-in-plain-english/antd-library-what-why-useful-or-not-5fec225b639d)

## How to Contribute

Contributions to Ant Design on Github are welcomed! Whether you have questions, concerns, or suggestions for improving Ant Design - please don't hesitate to reach out to us [here](https://github.com/ant-design/ant-design/issues).
