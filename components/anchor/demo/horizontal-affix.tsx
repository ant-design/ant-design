import React from 'react';
import { Anchor } from 'antd';

const App: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <Anchor
      direction="horizontal"
      items={[
        {
          key: '1',
          href: '#components-anchor-demo-basic',
          title: 'Basic demo',
        },
        {
          key: '2',
          href: '#components-anchor-demo-static',
          title: 'Static demo',
        },
        {
          key: '3',
          href: '#api',
          title: 'API',
        },
      ]}
    />
  </div>
);

export default App;
