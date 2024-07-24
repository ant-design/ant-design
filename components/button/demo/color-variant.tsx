import React from 'react';
import { Button, Flex, Select } from 'antd';
import type { ButtonProps, SelectProps } from 'antd';

const colorOptions: SelectProps['options'] = [
  { label: 'default', value: 'default' },
  { label: 'primary', value: 'primary' },
  { label: 'danger', value: 'danger' },
];

const variantOptions: SelectProps['options'] = [
  { label: 'outlined', value: 'outlined' },
  { label: 'dashed', value: 'dashed' },
  { label: 'solid', value: 'solid' },
  { label: 'filled', value: 'filled' },
  { label: 'text', value: 'text' },
  { label: 'link', value: 'link' },
];

const App: React.FC = () => {
  const [color, setColor] = React.useState<ButtonProps['color']>('default');
  const [variant, setVariant] = React.useState<ButtonProps['variant']>('outlined');

  return (
    <Flex vertical gap={20} align="center">
      <Flex gap="middle">
        <Flex gap="small" vertical align="center">
          <span>Color</span>
          <Select
            defaultValue={color}
            style={{ width: 120 }}
            options={colorOptions}
            onChange={(val) => setColor(val)}
          />
        </Flex>
        <Flex gap="small" vertical align="center">
          <span>Variant</span>
          <Select
            defaultValue={variant}
            style={{ width: 120 }}
            options={variantOptions}
            onChange={(val) => setVariant(val)}
          />
        </Flex>
      </Flex>
      <Button color={color} variant={variant}>
        Color & Variant
      </Button>
    </Flex>
  );
};

export default App;
