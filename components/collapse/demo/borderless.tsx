import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import React from 'react';

const text = (
  <p style={{ paddingLeft: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
    as a welcome guest in many households across the world.
  </p>
);

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: text,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: text,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: text,
  },
];

const App: React.FC = () => <Collapse items={items} bordered={false} defaultActiveKey={['1']} />;

export default App;
