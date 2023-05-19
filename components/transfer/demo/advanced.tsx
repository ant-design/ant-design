import React, { useEffect, useState } from 'react';
import { Button, Transfer } from 'antd';
import type { TransferDirection, TransferListProps } from 'antd/es/transfer';

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

  const handleChange = (newTargetKeys: string[]) => {
    setTargetKeys(newTargetKeys);
  };

  const renderFooter = (
    _: TransferListProps<any>,
    { direction }: {
      direction: TransferDirection;
    },
  ) => {
    if (direction === 'left') {
      return (
        <Button size="small" style={{ float: 'left', margin: 5 }} onClick={getMock}>
          Left button reload
        </Button>
      );
    }
    return (
      <Button size="small" style={{ float: 'right', margin: 5 }} onClick={getMock}>
        Right button reload
      </Button>
    );
  };

  return (
    <Transfer
      dataSource={mockData}
      showSearch
      listStyle={{
        width: 250,
        height: 300,
      }}
      operations={['to right', 'to left']}
      targetKeys={targetKeys}
      onChange={handleChange}
      render={(item) => `${item.title}-${item.description}`}
      footer={renderFooter}
    />
  );
};

export default App;
