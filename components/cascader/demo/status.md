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

const Validation: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Cascader status="error" style={{ width: '100%' }} />
      <Cascader status="warning" style={{ width: '100%' }} />
      <Form.Item validateStatus="error" hasFeedback>
        <Cascader style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item validateStatus="warning" hasFeedback>
        <Cascader style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item validateStatus="success" hasFeedback>
        <Cascader style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item validateStatus="validating" hasFeedback>
        <Cascader style={{ width: '100%' }} />
      </Form.Item>
    </Space>
  );
};

ReactDOM.render(<Validation />, mountNode);
```
