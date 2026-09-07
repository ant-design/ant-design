---
title: 封装 Form.Item 实现数组转对象
date: 2024-04-26
author: crazyair
---

在表单开发过程中，偶尔会遇到组合属性的需求。UI 展示字段与后端返回数据结构字段有所不同。比如说，跟后端对接接口，定义省市字段经常是 2 个字段 `{ province: Beijing, city: Haidian }`，而不是 `{ province:[Beijing，Haidian] }`，因此则需要在 `initialValues` 以及 `onFinish` 处理值，如下：

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

当表单比较简单还好，如果遇到 `Form.List` 场景，就需要 `map` 处理值，将变的很复杂。于是我们需要封装聚合字段组件，实现一个 `Form.Item` 可以写多个 `name`。

## 思路整理

要实现聚合字段功能，我们需要用到 `getValueProps` `getValueFromEvent` `transform`，从而实现数据从 `FormStore` 中的转化，以及变更时重新传入 `FormStore` 结构中。

### getValueProps

默认情况下，`Form.Item` 会将 `FormStore` 中的字段值作为 `value` prop 传递给子组件。而通过 `getValueProps` 可以自定义传入给子组件的 `props` 从而实现转化功能。在聚合场景中，我们可以遍历 `names` 分别将 `FormStore` 中的值组合为一个 `value` 传递给子组件：

```tsx
getValueProps={() => ({ value: names.map((name) => form.getFieldValue(name)) })}
```

### getValueFromEvent

当子组件修改值时，使用 `setFields` 方法将子组件返回的聚合 `value` 分别设置给对应的 `name`，从而实现更新 `FormStore` 中 `names` 的值：

```tsx
getValueFromEvent={(values) => {
    form.setFields(names.map((name, index) => ({ name, value: values[index] })));
    return values[0];
}}
```

### transform

`rules` 中校验默认提供的 `value` 来源于子组件变更时传递给 `name` 对应的值，还需要从 `FormStore` 获取 `names` 的值使用 `transform` 方法修改 `rules` 的 `value`：

```tsx
rules={[{
  transform: () => {
    const values = names.map((name) => form.getFieldValue(name));
    return values;
  },
}]}
```

## 最终效果

```tsx | demo
/**
 * defaultShowCode: true
 */
import React from 'react';
import type { FormItemProps } from 'antd';
import { Button, Cascader, DatePicker, Form as OriginForm } from 'antd';
import dayjs from 'dayjs';

interface AggregateProps<V = any> extends FormItemProps<V> {
  names?: FormItemProps<V>['name'][];
}

const Aggregate = (props: AggregateProps) => {
  const form = OriginForm.useFormInstance();

  const { names = [], rules = [], ...rest } = props;
  const [firstName, ...resetNames] = names;

  return (
    <>
      <OriginForm.Item
        name={firstName}
        // 将 names 的值转成数组传给 children
        getValueProps={() => {
          const value = names.map((name) => form.getFieldValue(name));
          if (value.every((v) => v === undefined)) {
            return undefined;
          }
          return { value };
        }}
        getValueFromEvent={(values) => {
          // 将 form store 分别设置给 names
          const fieldData = names.map((name, index) => ({ name, value: values?.[index] }));
          form.setFields(fieldData);
          return values?.[0];
        }}
        rules={rules.map((rule) => {
          if (typeof rule === 'object' && rule) {
            return {
              ...rule,
              transform: () => {
                // 将 names 字段的值设置给 rule value
                const values = names.map((name) => form.getFieldValue(name));
                return values;
              },
            };
          }
          return rule;
        })}
        {...rest}
      />
      {/* 绑定其他字段，使其可以 getFieldValue 获取值、setFields 设置值 */}
      {resetNames.map((name) => (
        <OriginForm.Item key={name?.toString()} name={name} noStyle />
      ))}
    </>
  );
};

const data = {
  province: 'Beijing',
  city: 'Haidian',
  startTime: dayjs(),
  endTime: dayjs().add(1, 'month'),
};

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{ value: 'hangzhou', label: 'Hangzhou' }],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{ value: 'nanjing', label: 'Nanjing' }],
  },
];

const Form = Object.assign(OriginForm, { Aggregate });

export default () => (
  <Form initialValues={data} onFinish={(value) => console.log(value)}>
    <Form.Aggregate label="Address" names={['province', 'city']} rules={[{ required: true }]}>
      <Cascader options={options} placeholder="Please select" />
    </Form.Aggregate>

    <Form.Item label="Address (use Default)" name="defaultAddress">
      <Cascader options={options} placeholder="Please select" />
    </Form.Item>

    {/* 同理，也适用于 DatePicker.RangePicker */}
    <Form.Aggregate label="Date" names={['startTime', 'endTime']}>
      <DatePicker.RangePicker />
    </Form.Aggregate>

    <Form.Item>
      <Button htmlType="submit" type="primary">
        提交
      </Button>
    </Form.Item>
  </Form>
);
```

## 总结

通过这种方式，我们实现了一个可以在 `Form.Item` 中操作多个 `name` 的功能，使得表单逻辑更加清晰和易于维护。

除了文中的 `Cascader` 示例，同样适用于 `DatePicker.RangePicker` 等组件。换句话说，只要是需要聚合多个字段的场景，都可以使用这种方式。

另外此示例还有些边界场景没有考虑，比如 `setFields([{ name:'city' value:'nanjing' }])` 不会更新 `Cascader` 选中的值，需要增加 `Form.useWatch(values => resetNames.map(name => get(values, name)), form);` 达到刷新效果等。

更多的边界问题就交给你去试试吧~
