import React from 'react';
import { BorderBeam, Card } from 'antd';

const App: React.FC = () => (
  <div style={{ width: 360 }}>
    <BorderBeam lineWidth={2}>
      <Card title="Custom line width" style={{ borderWidth: 2 }}>
        Set lineWidth to match the border width of this container.
      </Card>
    </BorderBeam>
  </div>
);

export default App;
