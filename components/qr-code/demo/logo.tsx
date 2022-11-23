import React from 'react';
import { QrCode } from 'antd';

const App: React.FC = () => (
  <QrCode
    value="https://ant.design/"
    icon="https://gw.alipayobjects.com/zos/antfincdn/%24C9tmj978R/Carousel.svg"
  />
);

export default App;
