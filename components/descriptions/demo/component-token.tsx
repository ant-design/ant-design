import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Button, ConfigProvider, Descriptions, Radio, theme } from 'antd';

const App: React.FC = () => {
  const [size, setSize] = useState<'default' | 'middle' | 'small'>('default');

  const onChange = (e: RadioChangeEvent) => {
    console.log('size checked', e.target.value);
    setSize(e.target.value);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Descriptions: {
            descriptionsBg: 'red',
            descriptionsTitleMarginBottom: 2,
            descriptionsDefaultPadding: '32px',
            descriptionsMiddlePadding: '24px',
            descriptionsSmallPadding: '16px',
            descriptionsItemLabelColonMarginRight: 10,
            descriptionsItemLabelColonMarginLeft: 20,
            descriptionsExtraColor: 'blue',
          },
        },
      }}
    >
      <div>
        <Radio.Group onChange={onChange} value={size}>
          <Radio value="default">default</Radio>
          <Radio value="middle">middle</Radio>
          <Radio value="small">small</Radio>
        </Radio.Group>
        <br />
        <br />
        <Descriptions bordered title="Custom Size" size={size} extra={<div>extra color: blue</div>}>
          <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
          <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
          <Descriptions.Item label="time">18:00:00</Descriptions.Item>
          <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
          <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
          <Descriptions.Item label="Official">$60.00</Descriptions.Item>
          <Descriptions.Item label="Config Info">
            Data disk type: MongoDB
            <br />
            Database version: 3.4
            <br />
            Package: dds.mongo.mid
            <br />
            Storage space: 10 GB
            <br />
            Replication factor: 3
            <br />
            Region: East China 1
            <br />
          </Descriptions.Item>
        </Descriptions>
        <br />
        <br />
        <Descriptions title="Custom Size" size={size} extra={<Button type="primary">Edit</Button>}>
          <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
          <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
          <Descriptions.Item label="time">18:00:00</Descriptions.Item>
          <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
          <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
          <Descriptions.Item label="Official">$60.00</Descriptions.Item>
        </Descriptions>
      </div>
    </ConfigProvider>
  );
};

export default App;
