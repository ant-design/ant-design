import React from 'react';
import { Button, Flex, Input, Segmented, Select } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" vertical>
    <div>
      <Segmented
        size="large"
        style={{ marginInlineEnd: 6 }}
        options={['Daily', 'Weekly', 'Monthly']}
      />
      <Button type="primary" size="large">
        Button
      </Button>
    </div>
    <div>
      <Segmented
        size="middle"
        style={{ marginInlineEnd: 6 }}
        options={['Daily', 'Weekly', 'Monthly']}
      />
      <Input placeholder="default size" style={{ width: 150 }} />
    </div>
    <div>
      <Segmented
        size="small"
        style={{ marginInlineEnd: 6 }}
        options={['Daily', 'Weekly', 'Monthly']}
      />
      <Select
        size="small"
        defaultValue="lucy"
        aria-label="select"
        style={{ width: 150 }}
        options={[{ label: 'Lucy', value: 'lucy' }]}
      />
    </div>
  </Flex>
);

export default App;
