import React from 'react';
import { Rate } from 'antd';

const App: React.FC = () => (
  <>
    <Rate defaultValue={3} />
    <span className="ant-rate-text">allowClear: true</span>
    <br />
    <Rate allowClear={false} defaultValue={3} />
    <span className="ant-rate-text">allowClear: false</span>
  </>
);

export default App;
