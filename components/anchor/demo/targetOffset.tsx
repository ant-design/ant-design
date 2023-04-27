import React, { useEffect, useState } from 'react';
import { Anchor } from 'antd';

const App: React.FC = () => {
  const [targetOffset, setTargetOffset] = useState<number | undefined>(undefined);

  useEffect(() => {
    setTargetOffset(window.innerHeight / 2);
  }, []);

  return (
    <Anchor
      targetOffset={targetOffset}
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
};

export default App;
