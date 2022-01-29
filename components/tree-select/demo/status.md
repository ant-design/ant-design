---
order: 9
title:
  zh-CN: 自定义状态
  en-US: Status
---

## zh-CN

使用 `status` 为添加状态。

## en-US

Add status to with `status`.

```tsx
import { TreeSelect, Space, Form } from 'antd';

const Validation: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <TreeSelect status="error" style={{ width: '100%' }} />
      <TreeSelect status="warning" style={{ width: '100%' }} />
      <Form.Item validateStatus="error" hasFeedback help="Something wrong.">
        <TreeSelect style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item validateStatus="warning" hasFeedback help="Please check again.">
        <TreeSelect style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item validateStatus="success" hasFeedback>
        <TreeSelect style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item validateStatus="validating" hasFeedback>
        <TreeSelect style={{ width: '100%' }} />
      </Form.Item>
    </Space>
  );
};

ReactDOM.render(<Validation />, mountNode);
```
