import React from 'react';
import { Anchor } from 'antd';

const App: React.FC = () => (
  <Anchor
    items={[
      {
        key: '1',
        href: '#components-anchor-demo-basic',
        title: 'item Basic demo',
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
        children: [
          {
            key: '4',
            href: '#anchor-props',
            title: 'Anchor Props',
            children: [
              {
                key: '5',
                href: '#link-props',
                title: 'Link Props',
              },
            ],
          },
        ],
      },
    ]}
  />
);

export default App;
