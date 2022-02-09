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
import { Input, Space, Form, Select } from 'antd';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';

const ValidateInputs: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Input status="error" />
    <Input status="error" allowClear />
    <Input status="warning" prefix={<ClockCircleOutlined />} />
    <Input.Password status="error" />
    <Input.Search status="error" />
    <Input.TextArea status="error" />
    <Input addonBefore="http://" allowClear status="error" />
    <Form.Item status="success" hasFeedback help="OK!!">
      <Input />
    </Form.Item>
    <Form.Item status="warning" hasFeedback help="Something wrong.">
      <Input.Search />
    </Form.Item>
    <Form.Item status="error" hasFeedback help="Invalid">
      <Input addonBefore="http://" allowClear />
    </Form.Item>
    <Form.Item status="error" hasFeedback>
      <Input.Group compact>
        <Select defaultValue="+86">
          <Select.Option value="+86">+86</Select.Option>
        </Select>
        <Input style={{ width: '20%' }} defaultValue="18900001111" />
      </Input.Group>
    </Form.Item>
  </Space>
);

ReactDOM.render(<ValidateInputs />, mountNode);
```
