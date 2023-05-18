import { ConfigProvider, Timeline } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Timeline: {
          tailColor: 'red',
          tailWidth: 10,
          dotBorderWidth: 1,
          dotBg: 'green',
          itemPaddingBottom: 10,
        },
      },
    }}
  >
    <Timeline
      items={[
        {
          children: 'Create a services site 2015-09-01',
        },
        {
          children: 'Solve initial network problems 2015-09-01',
        },
        {
          children: 'Technical testing 2015-09-01',
        },
        {
          children: 'Network problems being solved 2015-09-01',
        },
      ]}
    />
  </ConfigProvider>
);

export default App;
