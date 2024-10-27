import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const App: React.FC = () => (
  <div>
    <Input placeholder="Underlined" variant="underlined" />
    <Input placeholder="Underlined" variant="underlined" size="large" />
    <TextArea placeholder="Underlined" variant="underlined" />
    <TextArea placeholder="Underlined" variant="underlined" allowClear />
    <Input placeholder="Underlined" variant="underlined" allowClear />
    <Input prefix="￥" suffix="RMB" variant="underlined" />
    <Input prefix="￥" suffix="RMB" disabled variant="underlined" />
    <TextArea allowClear style={{ border: '2px solid #000' }} />

    {/* status */}
    <Input defaultValue="error" variant="underlined" status="error" />
    <Input defaultValue="warning" variant="underlined" status="warning" />
    <Input prefix="$" defaultValue="error" variant="underlined" status="error" />
    <Input prefix="$" defaultValue="warning" variant="underlined" status="warning" />
  </div>
);

export default App;
