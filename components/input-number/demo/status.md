---
order: 19
title:
  zh-CN: 自定义校验
  en-US: Customized Validation
---

## zh-CN

我们提供了 `validateStatus` `hasFeedback` 等属性，你可以自己义校验的时机和内容。

1. validateStatus: 校验状态，可选 `success`, `warning`, `error`, `validating`。
2. hasFeedback：用于给输入框添加反馈图标。

## en-US

We provide properties like `validateStatus` `hasFeedback` to customize your own validate status.

1. `validateStatus`: validate status which could be 'success', 'warning', 'error', 'validating'.
2. `hasFeedback`: display feed icon of input control.

```tsx
import { InputNumber, Space } from 'antd';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';

const ValidateInputs: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <InputNumber validateStatus="error" style={{ width: '100%' }} />
      <InputNumber
        validateStatus="warning"
        style={{ width: '100%' }}
        prefix={<ClockCircleOutlined />}
      />
    </Space>
  );
};

ReactDOM.render(<ValidateInputs />, mountNode);
```
