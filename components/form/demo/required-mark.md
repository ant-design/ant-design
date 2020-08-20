---
order: 3.1
title:
  zh-CN: 必选样式
  en-US: Required style
---

## zh-CN

通过 `requiredMarkType` 切换必选与可选样式。

## en-US

Switch required or optional style with `requiredMarkType`.

```tsx
import React, { useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';

const FormLayoutDemo = () => {
  const [form] = Form.useForm();
  const [requiredMarkType, setRequiredMarkType] = useState('required');

  const onRequiredTypeChange = ({ requiredMarkType }) => {
    setRequiredMarkType(requiredMarkType);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ requiredMarkType }}
      onValuesChange={onRequiredTypeChange}
      requiredMarkType={requiredMarkType}
    >
      <Form.Item label="Required Mark Type" name="requiredMarkType">
        <Radio.Group>
          <Radio.Button value="required">Required</Radio.Button>
          <Radio.Button value="optional">Optional</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Field A" required>
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Field B">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
};

ReactDOM.render(<FormLayoutDemo />, mountNode);
```
