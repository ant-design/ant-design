---
order: 7
title:
  zh-CN: 前缀
  en-US: Prefix
---

## zh-CN

在输入框上添加前缀图标。

## en-US

Add a prefix inside input.

```jsx
import { Form, InputNumber, Tooltip } from 'antd';
import { InfoCircleOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';

ReactDOM.render(
  <>
    <InputNumber prefix="￥" style={{ width: '100%' }} />
    <br />
    <br />
    <InputNumber addonBefore={<UserOutlined />} prefix="￥" style={{ width: '100%' }} />
    <br />
    <br />
    <InputNumber prefix="￥" disabled style={{ width: '100%' }} />
    <br />
    <br />
    <Form>
      <Form.Item label="Warning" hasFeedback validateStatus="warning">
        <InputNumber
          style={{ width: '100%' }}
          placeholder="Warning"
          id="warning"
          prefix={<SmileOutlined />}
        />
      </Form.Item>
    </Form>
  </>,
  mountNode,
);
```
