---
order: 25
title:
  zh-CN: 自定义状态
  en-US: Status
---

## zh-CN

使用 `status` 为添加状态。

## en-US

Add status with `status`.

```tsx
import { Select, Space, Form } from 'antd';

const Validation: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Select status="error" style={{ width: '100%' }} />
      <Select status="warning" style={{ width: '100%' }} />
      <Form.Item validateStatus="error" hasFeedback>
        <Select style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item validateStatus="warning" hasFeedback>
        <Select style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item validateStatus="success" hasFeedback>
        <Select style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item validateStatus="validating" hasFeedback>
        <Select style={{ width: '100%' }} />
      </Form.Item>
    </Space>
  );
};

ReactDOM.render(<Validation />, mountNode);
```
