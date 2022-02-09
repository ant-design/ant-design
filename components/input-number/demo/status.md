---
order: 19
title:
  zh-CN: 自定义校验
  en-US: Customized Validation
---

## zh-CN

我们提供了 `status` `hasFeedback` 等属性，你可以自己义校验的时机和内容。

1. status: 校验状态，可选 `success`, `warning`, `error`, `validating`。
2. hasFeedback：用于给输入框添加反馈图标。

## en-US

We provide properties like `status` `hasFeedback` to customize your own validate status.

1. `status`: validate status which could be 'success', 'warning', 'error', 'validating'.
2. `hasFeedback`: display feed icon of input control.

```tsx
import { InputNumber, Space, Form } from 'antd';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';

const ValidateInputs: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <InputNumber status="error" style={{ width: '100%' }} />
    <InputNumber status="warning" style={{ width: '100%' }} prefix={<ClockCircleOutlined />} />
    <InputNumber addonBefore="Price" status="warning" style={{ width: '100%' }} />
    <Form.Item status="error" hasFeedback help="Error">
      <InputNumber allowClear style={{ width: '100%' }} />
    </Form.Item>
    <Form.Item status="warning" hasFeedback help="Warning">
      <InputNumber allowClear style={{ width: '100%' }} />
    </Form.Item>
    <Form.Item status="validating" hasFeedback help="Loading...">
      <InputNumber allowClear style={{ width: '100%' }} />
    </Form.Item>
    <Form.Item status="success" hasFeedback help="Success!">
      <InputNumber allowClear style={{ width: '100%' }} />
    </Form.Item>
  </Space>
);

ReactDOM.render(<ValidateInputs />, mountNode);
```
