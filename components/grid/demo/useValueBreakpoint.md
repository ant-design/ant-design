---
order: 11
title: useValueBreakpoint Hook
---

## zh-CN

使用 `useValueBreakpoint` 掛鉤可以提供靈活性和更易讀的個性化佈局。

## en-US

Use `useValueBreakpoint` Hook provide flexibility and more readable personalized layout.

```jsx
import { Grid, Row, Col } from 'antd';

const { useValueBreakpoint } = Grid;

function UseValueBreakpointDemo() {
  const { value } = useValueBreakpoint({
    xs: {
      colProps: {
        flex: 'auto',
      },
      description: 'I can use REGULAR BREAKPOINT in sm, md, lg, xl, xxl',
      status: 'current: FLEX',
    },
    sm: {
      colProps: {
        xs: 12,
      },
      description: 'I can use FLEX to fill the rest in xs breakpoint',
      status: 'current: REGULAR BREAKPOINT',
    },
  });

  return (
    <Row gutter={[10, 0]}>
      <Col {...value.colProps}>{value.status}</Col>
      <Col {...value.colProps}>{value.description}</Col>
    </Row>
  );
}

ReactDOM.render(<UseValueBreakpointDemo />, mountNode);
```
