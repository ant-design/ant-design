import React from 'react';
import { Divider, Flex, Tag } from 'antd';

const variants = ['filled', 'solid', 'outlined', 'blur'] as const;

const App: React.FC = () => (
  <>
    <div
      style={{
        padding: 24,
        borderRadius: 8,
        background: 'linear-gradient(135deg, #1677ff 0%, #722ed1 45%, #eb2f96 100%)',
      }}
    >
      <Flex gap="small" align="center" wrap>
        <Tag variant="blur">blur</Tag>
        <Tag variant="blur" color="gold">
          gold
        </Tag>
        <Tag variant="blur" color="processing">
          status
        </Tag>
      </Flex>
    </div>
    <Divider />
    <Flex gap="small" align="center" wrap>
      {variants.map((variant) => (
        <Tag key={variant} variant={variant}>
          {variant}
        </Tag>
      ))}
    </Flex>
  </>
);

export default App;

