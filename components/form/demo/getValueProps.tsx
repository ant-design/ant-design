import React from 'react';
import type { FormProps } from 'antd';
import { Button, DatePicker, Form } from 'antd';
import dayjs from 'dayjs';

type FieldType = {
  date?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const App: React.FC = () => (
  <Form
    name="getValueProps"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ date: '1715356800000' }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Date"
      name="date"
      rules={[{ required: true }]}
      getValueProps={(value) => ({ value: value && dayjs(Number(value)) })}
      getValueFromEvent={(value) => value && `${dayjs(value).valueOf()}`}
    >
      <DatePicker />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default App;
