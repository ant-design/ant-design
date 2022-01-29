---
order: 16
title:
  zh-CN: 自定义状态
  en-US: Status
---

## zh-CN

使用 `status` 为添加状态。

## en-US

Add status to with `status`.

```tsx
import { Cascader, Space, Form } from 'antd';

const Validation: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Cascader status="error" style={{ width: '100%' }} />
    <Cascader status="warning" style={{ width: '100%' }} />
    <Form.Item status="error" hasFeedback help="Something wrong.">
      <Cascader style={{ width: '100%' }} />
    </Form.Item>
    <Form.Item status="warning" hasFeedback help="Please check.">
      <Cascader style={{ width: '100%' }} />
    </Form.Item>
    <Form.Item status="success" hasFeedback>
      <Cascader style={{ width: '100%' }} />
    </Form.Item>
    <Form.Item status="validating" hasFeedback>
      <Cascader style={{ width: '100%' }} />
    </Form.Item>
  </Space>
);

ReactDOM.render(<Validation />, mountNode);
```
