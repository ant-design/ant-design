import React from 'react';
import { QRCode, Popover } from 'antd';

const src = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

const App: React.FC = () => (
  <Popover content={<QRCode value={src} />}>
    <img width={100} height={100} src={src} alt="icon" />
  </Popover>
);

export default App;
