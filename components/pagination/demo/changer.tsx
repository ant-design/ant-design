import React from 'react';
import type { PaginationProps } from 'antd';
import { InputNumber, Pagination } from 'antd';

const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
  console.log(current, pageSize);
};

const sizeChangerRender: PaginationProps['sizeChangerRender'] = ({
  disabled,
  size,
  onSizeChange,
  'aria-label': ariaLabel,
  className,
}) => (
  <InputNumber
    aria-label={ariaLabel}
    className={className}
    disabled={disabled}
    min={1}
    precision={0}
    style={{ width: 100 }}
    value={size}
    onChange={(value) => {
      if (value !== null) {
        onSizeChange(value);
      }
    }}
  />
);

const App: React.FC = () => (
  <>
    <Pagination
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={3}
      total={500}
    />
    <br />
    <Pagination
      showSizeChanger
      sizeChangerRender={sizeChangerRender}
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={3}
      total={500}
    />
    <br />
    <Pagination
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={3}
      total={500}
      disabled
    />
  </>
);

export default App;
