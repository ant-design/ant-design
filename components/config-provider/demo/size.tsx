import React, { useState } from 'react';
import {
  Button,
  Card,
  ConfigProvider,
  DatePicker,
  Divider,
  Input,
  Radio,
  Select,
  Space,
  Table,
  Tabs,
} from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

const { TabPane } = Tabs;

const App: React.FC = () => {
  const [componentSize, setComponentSize] = useState<SizeType>('small');

  return (
    <>
      <Radio.Group
        value={componentSize}
        onChange={(e) => {
          setComponentSize(e.target.value);
        }}
      >
        <Radio.Button value="small">Small</Radio.Button>
        <Radio.Button value="middle">Middle</Radio.Button>
        <Radio.Button value="large">Large</Radio.Button>
      </Radio.Group>
      <Divider />
      <ConfigProvider componentSize={componentSize}>
        <Space size={[0, 16]} style={{ width: '100%' }} direction="vertical">
          <Input />
          <Tabs defaultActiveKey="1">
            <TabPane tab="Tab 1" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
          <Input.Search allowClear />
          <Input.TextArea allowClear />
          <Select defaultValue="demo" options={[{ value: 'demo' }]} />
          <DatePicker />
          <DatePicker.RangePicker />
          <Button>Button</Button>
          <Card title="Card">
            <Table
              columns={[
                { title: 'Name', dataIndex: 'name' },
                { title: 'Age', dataIndex: 'age' },
              ]}
              dataSource={[
                { key: '1', name: 'John Brown', age: 32 },
                { key: '2', name: 'Jim Green', age: 42 },
                { key: '3', name: 'Joe Black', age: 32 },
              ]}
            />
          </Card>
        </Space>
      </ConfigProvider>
    </>
  );
};

export default App;
