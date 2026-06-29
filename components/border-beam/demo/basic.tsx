import React from 'react';
import { BorderBeam, Card } from 'antd';

const App: React.FC = () => (
  <div style={{ width: 360 }}>
    <BorderBeam>
      <Card title="Workspace overview">
        Review task status, deployment health, and recent automation activity in one panel.
      </Card>
    </BorderBeam>
  </div>
);

export default App;
