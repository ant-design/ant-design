import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import React from 'react';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This panel can only be collapsed by clicking text',
    children: <p>{text}</p>,
    collapsible: 'header',
  },
  {
    key: '2',
    label: 'This panel can only be collapsed by clicking icon',
    children: <p>{text}</p>,
    collapsible: 'icon',
  },
  {
    key: '3',
    label: "This panel can't be collapsed",
    children: <p>{text}</p>,
    collapsible: 'disabled',
  },
];

const App: React.FC = () => (
  <Collapse items={items} collapsible="header" defaultActiveKey={['1']} />
);

export default App;
