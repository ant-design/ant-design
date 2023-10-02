import React, { useEffect, useState } from 'react';
import { Transfer } from 'antd';
import type { TransferDirection } from 'antd/es/transfer';

interface RecordType {
  key: string;
  title: string;
  description: string;
  chosen: boolean;
}

const App: React.FC = () => {
  const [mockData, setMockData] = useState<RecordType[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const getMock = () => {
    const tempTargetKeys = [];
    const tempMockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: i % 2 === 0,
      };
      if (data.chosen) {
        tempTargetKeys.push(data.key);
      }
      tempMockData.push(data);
    }
    setMockData(tempMockData);
    setTargetKeys(tempTargetKeys);
  };

  useEffect(() => {
    getMock();
  }, []);

  const handleChange = (
    newTargetKeys: string[],
    direction: TransferDirection,
    moveKeys: string[],
  ) => {
    console.log(newTargetKeys, direction, moveKeys);
    setTargetKeys(newTargetKeys);
  };

  const renderItem = (item: RecordType) => {
    const customLabel = (
      <span className="custom-item">
        {item.title} - {item.description}
      </span>
    );

    return {
      label: customLabel, // for displayed item
      value: item.title, // for title and filter matching
    };
  };

  return (
    <Transfer
      dataSource={mockData}
      listStyle={{
        width: 300,
        height: 300,
      }}
      targetKeys={targetKeys}
      onChange={handleChange}
      render={renderItem}
    />
  );
};

export default App;
