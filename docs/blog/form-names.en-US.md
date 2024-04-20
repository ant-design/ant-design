---
title: Encapsulating Form.Item to Convert Arrays to Objects
date: 2024-04-17
author: crazyair
---

During the development of forms, there is occasionally a need to combine attributes. The fields displayed in the UI differ from the data structure fields returned by the backend. For example, when interfacing with the backend, the fields for province and city are often defined as two fields `{ province: Beijing, city: Haidian }`, rather than `{ province: [Beijing, Haidian] }`. We often need to handle these values in `initialValues` and `onFinish` as follows:

```tsx
import React from 'react';
import { Cascader, Form } from 'antd';

const data = { province: 'Beijing', city: 'Haidian' };
const options = [
  { value: 'zhejiang', label: 'Zhejiang', children: [{ value: 'hangzhou', label: 'Hangzhou' }] },
  { value: 'jiangsu', label: 'Jiangsu', children: [{ value: 'nanjing', label: 'Nanjing' }] },
];
const createUser = (values) => console.log(values);

const Demo = () => (
  <Form
    initialValues={{ province: [data.province, data.city] }}
    onFinish={(values) => {
      const { province, ...rest } = values;
      createUser({ province: province[0], city: province[1], ...rest });
    }}
  >
    <Form.Item label="Address" name="province">
      <Cascader options={options} placeholder="Please select" />
    </Form.Item>
  </Form>
);
export default Demo;
```

## Encapsulating Aggregate Field Components

When the form is simple, it's manageable, but if you encounter a `Form.List` scenario, you'll need to process values with `map`, which can become very complex. Therefore, we need to encapsulate an aggregate field component that allows a single `Form.Item` to handle multiple `name` properties, as follows:

```tsx
import React from 'react';
import type { FormItemProps } from 'antd';
import { Cascader, Form } from 'antd';

export const AggregateFormItem = (
  props: FormItemProps & { names?: FormItemProps<Record<string, any>>['name'][] },
) => {
  const form = Form.useFormInstance();

  const { names = [], rules = [], ...rest } = props;
  const [firstName, ...resetNames] = names;
  return (
    <>
      <Form.Item
        name={firstName}
        // Convert the values of names into an array for children
        getValueProps={() => ({ value: names.map((name) => form.getFieldValue(name)) })}
        getValueFromEvent={(values) => {
          // Set the values of the names fields to the form store
          form.setFields(names.map((name, index) => ({ name, value: values[index] })));
          return values[0];
        }}
        rules={rules.map((thisRule) => {
          if (typeof thisRule === 'object') {
            return {
              ...thisRule,
              transform: () => {
                // Set the values of the names fields to the rule value
                const values = names.map((name) => form.getFieldValue(name));
                return values;
              },
            };
          }
          return thisRule;
        })}
        {...rest}
      />
      {/* Bind additional fields so they can getFieldValue to get values and setFields to set values */}
      {resetNames.map((name) => (
        <Form.Item key={name?.toString()} name={name} noStyle />
      ))}
    </>
  );
};

const data = { province: 'Beijing', city: 'Haidian' };
const options = [
  { value: 'zhejiang', label: 'Zhejiang', children: [{ value: 'hangzhou', label: 'Hangzhou' }] },
  { value: 'jiangsu', label: 'Jiangsu', children: [{ value: 'nanjing', label: 'Nanjing' }] },
];
const createUser = (values) => console.log(values);

export const Demo = () => (
  <Form
    initialValues={data}
    onFinish={(values) => {
      createUser(values);
    }}
  >
    <AggregateFormItem label="Address" names={['province', 'city']} rules={[{ required: true }]}>
      <Cascader options={options} placeholder="Please select" />
    </AggregateFormItem>
  </Form>
);
```
