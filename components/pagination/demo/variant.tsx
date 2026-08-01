import React, { useState } from 'react';
import { Flex, Pagination, Radio, Typography } from 'antd';
import type { PaginationProps } from 'antd';

const variants: NonNullable<PaginationProps['variant']>[] = ['text', 'outlined', 'filled', 'solid'];
const shapes: NonNullable<PaginationProps['shape']>[] = ['default', 'round'];

const App: React.FC = () => {
  const [variant, setVariant] = useState<PaginationProps['variant']>('text');
  const [shape, setShape] = useState<PaginationProps['shape']>('default');

  return (
    <Flex vertical gap="middle">
      <Flex gap="small" align="center" wrap>
        <Typography.Text>variant:</Typography.Text>
        <Radio.Group
          optionType="button"
          value={variant}
          onChange={(e) => setVariant(e.target.value)}
          options={variants.map((item) => ({ label: item, value: item }))}
        />
      </Flex>
      <Flex gap="small" align="center" wrap>
        <Typography.Text>shape:</Typography.Text>
        <Radio.Group
          optionType="button"
          value={shape}
          onChange={(e) => setShape(e.target.value)}
          options={shapes.map((item) => ({ label: item, value: item }))}
        />
      </Flex>
      <Pagination
        defaultCurrent={1}
        total={99999}
        pageSize={1}
        variant={variant}
        shape={shape}
        showSizeChanger={false}
      />
    </Flex>
  );
};

export default App;
