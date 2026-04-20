import React from 'react';
import { BorderBeam, Card } from 'antd';

const App: React.FC = () => (
  <BorderBeam
    borderWidth={2}
    colorFrom="#1677ff"
    colorTo="#36cfc9"
    duration={5}
    pathRadius={20}
    size={80}
    style={{ width: 360 }}
  >
    <Card title="AI Assistant" style={{ borderRadius: 20 }}>
      Let agents summarize information, review code, and handle repetitive work for your team.
    </Card>
  </BorderBeam>
);

export default App;
