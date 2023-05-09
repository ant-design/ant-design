import { QRCode, Space, theme } from 'antd';
import React from 'react';

const { useToken } = theme;

const App: React.FC = () => {
  const { token } = useToken();
  return (
    <Space>
      <QRCode
        value="https://ant.design/"
        color={token.colorSuccessText}
        style={{ marginBottom: 16 }}
        bgColor="transparent"
      />
      <QRCode
        value="https://ant.design/"
        color={token.colorInfoText}
        style={{ marginBottom: 16 }}
        bgColor={token.colorBgLayout}
      />
    </Space>
  );
};

export default App;
