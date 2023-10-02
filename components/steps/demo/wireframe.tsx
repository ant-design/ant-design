import React from 'react';
import { ConfigProvider, Steps } from 'antd';

const description = 'This is a description.';
const App: React.FC = () => (
  <ConfigProvider theme={{ token: { wireframe: true } }}>
    <Steps
      current={1}
      items={[
        {
          title: 'Finished',
          description,
        },
        {
          title: 'In Progress',
          description,
          subTitle: 'Left 00:00:08',
        },
        {
          title: 'Waiting',
          description,
        },
      ]}
    />
  </ConfigProvider>
);

export default App;
