---
order: 3
title:
  zh-CN: 自动切换
  en-US: Scroll automatically
---

## zh-CN

定时切换下一张。

## en-US

Timing of scrolling to the next card/picture.

```jsx
import { Switch, Carousel } from 'antd';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const AutoplayCarouselDemo = () => {
  const [autoplay, setAutoplay] = React.useState(true);

  const handleAutoplayChange = value => {
    setAutoplay(value);
  };

  return (
    <>
      <Switch
        checked={autoplay}
        onChange={handleAutoplayChange}
        style={{ marginBottom: 8 }}
      ></Switch>
      <Carousel autoplay={autoplay}>
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
      </Carousel>
    </>
  );
};

ReactDOM.render(<AutoplayCarouselDemo />, mountNode);
```
