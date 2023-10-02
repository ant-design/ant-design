import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const App: React.FC = () => (
  <div style={{ backgroundColor: 'rgba(0, 0, 128, .2)' }}>
    <Input placeholder="Unbordered" bordered={false} />
    <Input placeholder="Unbordered" bordered={false} size="large" />
    <TextArea placeholder="Unbordered" bordered={false} />
    <TextArea placeholder="Unbordered" bordered={false} allowClear />
    <Input placeholder="Unbordered" bordered={false} allowClear />
    <Input prefix="￥" suffix="RMB" bordered={false} />
    <Input prefix="￥" suffix="RMB" disabled bordered={false} />
    <TextArea allowClear style={{ border: '2px solid #000' }} />
  </div>
);

export default App;
