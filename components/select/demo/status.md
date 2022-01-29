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
      <Form.Item status="error" hasFeedback help="Something wrong.">
        <Select style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item status="warning" hasFeedback help="Please check.">
        <Select style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item status="success" hasFeedback>
        <Select style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item status="validating" hasFeedback>
        <Select style={{ width: '100%' }} />
      </Form.Item>
    </Space>
  );
};

ReactDOM.render(<Validation />, mountNode);
```

```css
#components-select-demo-status .ant-select {
  margin: 0;
}
```
