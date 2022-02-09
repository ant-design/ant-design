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
    <Form.Item status="success" hasFeedback>
      <Input />
    </Form.Item>
    <Form.Item status="warning" hasFeedback>
      <Input.Search />
    </Form.Item>
    <Form.Item status="error" hasFeedback>
      <Input addonBefore="http://" allowClear />
    </Form.Item>
    <Form.Item status="error" hasFeedback>
      <Input.Group compact>
        <Input addonBefore="http://" style={{ width: '20%' }} defaultValue="0571" />
        <Input style={{ width: '30%' }} defaultValue="26888888" />
        <Select defaultValue="Zhejiang">
          <Select.Option value="Zhejiang">Zhejiang</Select.Option>
          <Select.Option value="Jiangsu">Jiangsu</Select.Option>
        </Select>
      </Input.Group>
    </Form.Item>
  </Space>
);

ReactDOM.render(<ValidateInputs />, mountNode);
```
