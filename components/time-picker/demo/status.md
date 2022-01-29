---
order: 19
title:
  zh-CN: 自定义状态
  en-US: Status
---

## zh-CN

使用 `status` 为 TimePicker 添加状态。

## en-US

Add status to TimePicker with `status`.

```tsx
import { TimePicker, Space, Form } from 'antd';

const Validation: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <TimePicker status="error" style={{ width: '100%' }} />
    <TimePicker status="warning" style={{ width: '100%' }} />
    <Form.Item status="error" hasFeedback>
      <TimePicker style={{ width: '100%' }} />
    </Form.Item>
  </Space>
);

ReactDOM.render(<Validation />, mountNode);
```
