---
order: 17
title:
  zh-CN: 在函数组件中使用表单
  en-US: Form in Functional Component
---

## zh-CN

这是一个如何在函数组件中正常使用`wrappedComponentRef`的例子

## en-US

this is a demo that shows how you can use `wrappedComponentRef` in functional components

```jsx
import React, { createRef, forwardRef, useImperativeHandle, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

interface FCFormProps extends FormComponentProps {
  onSubmit: () => void;
}

type Ref = FormComponentProps;
const FCForm = forwardRef<Ref, FCFormProps>(({ form, onSubmit }, ref) => {
  useImperativeHandle(ref, () => ({
    form,
  }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>{form.getFieldDecorator('name')(<Input />)}</Form.Item>
      <Button htmlType="submit">submit</Button>
    </Form>
  );
});

const EnhancedFCForm = Form.create<FCFormProps>()(FCForm);

const TestForm = () => {
  const [name, setName] = useState();
  const formRef = createRef<Ref>();

  const handleSubmit = () => {
    const inputValue = formRef.current!.form.getFieldValue('name');
    setName(inputValue);
  }

  return (
    <div>
      <div>current value: {name}</div>
      <EnhancedFCForm onSubmit={handleSubmit} wrappedComponentRef={formRef} />
    </div>
  );
}

ReactDOM.render(<TestForm />, mountNode);
```
