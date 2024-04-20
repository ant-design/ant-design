---
title: 封装 Form.Item 实现数组转对象
date: 2024-04-17
author: crazyair
---

在表单开发过程中，偶尔会遇到组合属性的需求。UI 展示字段与后端返回数据结构字段有所不同。比如说，跟后端对接接口，定义省市字段经常是 2 个字段 `{ province: Beijing, city: Haidian }`，而不是 `{ province:[Beijing，Haidian] }`，我们经常需要在 `initialValues` 以及 `onFinish` 处理值，如下：

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

## 封装聚合字段组件

当表单比较简单还好，如果遇到 `Form.List` 场景，就需要 `map` 处理值，将变的很复杂。于是我们需要封装聚合字段组件，实现一个 `Form.Item` 可以写多个 `name`，如下：

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
        // 将 names 的值转成数组传给 children
        getValueProps={() => ({ value: names.map((name) => form.getFieldValue(name)) })}
        getValueFromEvent={(values) => {
          // 将 names 字段的值设置给 form store
          form.setFields(names.map((name, index) => ({ name, value: values[index] })));
          return values[0];
        }}
        rules={rules.map((thisRule) => {
          if (typeof thisRule === 'object') {
            return {
              ...thisRule,
              transform: () => {
                // 将 names 字段的值设置给 rule value
                const values = names.map((name) => form.getFieldValue(name));
                return values;
              },
            };
          }
          return thisRule;
        })}
        {...rest}
      />
      {/* 绑定其他字段，使其可以 getFieldValue 获取值、setFields 设置值 */}
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
