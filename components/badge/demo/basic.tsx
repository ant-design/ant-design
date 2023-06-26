import { Badge, ConfigProvider } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <ConfigProvider
    badge={{
      className: 'aaaaaaa',
      style: { color: 'blue' },
      classNames: { count: 'lllllll' },
    }}
  >
    <Badge className="kkkkkkk" style={{ backgroundColor: 'yellow' }} count={10}>
      test
    </Badge>
  </ConfigProvider>
);

export default App;
