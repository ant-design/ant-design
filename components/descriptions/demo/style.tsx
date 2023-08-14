import React, { useState } from 'react';
import { Descriptions, Divider, Radio, Switch } from 'antd';
import type { DescriptionsProps } from 'antd';

const labelStyle: React.CSSProperties = { background: 'red' };
const contentStyle: React.CSSProperties = { background: 'green' };

type LayoutType = 'horizontal' | 'vertical' | undefined;

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database',
    labelStyle,
    contentStyle,
  },
  {
    key: '2',
    label: 'Billing Mode',
    children: 'Prepaid',
  },
  {
    key: '3',
    label: 'Automatic Renewal',
    children: 'YES',
  },
];

const rootStyleItems: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    key: '2',
    label: 'Billing Mode',
    children: 'Prepaid',
  },
  {
    key: '3',
    label: 'Automatic Renewal',
    children: 'YES',
    labelStyle: { color: 'orange' },
    contentStyle: { color: 'blue' },
  },
];

const App: React.FC = () => {
  const [border, setBorder] = useState(true);
  const [layout, setLayout] = useState('horizontal' as LayoutType);

  return (
    <>
      <Switch
        checkedChildren="Border"
        unCheckedChildren="No Border"
        checked={border}
        onChange={(e) => setBorder(e)}
      />
      <Divider />
      <Radio.Group onChange={(e) => setLayout(e.target.value)} value={layout}>
        <Radio value="horizontal">horizontal</Radio>
        <Radio value="vertical">vertical</Radio>
      </Radio.Group>
      <Divider />
      <Descriptions title="User Info" bordered={border} layout={layout} items={items} />
      <Divider />
      <Descriptions
        title="Root style"
        labelStyle={labelStyle}
        contentStyle={contentStyle}
        bordered={border}
        layout={layout}
        items={rootStyleItems}
      />
    </>
  );
};

export default App;
