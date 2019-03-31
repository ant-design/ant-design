---
order: 8
title:
  zh-CN: 多彩徽标
  en-US: Colorful Badge
---

## zh-CN

我们添加了多种预设色彩的徽标样式，用作不同场景使用。如果预设值不能满足你的需求，可以设置为具体的色值。

## en-US

We preset a series of colorful Badge style for different situation usage.
And you can always set it to a hex color string for custom color.

````jsx
import { Badge } from 'antd';

ReactDOM.render(
  <div>
    <h4 style={{ marginBottom: 16 }}>Presets:</h4>
    <div>
      <Badge color="magenta" text="magenta" />
      <Badge color="red" text="red" />
      <Badge color="volcano" text="volcano" />
      <Badge color="orange" text="orange" />
      <Badge color="gold" text="gold" />
      <Badge color="lime" text="lime" />
      <Badge color="green" text="green" />
      <Badge color="cyan" text="cyan" />
      <Badge color="blue" text="blue" />
      <Badge color="geekblue" text="geekblue" />
      <Badge color="purple" text="purple" />
    </div>
    <h4 style={{ margin: '16px 0' }}>Custom:</h4>
    <div>
      <Badge color="#f50" text="#f50" />
      <Badge color="#2db7f5" text="#2db7f5" />
      <Badge color="#87d068" text="#87d068" />
      <Badge color="#108ee9" text="#108ee9" />
    </div>
  </div>,
  mountNode
);
````

````css
.ant-tag {
  margin-bottom: 8px;
}
````
