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
  <Space direction="vertical">
    <TimePicker status="error" />
    <TimePicker status="warning" />
    <Form.Item status="error" hasFeedback>
      <TimePicker />
    </Form.Item>
  </Space>
);

ReactDOM.render(<Validation />, mountNode);
```
