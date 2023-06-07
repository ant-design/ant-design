import { Popover, QRCode } from 'antd';
import React from 'react';

const src = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

const App: React.FC = () => (
  <Popover overlayInnerStyle={{ padding: 0 }} content={<QRCode value={src} bordered={false} />}>
    <img width={100} height={100} src={src} alt="icon" />
  </Popover>
);

export default App;
