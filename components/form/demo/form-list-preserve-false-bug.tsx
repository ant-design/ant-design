//issue: https://github.com/ant-design/ant-design/issues/52931
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';

const onFinish = (values) => {
  console.log('Received values of form:', values);
};
const Items = ({ fields, add, remove }) => {
  return (
    <>
      {fields.map(({ key, name, ...restField }) => (
        <Space
          key={key}
          style={{
            display: 'flex',
            marginBottom: 8,
          }}
          align="baseline"
        >
          <Form.Item
            {...restField}
            name={[name, 'first']}
            rules={[
              {
                required: true,
                message: 'Missing first name',
              },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            {...restField}
            name={[name, 'last']}
            rules={[
              {
                required: true,
                message: 'Missing last name',
              },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <MinusCircleOutlined onClick={() => remove(name)} />
        </Space>
      ))}
      <Form.Item>
        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
          Add field
        </Button>
      </Form.Item>
    </>
  );
};

const Test = () => {
  const form = Form.useFormInstance();
  const handleClick = () => {
    const usersField = form.getFieldValue('users') || [];
    console.log('点击前 users:', usersField);
    const newUser = [...usersField, { first: 'XXXX', last: 'YYYY' }];

    form.setFieldsValue({
      aa: 'XXXXX',
      users: newUser,
    });

    // 延迟检查，确保 setFieldsValue 完成
    setTimeout(() => {
      console.log('setFieldsValue 后的值:', form.getFieldsValue());
    }, 0);
  };
  return (
    <>
      <Button onClick={handleClick}>AAA</Button>

      <Form.List name="users">
        {(fields, { add, remove }, meta) => {
          console.log('Form.List render - fields:', fields);
          console.log('Form.List render - errors:', meta.errors);
          return <Items fields={fields} add={add} remove={remove} />;
        }}
      </Form.List>
    </>
  );
};

const App = () => {
  const [form] = Form.useForm();

  return (
    <>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        autoComplete="off"
        form={form}
        preserve={false}
      >
        <Form.Item name="aa">
          <Input />
        </Form.Item>

        <Test />

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default App;
