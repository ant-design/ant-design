---
order: 8
title:
  zh-CN: 多彩文字提示
  en-US: Colorful Tooltip
---

## zh-CN

我们添加了多种预设色彩的文字提示样式，用作不同场景使用。

## en-US

We preset a series of colorful Tooltip styles for use in different situations.

```jsx
import { Tooltip, Button, Divider } from 'antd';

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
const customColors = ['#f50', '#2db7f5', '#87d068', '#108ee9'];

ReactDOM.render(
  <>
    <Divider orientation="left">Presets</Divider>
    <div>
      {colors.map(color => (
        <Tooltip title="prompt text" color={color} key={color}>
          <Button>{color}</Button>
        </Tooltip>
      ))}
    </div>
    <Divider orientation="left">Custom</Divider>
    <div>
      {customColors.map(color => (
        <Tooltip title="prompt text" color={color} key={color}>
          <Button>{color}</Button>
        </Tooltip>
      ))}
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
