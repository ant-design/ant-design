import React, { useState } from 'react';
import { Transfer } from 'antd';

const mockData: any[] = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
  });
}
const initialTargetKeys = mockData.filter(item => +item.key > 10).map(item => item.key);
const App = () => {
  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const onScroll = () => {};
  return (
    <Transfer
      dataSource={mockData}
      titles={['Source', 'Target']}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={nextTargetKeys => {
        setTargetKeys(nextTargetKeys);
      }}
      onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
      }}
      onScroll={onScroll}
      render={item => item.title}
    />
  );
};
export default () => <App />;
