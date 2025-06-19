import React from 'react';
import { Steps } from 'antd';

const content = 'This is a content';
const items = [
  {
    title: 'Finished',
    content,
  },
  {
    title: 'In Process',
    content,
  },
  {
    title: 'Waiting',
    content,
  },
];

const App: React.FC = () => <Steps current={1} status="error" items={items} />;

export default App;
