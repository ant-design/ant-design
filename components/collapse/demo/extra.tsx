import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, Select } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const App: React.FC = () => {
  const [expandIconPlacement, setExpandIconPlacement] =
    useState<CollapseProps['expandIconPlacement']>('start');

  const onPlacementChange = (newExpandIconPlacement: CollapseProps['expandIconPlacement']) => {
    setExpandIconPlacement(newExpandIconPlacement);
  };

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const genExtra = () => (
    <SettingOutlined
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <div>{text}</div>,
      extra: genExtra(),
    },
  ];

  return (
    <>
      <Collapse
        defaultActiveKey={['1']}
        onChange={onChange}
        expandIconPlacement={expandIconPlacement}
        items={items}
      />
      <br />
      <span>Expand Icon Placement: </span>
      <Select
        value={expandIconPlacement}
        style={{ margin: '0 8px' }}
        onChange={onPlacementChange}
        options={[
          { label: 'start', value: 'start' },
          { label: 'end', value: 'end' },
        ]}
      />
    </>
  );
};

export default App;
