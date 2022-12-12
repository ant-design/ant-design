import React from 'react';
import { Anchor } from 'antd';

const App: React.FC = () => (
  <Anchor
    direction='horizontal'
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
        href: '#components-anchor-demo-customizehighlight',
        title: 'API',
      },
      {
        key: '4',
        href: '#components-anchor-demo-onchange',
        title: 'Anchor Props',
      },
      {
        key: '5',
        href: '#api',
        title: 'Link Props',
        children: [
          {
            key: '5.1',
            href: '#anchor-props',
            title: 'Anchor Props',
          },
          {
            key: '5.2',
            href: '#link-props',
            title: 'Link Props',
          },
        ],
      },
    ]}
  />
);

export default App;
