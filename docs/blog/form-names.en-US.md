---
title: HOC Aggregate FieldItem
date: 2024-04-26
author: crazyair
---

During the form development process, there are occasional needs for combining attributes. The UI display fields are different from the backend data structure fields. For example, when interfacing with the backend, the province and city fields are often defined as two separate fields `{ province: Beijing, city: Haidian }`, rather than a combined one `{ province: [Beijing, Haidian] }`. Therefore, it is necessary to handle the values in `initialValues` and `onFinish` as follows:

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

When the form is relatively simple, it's manageable, but when encountering a `Form.List` scenario, it becomes necessary to process the values using `map`, which can become quite complex. Therefore, we need to encapsulate an aggregated field component to enable a single `Form.Item` to handle multiple `name` attributes.

## Approach Summary

To implement the aggregation field functionality, we need to utilize `getValueProps`, `getValueFromEvent`, and `transform` to facilitate the transformation of data from `FormStore` and to re-insert the structure into `FormStore` upon change.

### getValueProps

By default, `Form.Item` passes the field value from `FormStore` as the `value` prop to the child component. However, with `getValueProps`, you can customize the `props` that are passed to the child component to implement transformation functionality. In an aggregation scenario, we can iterate through `names` and combine the values from `FormStore` into a single `value` that is then passed to the child component:

```tsx
getValueProps={() => ({ value: names.map((name) => form.getFieldValue(name)) })}
```

### getValueFromEvent

When the child component modifies the value, the `setFields` method is used to set the aggregated `value` returned by the child component to the corresponding `name`, thereby updating the values of `names` in `FormStore`:

```tsx
getValueFromEvent={(values) => {
    form.setFields(names.map((name, index) => ({ name, value: values[index] })));
    return values[0];
}}
```

### transform

In `rules`, the default provided `value` for validation originates from the value passed to the corresponding `name` when the child component changes. Additionally, it is necessary to retrieve the values of `names` from `FormStore` and use the `transform` method to modify the `value` of `rules`:

```tsx
rules={[{
  transform: () => {
    const values = names.map((name) => form.getFieldValue(name));
    return values;
  },
}]}
```

## Final Result

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
        // Convert the values of names into an array passed to children
        getValueProps={() => ({ value: names.map((name) => form.getFieldValue(name)) })}
        getValueFromEvent={(values) => {
          // Set the form store values for names
          form.setFields(names.map((name, index) => ({ name, value: values[index] })));
          return values[0];
        }}
        rules={rules.map((thisRule) => {
          if (typeof thisRule === 'object') {
            return {
              ...thisRule,
              transform: () => {
                // Set the values of the names fields for the rule value
                const values = names.map((name) => form.getFieldValue(name));
                return values;
              },
            };
          }
          return thisRule;
        })}
        {...rest}
      />
      {/*  Bind other fields so they can getFieldValue to get values and setFields to set values */}
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

## Summary

By doing so, we have implemented a feature that allows for operating multiple `names` within a `Form.Item`, making the form logic clearer and easier to maintain. Additionally, there are some edge cases in this example that have not been considered. For instance, `setFields([{ name:'city', value:'nanjing' }])` will not update the selected value of `Cascader`. To achieve a refresh effect, you need to add `Form.useWatch(values => resetNames.map(name => get(values, name)), form);`. Feel free to explore more edge cases and handle them as needed.
