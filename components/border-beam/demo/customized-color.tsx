import React from 'react';
import { BorderBeam, Card } from 'antd';

const App: React.FC = () => (
  <div style={{ width: 360 }}>
    <BorderBeam colorFrom="#1677ff" colorTo="#36cfc9">
      <Card title="AI Assistant">
        Let agents summarize information, review code, and handle repetitive work for your team.
      </Card>
    </BorderBeam>
  </div>
);

export default App;
