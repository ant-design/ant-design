---
order: 19
title:
  zh-CN: 自定义状态
  en-US: Status
---

## zh-CN

使用 `status` 为 DatePicker 添加状态。

## en-US

Add status to DatePicker with `status`.

```tsx
import { DatePicker, Space, Form } from 'antd';

const Validation: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <DatePicker status="error" style={{ width: '100%' }} />
      <DatePicker status="warning" style={{ width: '100%' }} />
      <Form.Item status="error" hasFeedback>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
    </Space>
  );
};

ReactDOM.render(<Validation />, mountNode);
```
