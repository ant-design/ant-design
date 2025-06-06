import React from 'react';
import { ConfigProvider, Timeline } from 'antd';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Timeline: {
          tailColor: 'red',
          tailWidth: 10,
          dotBorderWidth: 1,
          dotBg: 'yellow',
          dotSize: 20,
          itemPaddingBottom: 10,
        },
      },
    }}
  >
    <Timeline
      items={[
        {
          content: 'Create a services site 2015-09-01',
        },
        {
          content: 'Solve initial network problems 2015-09-01',
        },
        {
          content: 'Technical testing 2015-09-01',
        },
        {
          content: 'Network problems being solved 2015-09-01',
        },
      ]}
    />
  </ConfigProvider>
);

export default App;
