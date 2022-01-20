---
order: 19
title:
  zh-CN: 自定义校验
  en-US: Customized Validation
---

## zh-CN

可以为 `Input` 添加各种校验状态

## en-US

You can blablabla

```tsx
import { Input, Space } from 'antd';

const ValidateInputs: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Input validateStatus="error" />
      <Input validateStatus="warning" />
      <Input validateStatus="error" hasFeedback />
      <Input validateStatus="warning" hasFeedback />
      <Input validateStatus="success" hasFeedback />
      <Input validateStatus="validating" hasFeedback />
    </Space>
  );
};

ReactDOM.render(<ValidateInputs />, mountNode);
```
