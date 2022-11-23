import React from 'react';
import { QrCode } from 'antd';

const App: React.FC = () => (
  <QrCode
    value="https://ant.design/"
    logo="https://gw.alipayobjects.com/zos/antfincdn/%24C9tmj978R/Carousel.svg"
    logoSize={64}
    popover
  />
);

export default App;
