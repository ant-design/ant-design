import React from 'react';
import { Badge, Space } from 'antd';

const colors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];

const App: React.FC = () => (
  <Space wrap size={['large', 'middle']}>
    {colors.map((color) => (
      <Badge color={color} count={44} key={color}>
        <div
          style={{
            width: 90,
            height: 90,
            lineHeight: '90px',
            background: '#ccc',
            textAlign: 'center',
          }}
        >
          {color}
        </div>
      </Badge>
    ))}
  </Space>
);

export default App;
