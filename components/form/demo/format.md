---
order: 25
title:
  zh-CN: 格式化表单
  en-US: Format Form
---

## zh-CN

格式化表单值。如：range:\[moment,moment\] => { start_at:1620835200000,end_at:1620835200000 }

## en-US

format form values. as: range:\[moment,moment\] => { start_at:1620835200000,end_at:1620835200000 }

```tsx
import React, { Fragment } from 'react';
import { Form, Button, Space, DatePicker, FormItemProps, FormInstance, Input } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import get from 'lodash/get';
import moment from 'moment';

interface MyFormItemProps extends FormItemProps {
  format?: {
    name?: NamePath;
    format?: (
      name: NamePath,
      form: FormInstance,
    ) => Pick<FormItemProps, 'getValueProps' | 'getValueFromEvent'>;
  };
}

const getFormat: (name: NamePath) => MyFormItemProps['format'] = name => ({
  name,
  format: (endName, form) => ({
    getValueProps: value => ({
      value: value && [moment(Number(value)), moment(Number(form.getFieldValue(endName)))],
    }),
    getValueFromEvent: values => {
      const [start, end] = values || [];
      form.setFields([{ name: endName, value: end && `${moment(end).endOf('day').valueOf()}` }]);
      return start && `${moment(start).startOf('day').valueOf()}`;
    },
  }),
});

function MyFormItem(props: MyFormItemProps) {
  const { format, ...rest } = props;
  if (!format) {
    return <Form.Item {...rest} />;
  }
  return (
    // eslint-disable-next-line react/jsx-fragments
    <Fragment>
      <Form.Item
        noStyle
        shouldUpdate={(prev, next) => get(prev, format.name) !== get(next, format.name)}
      >
        {form => <Form.Item {...format?.format?.(format.name || [], form)} {...rest} />}
      </Form.Item>
      <Form.Item name={format.name} hidden>
        <Input />
      </Form.Item>
    </Fragment>
  );
}

const Demo = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} onFinish={values => console.log(JSON.stringify(values, null, 2))}>
      <MyFormItem label="range" name="start_at" format={getFormat('end_at')}>
        <DatePicker.RangePicker />
      </MyFormItem>
      <Form.Item>
        <Space>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
          <Button htmlType="reset">Reset</Button>
          <Button
            onClick={() => {
              form.setFields([
                { name: 'start_at', value: '1621611200000' },
                { name: 'end_at', value: '1621697600000' },
              ]);
            }}
          >
            Set value
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
