import React from 'react';
import { Anchor } from 'antd';

const App: React.FC = () => (
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
        href: '#components-anchor-demo-basic-affix',
        title: 'Basic fixed Anchor',
      },
      {
        key: '3',
        href: '#components-anchor-demo-static',
        title: '静态位置',
      },
      {
        key: '4',
        href: '#components-anchor-demo-customizehighlight',
        title: '自定义锚点高亮',
      },
      {
        key: '5',
        href: '#api',
        title: 'API',
      },
    ]}
  />
);

export default App;
