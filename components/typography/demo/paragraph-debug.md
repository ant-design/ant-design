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

Warning: Typography.Title and Typography.Paragraph are not recommended for use. Unless you need to make the paragraph editable or ellipsis, we recommend you use standard dom elements; p for paragraph and h1...h6 for titles.

```jsx
import { Typography } from '@allenai/varnish';

const { Title, Paragraph, Text } = Typography;

ReactDOM.render(
  <>
    <Title>Introduction</Title>
    <Paragraph>
      In the process of internal desktop applications development, many different design specs and
      implementations would be involved, which might cause designers and developers difficulties and
      duplication and reduce the efficiency of development.
    </Paragraph>
    <Paragraph>
      After massive project practice and summaries,  Varnish, a design language for background
      applications, is refined by AI2, which aims to {' '}
      <Text strong>
        uniform the user interface specs for internal background projects, lower the unnecessary
        cost of design differences and implementation and liberate the resources of design and
        front-end development
      </Text>.
    </Paragraph>
    <Title level={2}>Guidelines and Resources</Title>
    <Paragraph>
      We supply a series of design principles, practical patterns and high quality design resources
      (<Text code>Sketch</Text> and <Text code>Axure</Text>), to help people create their product
      prototypes beautifully and efficiently.
    </Paragraph>

    <Paragraph>
      <ul>
        <li>
          <a href="/docs/spec/proximity">Principles</a>
        </li>
        <li>
          <a href="/docs/pattern/navigation">Patterns</a>
        </li>
        <li>
          <a href="/docs/resource/download">Resource Download</a>
        </li>
      </ul>
    </Paragraph>

    <Paragraph>
      <ul>
        <li>I am an unordered item</li>
        <li>
          I am an unordered item with an ordered sublist
          <ol>
            <li>I am ordered</li>
          </ol>
          <ul>
            <li>I am unordered</li>
          </ul>
        </li>
      </ul>
      <ol>
        <li>
          Ordered list item with unordered sublist
          <ul>
            <li>I am unordered!</li>
            <li>I am also unordered!</li>
          </ul>
        </li>
      </ol>
    </Paragraph>
  </>,
  mountNode,
);
```
