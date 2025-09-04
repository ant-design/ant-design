import React from 'react';
import { QRCode, Space, theme } from 'antd';

const { useToken } = theme;

const App: React.FC = () => {
  const { token } = useToken();
  return (
    <Space>
      <QRCode value="https://www.figma.com/proto/d02NfxgLpwYmlGDF4dvoai/UX-Analyze?page-id=0%3A1&node-id=304-1065&viewport=2522%2C-2234%2C0.35&t=1x5rHFPv8ch3tzBe-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=404%3A2139" color={token.colorSuccessText} />
      <QRCode
        value="https://www.figma.com/proto/d02NfxgLpwYmlGDF4dvoai/UX-Analyze?page-id=0%3A1&node-id=304-1065&viewport=2522%2C-2234%2C0.35&t=1x5rHFPv8ch3tzBe-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=404%3A2139"
        color={token.colorInfoText}
        bgColor={token.colorBgLayout}
      />
    </Space>
  );
};

export default App;
