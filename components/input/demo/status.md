---
order: 19
title:
  zh-CN: 自定义状态
  en-US: Status
---

## zh-CN

使用 `status` 为 Input 添加状态。

## en-US

Add status to Input with `status`.

```tsx
import { Input, Space } from 'antd';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';

const ValidateInputs: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Input status="error" />
      <Input status="warning" prefix={<ClockCircleOutlined />} />
      <Input.Password status="error" />
      <Input.Search status="error" />
      <Input.TextArea status="error" />
    </Space>
  );
};

ReactDOM.render(<ValidateInputs />, mountNode);
```
