---
order: 1.1
title:
  zh-CN: 反色多彩标签
  en-US: Inverse Colorful Tag
debug: true
---

## zh-CN

内部反色标签

## en-US

Internal inverse color tag

```jsx
import { Tag, Divider } from 'antd';

ReactDOM.render(
  <>
    <Divider orientation="left">Presets Inverse</Divider>
    <div>
      <Tag color="magenta-inverse">magenta</Tag>
      <Tag color="red-inverse">red</Tag>
      <Tag color="volcano-inverse">volcano</Tag>
      <Tag color="orange-inverse">orange</Tag>
      <Tag color="gold-inverse">gold</Tag>
      <Tag color="lime-inverse">lime</Tag>
      <Tag color="green-inverse">green</Tag>
      <Tag color="cyan-inverse">cyan</Tag>
      <Tag color="blue-inverse">blue</Tag>
      <Tag color="geekblue-inverse">geekblue</Tag>
      <Tag color="purple-inverse">purple</Tag>
    </div>
  </>,
  mountNode,
);
```

<style>
.code-box-demo .ant-tag {
  margin-bottom: 8px;
}
<style>
