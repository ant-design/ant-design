---
order: 6
title:
  zh-CN: 垂直
  en-US: Vertical
---

## zh-CN

垂直方向的 Slider。

## en-US

The vertical Slider.

```jsx
import { Slider } from 'antd';

const style = {
  display: 'inline-block',
  height: 300,
  marginLeft: 70,
};

const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50',
    },
    label: <strong>100°C</strong>,
  },
};

ReactDOM.render(
  <>
    <div style={style}>
      <Slider vertical defaultValue={30} />
    </div>
    <div style={style}>
      <Slider vertical range step={10} defaultValue={[20, 50]} />
    </div>
    <div style={style}>
      <Slider vertical range marks={marks} defaultValue={[26, 37]} />
    </div>
  </>,
  mountNode,
);
```
