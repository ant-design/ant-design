---
order: 98
title:
  zh-CN: 标题与段落 Debug
  en-US: Title and Paragraph Debug
debug: true
---

## zh-CN

展示标题与段落的组合。

## en-US

Display the title and paragraph.

```jsx
import { Typography } from 'antd';

const { Paragraph } = Typography;

ReactDOM.render(
  <Typography>
    <h1>Introduction</h1>
    <p>
      In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of development.
    </p>
    <p>
      After massive project practice and summaries, Ant Design, a design language for background applications, is refined by Ant UED Team, which aims to <strong>uniform the user interface specs for internal background projects, lower the unnecessary cost of design differences and implementation and liberate the resources of design and front-end development</strong>.
    </p>
    <h2>Guidelines and Resources</h2>
    <p>
      We supply a series of design principles, practical patterns and high quality design resources (<code>Sketch</code> and <code>Axure</code>), to help people create their product prototypes beautifully and efficiently.
    </p>

    <ul>
      <li><a href="/docs/spec/proximity">Principles</a></li>
      <li><a href="/docs/pattern/navigation">Patterns</a></li>
      <li><a href="/docs/resource/download">Resource Download</a></li>
    </ul>

    <h1>介绍</h1>
    <p>
      蚂蚁的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容。
    </p>
    <p>
      随着商业化的趋势，越来越多的企业级产品对更好的用户体验有了进一步的要求。带着这样的一个终极目标，我们（蚂蚁金服体验技术部）经过大量的项目实践和总结，逐步打磨出一个服务于企业级产品的设计体系 Ant Design。基于<mark>『确定』和『自然』</mark>的设计价值观，通过模块化的解决方案，降低冗余的生产成本，让设计者专注于<strong>更好的用户体验</strong>。
    </p>
    <h2>设计资源</h2>
    <p>
      我们提供完善的设计原则、最佳实践和设计资源文件（<code>Sketch</code> 和 <code>Axure</code>），来帮助业务快速设计出高质量的产品原型。
    </p>

    <ul>
      <li><a href="/docs/spec/proximity">设计原则</a></li>
      <li><a href="/docs/pattern/navigation">设计模式</a></li>
      <li><a href="/docs/resource/download">设计资源</a></li>
    </ul>

    <Paragraph className="good" style={{ background: 'red' }}>I am Paragraph component...</Paragraph>
  </Typography>,
  mountNode
);
```
