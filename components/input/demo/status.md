---
order: 19
title:
  zh-CN: 自定义状态
  en-US: Status
---

## zh-CN

使用 `status` 为 Input 添加状态。可选 `error` 或者 `warning`。

## en-US

Add status to Input with `status`, which could be `error` or `warning`。

```tsx
import { Input, Space } from 'antd';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';

const ValidateInputs: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Input status="error" />
    <Input status="warning" />
    <Input status="error" prefix={<ClockCircleOutlined />} />
    <Input status="warning" prefix={<ClockCircleOutlined />} />
    <Input.Password status="error" />
    <Input.Password status="warning" />
    <Input.Search status="error" />
    <Input.Search status="warning" />
    <Input.TextArea status="error" />
    <Input.TextArea status="warning" />
    <Input addonBefore="http://" allowClear status="error" />
    <Input addonBefore="http://" allowClear status="warning" />
  </Space>
);

ReactDOM.render(<ValidateInputs />, mountNode);
```
