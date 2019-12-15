---
order: 3
title:
  zh-CN: 标签选填
  en-US: Form LabelOptional
---

## zh-CN

标签选填

## en-US

There is LabelOptional for form: `true`, `false`.

```tsx
import { Form, Input, Button } from 'antd';

const FormLabelOptionalDemo = () => {
  return (
    <div>
      <Form layout="vertical" labelSelectiveFilling>
        <Form.Item label="Field A" rules={[{ required: true }]}>
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Field B">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

ReactDOM.render(<FormLabelOptionalDemo />, mountNode);
```
