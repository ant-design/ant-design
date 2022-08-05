---
order: 30
title:
  zh-CN: Form.Item与Input.Group InputNumber一起使用的示例
  en-US: Example of using Form.Item with Input.Group InputNumber
debug: true
---

## zh-CN

验证Form.Item设置hasFeedback属性后，Input.Group compact模式下InputNumber样式错乱问题

## en-US

After verifying that Form.Item sets the hasFeedback property, the InputNumber style is disordered in Input.Group compact mode

```tsx
import { Form, Input, InputNumber } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Form>
    <Form.Item>
      <Input.Group>
        <Input style={{ width: "30%" }} placeholder="Input" />
        <Input style={{ width: "70%" }} placeholder="Input" />
      </Input.Group>
    </Form.Item>
    <Form.Item>
      <Input.Group>
        <InputNumber style={{ width: "30%" }} placeholder="InputNumber" />
        <InputNumber style={{ width: "70%" }} placeholder="InputNumber" />
      </Input.Group>
    </Form.Item>
    <Form.Item>
      <Input.Group>
        <InputNumber style={{ width: "30%" }} placeholder="InputNumber" />
        <Input style={{ width: "70%" }} placeholder="Input" />
      </Input.Group>
    </Form.Item>
    <Form.Item hasFeedback validateStatus="success">
      <Input.Group>
        <InputNumber style={{ width: "30%" }} placeholder="hasFeedback InputNumber" />
        <Input style={{ width: "70%" }} placeholder="hasFeedback Input" />
      </Input.Group>
    </Form.Item>
    <Form.Item>
      <Input.Group compact>
        <InputNumber style={{ width: "30%" }} placeholder="compact InputNumber" />
        <Input style={{ width: "70%" }} placeholder="compact Input" />
      </Input.Group>
    </Form.Item>
    <Form.Item hasFeedback validateStatus="success">
      <Input.Group compact>
        <InputNumber style={{ width: "30%" }} placeholder="hasFeedback compact InputNumber" />
        <Input style={{ width: "70%" }} placeholder="hasFeedback compact Input" />
      </Input.Group>
    </Form.Item>
  </Form>
);

export default App;
```
