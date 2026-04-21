import React from 'react';
import { BorderBeam, Card } from 'antd';

const gradientColor = [
  { color: '#1677ff', percent: 0 },
  { color: '#36cfc9', percent: 40 },
  { color: '#95de64', percent: 76 },
];

const App: React.FC = () => (
  <div style={{ width: 360 }}>
    <BorderBeam color={gradientColor}>
      <Card title="AI Assistant">
        Let agents summarize information, review code, and handle repetitive work for your team.
      </Card>
    </BorderBeam>
  </div>
);

export default App;
