import React, { useState } from 'react';
import { Descriptions, Divider, Radio, Switch } from 'antd';

const labelStyle: React.CSSProperties = { background: 'red' };
const contentStyle: React.CSSProperties = { background: 'green' };

type LayoutType = 'horizontal' | 'vertical' | undefined;

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
      <Descriptions title="User Info" bordered={border} layout={layout}>
        <Descriptions.Item label="Product" labelStyle={labelStyle} contentStyle={contentStyle}>
          Cloud Database
        </Descriptions.Item>
        <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
        <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions
        title="Root style"
        labelStyle={labelStyle}
        contentStyle={contentStyle}
        bordered={border}
        layout={layout}
      >
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
        <Descriptions.Item
          label="Automatic Renewal"
          labelStyle={{ color: 'orange' }}
          contentStyle={{ color: 'blue' }}
        >
          YES
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default App;
