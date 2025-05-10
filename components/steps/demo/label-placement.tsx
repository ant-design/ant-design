import React from 'react';
import { Steps } from 'antd';

const content = 'This is a content.';
const items = [
  {
    title: 'Finished',
    content,
  },
  {
    title: 'In Progress',
    content,
  },
  {
    title: 'Waiting',
    content,
  },
];
const App: React.FC = () => (
  <>
    <Steps current={1} labelPlacement="vertical" items={items} ellipsis />
    <br />
    <Steps current={1} percent={60} labelPlacement="vertical" items={items} />
    <br />
    <Steps current={1} percent={80} size="small" labelPlacement="vertical" items={items} />
  </>
);

export default App;
