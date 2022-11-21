import React from 'react';
import {
  Button,
  ConfigProvider,
  Empty,
  Form,
  Input,
  InputNumber,
  Table,
  Space,
  type FormProps,
  type FormListFieldData,
  type FormListOperation,
} from 'antd';
import { type ColumnProps } from 'antd/es/table';

type User = {
  name: string;
  age?: number;
  address?: string;
};
type FormData = {
  users: User[];
};

const App: React.FC = () => {
  const onFinish: FormProps<FormData>['onFinish'] = (values) => {
    console.log(values);
  };

  const formItemStyle = { marginBottom: 0 };

  const columns: ColumnProps<{
    field: FormListFieldData;
    operation: FormListOperation;
  }>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      render(value, { field }) {
        return (
          <Form.Item
            name={[field.name, 'name']}
            style={formItemStyle}
            rules={[{ required: true, message: 'Name is required' }]}
          >
            <Input />
          </Form.Item>
        );
      },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      render(value, { field }) {
        return (
          <Form.Item name={[field.name, 'age']} style={formItemStyle}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        );
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      render(value, { field }) {
        return (
          <Form.Item name={[field.name, 'address']} style={formItemStyle}>
            <Input />
          </Form.Item>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render(value, { operation, field }) {
        return (
          <Space>
            <Button type="primary" shape="circle" onClick={() => operation.add()}>
              +
            </Button>
            <Button danger shape="circle" onClick={() => operation.remove(field.name)}>
              -
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <Form<FormData>
      layout="vertical"
      initialValues={{
        users: [{ name: 'Jack', age: 18 }, {}, {}],
      }}
      onFinish={onFinish}
    >
      <Form.Item label="Users">
        <Form.List name="users">
          {(fields, operation) => {
            // map dataSources for rendering Table
            const dataSources = fields.map((field) => ({
              field,
              operation,
            }));
            return (
              <ConfigProvider
                renderEmpty={() => (
                  <Empty description={false}>
                    <Button type="primary" ghost onClick={() => operation.add()}>
                      Add User
                    </Button>
                  </Empty>
                )}
              >
                <Table
                  size="small"
                  rowKey={(row) => row.field.key}
                  dataSource={dataSources}
                  columns={columns}
                  pagination={false}
                />
              </ConfigProvider>
            );
          }}
        </Form.List>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
