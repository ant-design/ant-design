---
order: 8
title:
  zh-CN: 多彩徽标
  en-US: Colorful Badge
---

## zh-CN

3.16.0 后新增。我们添加了多种预设色彩的徽标样式，用作不同场景使用。如果预设值不能满足你的需求，可以设置为具体的色值。

## en-US

New feature after 3.16.0. We preset a series of colorful Badge styles for use in different situations. You can also set it to a hex color string for custom color.

```jsx
import { Badge } from 'antd';

const colors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];

ReactDOM.render(
  <div>
    <h4 style={{ marginBottom: 16 }}>Presets:</h4>
    <div>
      {colors.map(color => (
        <div key={color}>
          <Badge color={color} text={color} />
        </div>
      ))}
    </div>
    <h4 style={{ margin: '16px 0' }}>Custom:</h4>
    <div>
      <Badge color="#f50" text="#f50" />
      <br />
      <Badge color="#2db7f5" text="#2db7f5" />
      <br />
      <Badge color="#87d068" text="#87d068" />
      <br />
      <Badge color="#108ee9" text="#108ee9" />
    </div>
  </div>,
  mountNode,
);
```

```css
.ant-tag {
  margin-bottom: 8px;
}
```
