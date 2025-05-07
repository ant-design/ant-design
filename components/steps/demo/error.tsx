import React from 'react';
import { Steps } from 'antd';

const description = 'This is a description';
const items = [
  {
    title: 'Finished',
    description,
  },
  {
    title: 'In Process',
    description,
  },
  {
    title: 'Waiting',
    description,
  },
];

const App: React.FC = () => <Steps current={1} status="error" items={items} />;

export default App;
