---
order: 20
title:
  zh-CN: FormAccess
  en-US: FormAccess
---

## zh-CN

`FormAcces` 目的在于表单组件的解耦，方便表单模块的复用，其可以看作是表单 `name` 字段的语法糖，此外创建了一个局部 Form Store，方便子组件内部进行模块化操作，无需关注前缀内容。

## en-US

`FormAcces' aims to decouple form components and facilitate the reuse of form modules.

```tsx
import React from 'react';
import { Form, Input, InputNumber, Typography } from 'antd';

const { FormAccess, useLocalForm, useFieldsValue, useFieldsChange } = Form;

const Child = () => {
  const [localForm, globalForm] = useLocalForm();

  console.log(localForm.getFieldValue('name') === globalForm.getFieldValue(['objA', 'name']));

  // 实时获取到表单项的值，能向上跨层级，方便解耦
  const [curName] = useFieldsValue<[string]>({
    names: ['name'],
  });
  console.log(curName);

  // 组件内于 onChange 相同，优点在于封装 hooks 时可与表单组件解耦合，方便多场景复用表单
  useFieldsChange(
    ([currentName, preName]) => {
      console.log(currentName, preName);
    },
    ['name'],
  );

  return (
    <>
      <Form.Item name="name" label="Name (Watch to trigger rerender)">
        <Input />
      </Form.Item>
      <Form.Item name="age" label="Age (Not Watch)">
        <InputNumber />
      </Form.Item>
    </>
  );
};

const Demo = () => {
  const [form] = Form.useForm<{ name: string; age: number }>();
  const nameValue = Form.useWatch('name', form);

  return (
    <>
      <Form form={form} layout="vertical" autoComplete="off">
        <FormAccess name="objA">
          <Child />
        </FormAccess>
      </Form>

      <Typography>
        <pre>Name Value: {nameValue}</pre>
      </Typography>
    </>
  );
};

export default Demo;
```
