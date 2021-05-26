---
order: 25
title:
  zh-CN: 格式化表单
  en-US: Format Form
---

## zh-CN

格式化表单值。

## en-US

format form values.

```tsx
import React, { useContext } from 'react';
import { Form, Button, Space, DatePicker, FormItemProps, FormInstance, Input } from 'antd';
import get from 'lodash/get';
import moment from 'moment';
import FieldContext from 'rc-field-form/es/FieldContext';
import { getNamePath } from 'rc-field-form/es/utils/valueUtil';
import { InternalNamePath, NamePath } from 'antd/es/form/interface';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface MyFormItemProps<Values = any> extends FormItemProps<Values> {
  format?: {
    name?: NamePath[];
    format?: (
      names: NamePath[],
      form: FormInstance<Values>,
    ) => Pick<FormItemProps<Values>, 'getValueProps' | 'getValueFromEvent'>;
  };
}

const getFormat: (name: NamePath[]) => MyFormItemProps['format'] = name => ({
  name,
  format: (names, form) => ({
    getValueProps: value => ({
      value: value && [moment(Number(value)), moment(Number(form.getFieldValue(names[0])))],
    }),
    getValueFromEvent: values => {
      const [start, end] = values || [];
      form.setFields([{ name: names[0], value: end && `${moment(end).endOf('day').valueOf()}` }]);
      return start && `${moment(start).startOf('day').valueOf()}`;
    },
  }),
});

function FormItem<Values = any>(props: MyFormItemProps<Values>) {
  const { format, ...rest } = props;
  const { prefixName } = useContext(FieldContext);
  if (!format) {
    return <Form.Item {...rest} />;
  }

  const names = format.name?.map(name => {
    const parentPrefixName = getNamePath(prefixName as InternalNamePath) || [];
    return [...parentPrefixName, ...getNamePath(name)];
  });

  return (
    <>
      <Form.Item
        noStyle
        shouldUpdate={(prev, next) => {
          const result = names?.map(name => get(prev, name) !== get(next, name)).filter(x => x);
          return (result?.length || 0) > 0;
        }}
      >
        {(form: FormInstance<Values>) => (
          <Form.Item {...format?.format?.(names || [], form)} {...rest} />
        )}
      </Form.Item>
      {format.name?.map(name => (
        <Form.Item key={getNamePath(name).join('_')} name={name} hidden>
          <Input />
        </Form.Item>
      ))}
    </>
  );
}

const Demo = () => {
  const [form] = Form.useForm();

  return (
    <Form
      {...layout}
      form={form}
      onFinish={async values => console.log(JSON.stringify(values, null, 2))}
    >
      <FormItem label="range" name="start_at" format={getFormat(['end_at'])}>
        <DatePicker.RangePicker />
      </FormItem>
      <Form.Item label="result" shouldUpdate>
        {() => JSON.stringify(form.getFieldsValue(true), null, 2)}
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button htmlType="submit" type="primary">
            提交
          </Button>
          <Button htmlType="reset">重置</Button>
          <Button
            onClick={() => {
              form.setFields([
                { name: 'start_at', value: '1621611200000' },
                { name: 'end_at', value: '1621697600000' },
              ]);
            }}
          >
            测试
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
