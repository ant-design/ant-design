import React from 'react';
import { Divider, Table } from 'antd';
import type { TableProps } from 'antd';

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
  const staticClassNames: TableProps['classNames'] = {
    root: 'custom-root',
    section: 'custom-section',
    title: 'custom-title',
    footer: 'custom-footer',
    content: 'custom-content',
    body: {
      wrapper: 'custom-body-wrapper',
      cell: 'custom-body-cell',
      row: 'custom-body-row',
    },
    header: {
      wrapper: 'custom-header-wrapper',
      cell: 'custom-header-cell',
      row: 'custom-header-row',
    },
    pagination: {
      root: 'custom-pagination-root',
      item: 'custom-pagination-item',
    },
  };

  const staticStyles: TableProps['styles'] = {
    root: {
      color: '#e0e0e0',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    },
    section: {
      background: 'transparent',
    },
    title: {
      background: 'linear-gradient(90deg, #6a5acd, #836fff)',
      color: '#fff',
      fontSize: '1.25rem',
      fontWeight: 600,
      padding: '12px 16px',
    },
    footer: {
      color: '#9ca3af',
    },
    content: {
      background: 'transparent',
    },
    body: {
      wrapper: {
        background: 'transparent',
      },
      row: {
        background: 'rgba(255,255,255,0.02)',
        transition: 'background 0.25s ease',
      },
      cell: {
        padding: '12px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      },
    },
    header: {
      wrapper: {
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(4px)',
      },
      row: {
        background: 'rgba(255,255,255,0.05)',
      },
      cell: {
        fontWeight: 600,
        fontSize: '0.95rem',
        color: '#b8bdfd',
        padding: '12px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      },
    },
    pagination: {
      root: {
        display: 'flex',
        justifyContent: 'center',
      },
      item: {
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.2)',
        color: '#b8bdfd',
        borderRadius: '8px',
        cursor: 'pointer',
      },
    },
  };

  const functionClassNames: TableProps['classNames'] = (info) => ({
    root: info.props.bordered ? 'custom-bordered-root' : 'custom-borderless-root',
    header: {
      wrapper: info.props.size === 'small' ? 'custom-header-small' : 'custom-header-default',
    },
    body: {
      wrapper: 'custom-body-dynamic',
    },
    pagination: {
      root: 'custom-pagination-function',
    },
  });

  const functionStyles: TableProps['styles'] = (info) => ({
    root: {
      border: info.props.bordered ? '2px solid blue' : '1px solid gray',
    },
    header: {
      wrapper: {
        backgroundColor: info.props.size === 'small' ? '#e6f7ff' : '#f6ffed',
      },
    },
    body: {
      wrapper: {
        backgroundColor: '#fffbe6',
      },
    },
    pagination: {
      root: {
        padding: 10,
      },
    },
  });

  return (
    <div style={{ padding: '20px' }}>
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
      />
      <Divider />
      <Table
        columns={columns}
        dataSource={data}
        classNames={functionClassNames}
        styles={functionStyles}
        title={() => 'Table with Function-based Styles'}
        footer={() => 'Dynamic styles based on props'}
        pagination={{
          pageSize: 3,
          simple: true,
        }}
        size="small"
        bordered
      />

      <Divider />
    </div>
  );
};

export default App;
