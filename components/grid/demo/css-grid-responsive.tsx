import React from 'react';
import { CSSGrid } from 'antd';

const itemStyle: React.CSSProperties = {
  background: '#1677ff',
  color: '#fff',
  padding: 24,
  textAlign: 'center',
};

const App: React.FC = () => (
  <CSSGrid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap="middle">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} style={itemStyle}>
        Item {i + 1}
      </div>
    ))}
  </CSSGrid>
);

export default App;
