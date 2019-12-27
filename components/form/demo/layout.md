---
order: 3
title:
  zh-CN: 表单布局
  en-US: Form Layout
---

## zh-CN

表单有三种布局。

## en-US

There are three layout for form: `horizontal`, `vertical`, `inline`.

```tsx
import { Form, Input, Button, Radio } from 'antd';

const FormLayoutDemo = () => {
  const [formLayout, setFormLayout] = React.useState('horizontal');

  const onFormLayoutChange = e => {
    setFormLayout(e.target.value);
  };

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;
  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
          wrapperCol: { span: 14, offset: 4 },
        }
      : null;

  return (
    <div>
      <Form layout={formLayout}>
        <Form.Item label="Form Layout" {...formItemLayout}>
          <Radio.Group defaultValue="horizontal" onChange={onFormLayoutChange}>
            <Radio.Button value="horizontal">Horizontal</Radio.Button>
            <Radio.Button value="vertical">Vertical</Radio.Button>
            <Radio.Button value="inline">Inline</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Field A" {...formItemLayout}>
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Field B" {...formItemLayout}>
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

ReactDOM.render(<FormLayoutDemo />, mountNode);
```
