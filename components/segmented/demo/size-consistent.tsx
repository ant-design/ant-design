import React from 'react';
import { Button, Flex, Input, Segmented, Select } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" vertical>
    <div>
      <Segmented style={{ marginRight: 6 }} size="large" options={['Daily', 'Weekly', 'Monthly']} />
      <Button type="primary" size="large">
        Button
      </Button>
    </div>
    <div>
      <Segmented style={{ marginRight: 6 }} options={['Daily', 'Weekly', 'Monthly']} />
      <Input placeholder="default size" style={{ width: 150 }} />
    </div>
    <div>
      <Segmented style={{ marginRight: 6 }} size="small" options={['Daily', 'Weekly', 'Monthly']} />
      <Select size="small" defaultValue="lucy" style={{ width: 150 }}>
        <Select.Option value="lucy">Lucy</Select.Option>
      </Select>
    </div>
  </Flex>
);

export default App;
