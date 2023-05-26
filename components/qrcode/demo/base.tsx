import { Input, QRCode, Space } from 'antd';
import React from 'react';

const App: React.FC = () => {
  const [text, setText] = React.useState('https://ant.design/');

  return (
    <Space direction="vertical" align="center">
      <QRCode value={text || '-'} />
      <Input
        placeholder="-"
        maxLength={60}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </Space>
  );
};

export default App;
