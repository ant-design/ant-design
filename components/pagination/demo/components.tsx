import React from 'react';
import type { PaginationProps } from 'antd';
import { InputNumber, Pagination } from 'antd';

type SizeChangerComponent = Required<NonNullable<PaginationProps['components']>>['sizeChanger'];
type GetProps<T> = T extends React.ComponentType<infer P> ? P : never;

const SizeChanger = (props: GetProps<SizeChangerComponent>) => {
  const { disabled, size, onSizeChange, 'aria-label': ariaLabel, className } = props;

  return (
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
};

const App: React.FC = () => (
  <Pagination
    showSizeChanger
    components={{
      sizeChanger: SizeChanger,
    }}
    defaultCurrent={3}
    total={500}
  />
);

export default App;
