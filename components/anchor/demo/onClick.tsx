import React from 'react';
import { Anchor } from 'antd';

const handleClick = (
  e: React.MouseEvent<HTMLElement>,
  link: {
    title: React.ReactNode;
    href: string;
  },
) => {
  e.preventDefault();
  console.log(link);
};

const App: React.FC = () => (
  <Anchor
    affix={false}
    onClick={handleClick}
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
        children: [
          {
            key: '4',
            href: '#anchor-props',
            title: 'Anchor Props',
          },
          {
            key: '5',
            href: '#link-props',
            title: 'Link Props',
          },
        ],
      },
    ]}
  />
);

export default App;
