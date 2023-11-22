import React from 'react';
import { Rate } from 'antd';

const App: React.FC = () => (
  <>
    <Rate defaultValue={3} />
    <span style={{ fontSize: 14, marginLeft: 8 }}>allowClear: true</span>
    <br />
    <Rate allowClear={false} defaultValue={3} />
    <span style={{ fontSize: 14, marginLeft: 8 }}>allowClear: false</span>
  </>
);

export default App;
