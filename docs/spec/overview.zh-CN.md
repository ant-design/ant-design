---
category: 模式
order: 0
title: 概览
---

在企业级业务中使用设计模式，能大幅度提升研发团队的确定性，节约无谓的设计且保持系统一致性，让『设计者』把创造力专注在最需要的地方。

设计模式秉承 Ant Design 设计价值观，针对企业级产品中反复出现的设计问题给出一般解决方案。设计者可直接使用设计模式完成界面设计；也可以设计模式为起点，衍生出更具业务特性的解决方案满足个性化设计需求。

同时，这是一份动态更新的设计文档，你的阅读和反馈正是我们不断前进的动力，[GitHub 反馈地址](https://github.com/ant-design/ant-design/issues)。

## 信息框架

![结构图](https://gw.alipayobjects.com/zos/rmsportal/NyWYOFQxJYElAwtUfSdv.png)

完整的设计模式将会包含示例、模板、组件（ETC）三大实体部分，以及通用概念这样的黏合剂：

- **功能范例：** 由多张模板构成，启发用户如何使用和搭建出一个常见功能。
- **模板：** 页面级示例，启发用户如何通过组件搭建出系统中的典型页面，如：详情页。
- **组件**
  - 基础组件：构成系统最基础的元素，如按钮、分页器。
  - 业务组件/区块：区块级示例，一般由多个组件构成，如 PageHeader 通用页头；在技术实现上，可能是代码片段，也可能是组件，也可能是先代码片段后变成组件。
- **通用概念：**
  - Global Style：通过 Design Token 的方式控制视觉表达，比如：字体、颜色、圆角、阴影等。
  - Guide：一些保证 ETC 体系化的约定，如：排版、文案、Action Placement、必填选项。

## 资源

我们和工程师通力合作，将设计模式转换为可重用代码，最大程度提升你们的工作效率和沟通效率。

- [Ant Design Pro](https://pro.ant.design)：开箱即用的解决方案，包含 20+ 模板以及 10+ 业务组件
- [Ant Design Components](https://ant.design/docs/react/introduce)：Ant Design 的 React 实现，是风靡全球的组件库，包含 50+ 基础组件
- [Ant Design Library](http://library.ant.design/)：和代码配套 Axure 资源包，让你的原型精美得像视觉稿，包含模板、组件等元素
