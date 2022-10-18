import React from 'react';
import { Badge } from 'antd';

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
  <>
    {colors.map(color => (
      <div key={color} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        <Badge color={color} count={44}>
          <div
            style={{
              width: 90,
              height: 90,
              lineHeight: '90px',
              background: '#ccc',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            {color}
          </div>
        </Badge>
      </div>
    ))}
  </>
);

export default App;
