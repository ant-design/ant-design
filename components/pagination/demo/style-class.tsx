import React from 'react';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';

const App: React.FC = () => {
  const [current, setCurrent] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const handleChange = (page: number, size: number) => {
    setCurrent(page);
    setPageSize(size);
  };

  const objectClassNames: PaginationProps['classNames'] = {
    root: 'custom-pagination-root',
    item: 'custom-pagination-item',
  };

  const objectStyles: PaginationProps['styles'] = {
    root: { backgroundColor: '#f0f0f0', padding: '8px', marginBottom: 10 },
    item: { color: '#1890ff', fontWeight: 'bold' },
  };

  const functionClassNames: PaginationProps['classNames'] = (info) => {
    const { props } = info;
    return {
      root: `dynamic-pagination-root-${props.size || 'default'}`,
      item: props.disabled ? 'disabled-pagination-item' : 'enabled-pagination-item',
    };
  };

  const functionStyles: PaginationProps['styles'] = (info) => {
    const { props } = info;
    return {
      root: {
        backgroundColor: props.size === 'small' ? '#e6f7ff' : '#f6ffed',
        borderRadius: '4px',
      },
      item: {
        color: props.disabled ? '#d9d9d9' : '#52c41a',
        transition: 'all 0.3s',
      },
    };
  };

  return (
    <div style={{ padding: '20px' }}>
      <Pagination
        current={current}
        pageSize={pageSize}
        total={100}
        onChange={handleChange}
        classNames={objectClassNames}
        styles={objectStyles}
        showSizeChanger
      />

      <Pagination
        current={current}
        pageSize={pageSize}
        total={100}
        onChange={handleChange}
        classNames={functionClassNames}
        styles={functionStyles}
        showSizeChanger
        size="small"
      />
    </div>
  );
};

export default App;
