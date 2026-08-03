import React, { useState } from 'react';
import { Divider, Flex, Pagination, Radio, Typography } from 'antd';
import type { PaginationProps } from 'antd';

const variants: NonNullable<PaginationProps['variant']>[] = [
  'outlined',
  'filled',
  'borderless',
  'underlined',
];
const shapes: NonNullable<PaginationProps['shape']>[] = ['default', 'round'];

const App: React.FC = () => {
  const [variant, setVariant] = useState<PaginationProps['variant']>('outlined');
  const [shape, setShape] = useState<PaginationProps['shape']>('default');

  const sharedProps: Pick<PaginationProps, 'variant' | 'shape'> = { variant, shape };

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

      <Divider titlePlacement="start">Basic</Divider>
      <Pagination {...sharedProps} defaultCurrent={1} total={50} />

      <Divider titlePlacement="start">showSizeChanger</Divider>
      <Pagination {...sharedProps} defaultCurrent={1} total={500} showSizeChanger />

      <Divider titlePlacement="start">showQuickJumper</Divider>
      <Pagination {...sharedProps} defaultCurrent={1} total={500} showQuickJumper />

      <Divider titlePlacement="start">showSizeChanger + showQuickJumper</Divider>
      <Pagination
        {...sharedProps}
        defaultCurrent={1}
        total={500}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `Total ${total} items`}
      />

      <Divider titlePlacement="start">disabled</Divider>
      <Pagination
        {...sharedProps}
        disabled
        defaultCurrent={1}
        total={500}
        showSizeChanger
        showQuickJumper
      />
    </Flex>
  );
};

export default App;
