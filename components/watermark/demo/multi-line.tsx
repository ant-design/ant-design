import React from 'react';
import { Watermark } from 'antd';

const App: React.FC = () => (
  <Watermark
    content={[
      { text: 'Ant Design', font: { fontSize: 18, fontWeight: 'bold' } },
      { text: 'Happy Working', font: { fontSize: 12 } },
    ]}
  >
    <div style={{ height: 500 }} />
  </Watermark>
);

export default App;
