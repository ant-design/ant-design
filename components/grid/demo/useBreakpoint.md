---
order: 10
title: useBreakpoint Hook
---

## zh-CN

使用 `useBreakpoint` Hook 个性化布局。

## en-US

Use `useBreakpoint` Hook povide personalized layout.

```jsx
import { Row, Col, Grid } from 'antd';

const { useBreakpoint } = Grid;

function UseBreakpointDemo() {
  const screens = useBreakpoint();

  return (
    <Row>
      <Col>
        Current break point:&nbsp;
        {Object.entries(screens)
          .filter(screen => !!screen[1])
          .map(screen => screen[0])
          .join(' ')}
      </Col>
    </Row>
  );
}

ReactDOM.render(<UseBreakpointDemo />, mountNode);
```
