import React from 'react';
import { BorderBeam } from 'antd';

const panelStyle: React.CSSProperties = {
  position: 'relative',
  width: 420,
  background: '#fff',
  border: '1px solid #f0f0f0',
  borderRadius: 8,
};

const contentStyle: React.CSSProperties = {
  minHeight: 160,
  padding: 24,
  color: 'rgba(0, 0, 0, 0.88)',
  lineHeight: 1.5715,
};

const App: React.FC = () => (
  <BorderBeam>
    <div style={panelStyle}>
      <div style={contentStyle}>
        Review task status, deployment health, and recent automation activity in one custom
        container.
      </div>
    </div>
  </BorderBeam>
);

export default App;
