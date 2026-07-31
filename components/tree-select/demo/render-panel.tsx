import React from 'react';
import { TreeSelect } from 'antd';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalTreeSelect } = TreeSelect;

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
  },
];

const App: React.FC = () => (
  <InternalTreeSelect defaultValue="lucy" style={{ width: '100%' }} treeData={treeData} />
);

export default App;
