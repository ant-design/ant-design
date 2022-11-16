import React from 'react';
import { Button, Space } from 'antd';

const aligns = ['start', 'end', 'center', 'baseline'] as const;

const App: React.FC = () => (
  <div className="space-align-container">
    {aligns.map((align) => (
      <div className="space-align-block" key={align}>
        <Space align={align}>
          {align}
          <Button type="primary">Primary</Button>
          <span className="mock-block">Block</span>
        </Space>
      </div>
    ))}
  </div>
);

export default App;
