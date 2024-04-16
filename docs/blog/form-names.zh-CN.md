---
title: 封装 Form.Item 实现数组转对象
date: 2024-04-17
author: crazyair
---

在表单开发过程中，偶尔会遇到组合属性的需求。UI 展示字段与后端返回数据结构字段有所不同。比如说，跟后端对接接口，定义省市字段经常是 2 个字段`{ province: 北京, city: 海淀 }`，而不是 `{ province:[北京，海淀] }`，我们经常需要在 `initialValues` 以及 `onFinish` 处理值，如下：

```tsx
import React from 'react';
import { Cascader, Form } from 'antd';

const data = { province: '北京', city: '海淀' };
const options = [
  { value: 'zhejiang', label: 'Zhejiang', children: [{ value: 'hangzhou', label: 'Hangzhou' }] },
  { value: 'jiangsu', label: 'Jiangsu', children: [{ value: 'nanjing', label: 'Nanjing' }] },
];

export const Demo = () => (
  <Form
    initialValues={{ province: [data.province, data.city] }}
    onFinish={(values) => {
      const { province, ...rest } = values;
      fetch({ province: province[0], city: province[1], ...rest });
    }}
  >
    <Form.Item label="Address" name="province">
      <Cascader options={options} placeholder="Please select" />
    </Form.Item>
  </Form>
);
```

## 封装聚合字段组件

当表单比较简单还好，如果遇到 `Form.List` 场景，就需要 `map` 处理值，将变的很复杂。于是我们需要封装聚合字段组件，实现一个 `Form.Item` 可以写多个 `name`，如下：

```tsx
import React from 'react';
import type { FormItemProps } from 'antd';
import { Cascader, Form } from 'antd';

export const FormItem = (
  props: FormItemProps & { names?: FormItemProps<Record<string, any>>['name'][] },
) => {
  const form = Form.useFormInstance();

  const { names = [], getValueProps, getValueFromEvent, rules = [], ...rest } = props;
  const [firstNames, ...resetNames] = names;
  return (
    <>
      <Form.Item
        name={firstNames}
        getValueProps={() => {
          const values = names.map((name) => form.getFieldValue(name)).filter(Boolean);
          if (getValueProps) {
            return getValueProps(values);
          }
          return { value: values.length ? values : undefined };
        }}
        getValueFromEvent={(value) => {
          let values = value;
          if (getValueFromEvent) {
            values = getValueFromEvent(value);
          }
          form.setFields(names.map((name, index) => ({ name, value: values[index] })));
          return values[0];
        }}
        rules={rules.map((thisRule) => {
          if (typeof thisRule === 'object') {
            return {
              ...thisRule,
              transform: () => {
                const values = names.map((name) => form.getFieldValue(name));
                return thisRule.transform ? thisRule.transform(values) : values;
              },
            };
          }
          return thisRule;
        })}
        {...rest}
      />
      {resetNames.map((name) => (
        <Form.Item key={name?.toString()} name={name} noStyle>
          <div style={{ display: 'none' }} />
        </Form.Item>
      ))}
    </>
  );
};

const data = { province: '北京', city: '海淀' };
const options = [
  { value: 'zhejiang', label: 'Zhejiang', children: [{ value: 'hangzhou', label: 'Hangzhou' }] },
  { value: 'jiangsu', label: 'Jiangsu', children: [{ value: 'nanjing', label: 'Nanjing' }] },
];

export const Demo = () => (
  <Form
    initialValues={data}
    onFinish={(values) => {
      console.log('Success:', values);
    }}
  >
    <FormItem
      label="Address"
      names={['province', 'city']}
      rules={[{ required: true, type: 'array' }]}
    >
      <Cascader options={options} placeholder="Please select" />
    </FormItem>
  </Form>
);
```

## 聚合字段组件原理

Antd Form.Item 有提供 2 个 API `getValueProps` `getValueFromEvent`，以及 rules 提供了 `transform`

### getValueProps 作用

将传给 `Cascader` 的值由字符串转成数组 `北京` -> `[北京, 海淀]`

### getValueFromEvent 作用

将传给 `Form` 的值由数组转成字符串 `[北京, 海淀]` -> `北京`，并调用 `setFields` 设置 `city` 的值

### transform 作用

将 `rules` 中 `validate` `value` 的值由字符串转成数组 `北京` -> `[北京, 海淀]`，用于自定义校验
