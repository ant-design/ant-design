---
order: 8
title:
  zh-CN: 多彩徽标
  en-US: Colorful Badge
---

## zh-CN

我们添加了多种预设色彩的徽标样式，用作不同场景使用。如果预设值不能满足你的需求，可以设置为具体的色值。

## en-US

We preset a series of colorful Badge styles for use in different situations. You can also set it to a hex color string for custom color.

```jsx
import { Badge, Divider } from 'antd';

const colors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'deepblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];

ReactDOM.render(
  <>
    <Divider orientation="left">Presets</Divider>
    <div>
      {colors.map(color => (
        <div key={color}>
          <Badge color={color} text={color} />
        </div>
      ))}
    </div>
    <Divider orientation="left">Custom</Divider>
    <div>
      <Badge color="#f50" text="#f50" />
      <br />
      <Badge color="#2db7f5" text="#2db7f5" />
      <br />
      <Badge color="#87d068" text="#87d068" />
      <br />
      <Badge color="#108ee9" text="#108ee9" />
    </div>
  </>,
  mountNode,
);
```

```css
.ant-tag {
  margin-bottom: 8px;
}
```
