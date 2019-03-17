---
order: 2
title:
  zh-CN: 标题与段落
  en-US: Title and Paragraph
debug: true
---

## zh-CN

展示标题与段落的组合。

## en-US

Display the title and paragraph.

```jsx
import { Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

ReactDOM.render(
  <div>
    <Title>Introduction</Title>
    <Paragraph>
      In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of development.
    </Paragraph>
    <Paragraph>
      After massive project practice and summaries, Ant Design, a design language for background applications, is refined by Ant UED Team, which aims to <Text strong>uniform the user interface specs for internal background projects, lower the unnecessary cost of design differences and implementation and liberate the resources of design and front-end development</Text>.
    </Paragraph>
    <Title level={2}>Guidelines and Resources</Title>
    <Paragraph>
      We supply a series of design principles, practical patterns and high quality design resources (<Text code>Sketch</Text> and <Text code>Axure</Text>), to help people create their product prototypes beautifully and efficiently.
    </Paragraph>

    <Paragraph>
      <ul>
        <li><a href="/docs/spec/proximity">Principles</a></li>
        <li><a href="/docs/pattern/navigation">Patterns</a></li>
        <li><a href="/docs/resource/download">Resource Download</a></li>
      </ul>
    </Paragraph>

    <Title>Introduction</Title>
    <Paragraph>
      With the trend of technology incorporating into our daily lives products now have the users experience as a primary focus.
      The ultimate goal of Ant Design is to improve the user experience. Ant Design has gradually polished out a design system for enterprise-level products. Ant Design is based on <Text mark>fluid and natural</Text> design values, base on modular design patterns, with the goal of reducing redundant design costs, allowing designers to focus on a <Text strong>better user experience</Text>.
    </Paragraph>
    <Title level={2}>Design resources</Title>
    <Paragraph>
      We provide comprehensive design principles, best practices, and design resource documentation (<Text code>Sketch</Text> and <Text code>Axure</Text>)，to help the business quickly design high quality product prototypes.
    </Paragraph>

    <Paragraph>
      <ul>
        <li><a href="/docs/spec/proximity">Design Principles</a></li>
        <li><a href="/docs/pattern/navigation">Design Patterns</a></li>
        <li><a href="/docs/resource/download">Design Resources</a></li>
      </ul>
    </Paragraph>
  </div>,
  mountNode
);
```
