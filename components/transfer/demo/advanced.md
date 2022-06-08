---
order: 2
title:
  zh-CN: 高级用法
  en-US: Advanced
---

## zh-CN

穿梭框高级用法，可配置操作文案，可定制宽高，可对底部进行自定义渲染。

## en-US

Advanced Usage of Transfer.

You can customize the labels of the transfer buttons, the width and height of the columns, and what should be displayed in the footer.

```tsx
import { Button, Transfer } from 'antd';
import type { TransferDirection, TransferListProps } from 'antd/es/transfer';
import React, { useEffect, useState } from 'react';

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
        chosen: Math.random() * 2 > 1,
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
    {
      direction,
    }: {
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
      render={item => `${item.title}-${item.description}`}
      footer={renderFooter}
    />
  );
};

export default App;
```
