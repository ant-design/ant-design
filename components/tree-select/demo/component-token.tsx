import React, { useState } from 'react';
import { ConfigProvider, TreeSelect } from 'antd';

const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
          },
          {
            value: 'leaf2',
            title: 'leaf2',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'leaf3',
            title: <b style={{ color: '#08c' }}>leaf3</b>,
          },
        ],
      },
    ],
  },
];
const App: React.FC = () => {
  const [value, setValue] = useState<string>();

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          TreeSelect: {
            nodeHoverBg: '#fff2f0',
            nodeSelectedBg: '#ffa39e',
          },
        },
      }}
    >
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={value}
        styles={{
          popup: {
            root: { maxHeight: 400, overflow: 'auto' },
          },
        }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={onChange}
        treeData={treeData}
      />
    </ConfigProvider>
  );
};

export default App;
