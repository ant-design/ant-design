import React from 'react';
import { Divider, Table, Typography } from 'antd';
import type { TableProps } from 'antd';

const { Title } = Typography;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  description: string;
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sydney No. 2 Lake Park',
    description: 'This user is disabled.',
  },
];

const App: React.FC = () => {
  // Static classNames and styles
  const staticClassNames: TableProps['classNames'] = {
    root: 'custom-table-root',
    header: 'custom-table-header',
    body: 'custom-table-body',
    footer: 'custom-table-footer',
    pagination: 'custom-table-pagination',
  };

  const staticStyles: TableProps['styles'] = {
    root: { border: '2px solid #1890ff', borderRadius: '8px' },
    header: { backgroundColor: '#f0f2ff' },
    body: { backgroundColor: '#fafbff' },
    footer: { backgroundColor: '#e6f4ff', padding: '12px' },
    pagination: { backgroundColor: '#f9f0ff', padding: '8px', textAlign: 'center' },
  };

  // Function-based classNames and styles
  const functionClassNames: TableProps['classNames'] = (info) => ({
    root: info.props.bordered ? 'custom-bordered-root' : 'custom-borderless-root',
    header: `custom-header-${info.props.size || 'default'}`,
    body: 'custom-body-dynamic',
    footer: 'custom-footer-dynamic',
    pagination: info.props.pagination ? 'custom-pagination-enabled' : '',
  });

  const functionStyles: TableProps['styles'] = (info) => ({
    root: {
      boxShadow: info.props.bordered ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
      borderRadius: info.props.size === 'small' ? '4px' : '8px',
    },
    header: {
      backgroundColor: info.props.size === 'small' ? '#e6fffb' : '#f6ffed',
      fontWeight: 600,
    },
    body: {
      backgroundColor: '#fffbe6',
      minHeight: '200px',
    },
    footer: {
      backgroundColor: '#fff2e8',
      fontStyle: 'italic',
    },
    pagination: {
      backgroundColor: '#f9f0ff',
      borderTop: '1px solid #d9d9d9',
      paddingTop: '12px',
    },
  });

  return (
    <div style={{ padding: '20px' }}>
      <Title level={3}>Static ClassNames and Styles</Title>
      <Table
        columns={columns}
        dataSource={data}
        classNames={staticClassNames}
        styles={staticStyles}
        title={() => 'Table with Static Styles'}
        footer={() => 'Table Footer'}
        pagination={{
          pageSize: 2,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        bordered
      />

      <Divider />

      <Title level={3}>Function-based ClassNames and Styles</Title>
      <Table
        columns={columns}
        dataSource={data}
        classNames={functionClassNames}
        styles={functionStyles}
        title={() => 'Table with Function-based Styles (Bordered & Small Size)'}
        footer={() => 'Dynamic styles based on props'}
        pagination={{
          pageSize: 3,
          simple: true,
        }}
        size="small"
        bordered
      />

      <Divider />

      <Title level={3}>Function-based Styles (No Border & Default Size)</Title>
      <Table
        columns={columns}
        dataSource={data}
        classNames={functionClassNames}
        styles={functionStyles}
        title={() => 'Table with Function-based Styles (No Border)'}
        footer={() => 'Different styles for different props'}
        pagination={{
          pageSize: 2,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
        size="middle"
      />
    </div>
  );
};

export default App;
