---
order: 6
title:
  zh-CN: Offset-Debug
  en-US: Offset-Debug
debug: true
---

## zh-CN

调试使用

## en-US

Debug Usage

```tsx
import { Avatar, Badge, Slider, Form } from 'antd';
import React from 'react';

const App: React.FC = () => {
  const [offset, setOffset] = React.useState<[number, number]>([10, 10]);

  return (
    <>
      <Form
        initialValues={{ x: 10, y: 10 }}
        onValuesChange={(_, { x, y }) => {
          setOffset([x, y]);
        }}
      >
        <Form.Item label="offsetX" name="x">
          <Slider min={-50} max={50} />
        </Form.Item>
        <Form.Item label="offsetY" name="y">
          <Slider min={-50} max={50} />
        </Form.Item>
      </Form>
      <Badge count={5} offset={offset}>
        <Avatar shape="square" size="large" />
      </Badge>
    </>
  );
};

export default App;
```
