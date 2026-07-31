import React, { useState } from 'react';
import type { TableColumnsType } from 'antd';
import { Alert, Button, Form, Input, Table } from 'antd';

interface DataType {
  key: string;
  name: string;
  role: string;
}

const columns: TableColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Role', dataIndex: 'role' },
];

const data: DataType[] = [
  { key: '1', name: 'John Brown', role: 'Developer' },
  { key: '2', name: 'Jim Green', role: 'Designer' },
];

const App: React.FC = () => {
  const [result, setResult] = useState<{
    type: 'success' | 'error';
    message: string;
  }>();

  return (
    <Form
      layout="vertical"
      onFinish={() => setResult({ type: 'success', message: 'All expanded fields are valid.' })}
      onFinishFailed={({ errorFields }) =>
        setResult({
          type: 'error',
          message: `${errorFields.length} expanded field(s) failed validation.`,
        })
      }
    >
      <Button type="primary" htmlType="submit" style={{ marginBottom: 16 }}>
        Validate fields
      </Button>
      {result && <Alert showIcon {...result} style={{ marginBottom: 16 }} />}
      <Table<DataType>
        columns={columns}
        dataSource={data}
        pagination={false}
        expandable={{
          forceRender: true,
          expandedRowRender: (record) => (
            <Form.Item
              label={`Notes for ${record.name}`}
              name={['notes', record.key]}
              rules={[{ required: true, message: `Please enter notes for ${record.name}.` }]}
              style={{ margin: 0 }}
            >
              <Input placeholder="Enter notes" />
            </Form.Item>
          ),
        }}
      />
    </Form>
  );
};

export default App;
