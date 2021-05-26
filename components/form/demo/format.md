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
import React, { Fragment, useContext } from 'react';
import { Form, Button, Space, DatePicker, FormItemProps, FormInstance, Input } from 'antd';
import get from 'lodash/get';
import moment from 'moment';
import FieldContext from 'rc-field-form/es/FieldContext';
import { getNamePath } from 'rc-field-form/es/utils/valueUtil';
import { InternalNamePath, NamePath } from 'antd/es/form/interface';

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

function MyFormItem<Values = any>(props: MyFormItemProps<Values>) {
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
    // eslint-disable-next-line react/jsx-fragments
    <Fragment>
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
    </Fragment>
  );
}

const Demo = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} onFinish={async values => console.log(JSON.stringify(values, null, 2))}>
      <MyFormItem label="range" name="start_at" format={getFormat(['end_at'])}>
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
            Set range value
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
