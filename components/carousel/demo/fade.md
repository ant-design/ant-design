---
order: 3
title:
  zh-CN: 渐显
  en-US: Fade in
---

## zh-CN

切换效果为渐显。

## en-US

Slides use fade for transition.

```jsx
import { Carousel } from '@allenai/varnish';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

ReactDOM.render(
  <Carousel effect="fade">
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>,
  mountNode,
);
```
