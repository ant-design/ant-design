import React from 'react';
import type { FormItemProps, FormProps } from 'antd';
import { Button, Cascader, Form } from 'antd';

export const MyFormItem = (
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

const options = [
  { value: 'zhejiang', label: 'Zhejiang', children: [{ value: 'hangzhou', label: 'Hangzhou' }] },
  { value: 'jiangsu', label: 'Jiangsu', children: [{ value: 'nanjing', label: 'Nanjing' }] },
];

const onFinish: FormProps['onFinish'] = (values) => {
  console.log('Success:', values);
};

const App: React.FC = () => (
  <Form
    name="range"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    onFinish={onFinish}
  >
    <MyFormItem
      label="Address"
      names={['province', 'city']}
      rules={[{ required: true, type: 'array' }]}
    >
      <Cascader options={options} placeholder="Please select" />
    </MyFormItem>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default App;
