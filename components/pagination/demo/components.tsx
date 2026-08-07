import React from 'react';
import type { PaginationProps } from 'antd';
import { InputNumber, Pagination } from 'antd';

type SizeChangerComponent = Required<NonNullable<PaginationProps['components']>>['sizeChanger'];
type GetProps<T> = T extends React.ComponentType<infer P> ? P : never;

const SizeChanger = (props: GetProps<SizeChangerComponent>) => {
  const { disabled, value, onChange, className } = props;

  return (
    <InputNumber
      aria-label="Page Size"
      className={className}
      disabled={disabled}
      min={1}
      precision={0}
      style={{ width: 100 }}
      value={value}
      onChange={(nextValue) => {
        if (nextValue !== null) {
          onChange(nextValue);
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
