import React from 'react';
import { Timeline } from 'antd';

const App: React.FC = () => (
  <Timeline
    items={[
      {
        content: 'Create a services site 2015-09-01',
      },
      {
        content: 'Solve initial network problems 2015-09-01',
        styles: {
          root: {
            height: 100,
          },
          rail: {
            borderStyle: 'dashed',
          },
        },
      },
      {
        content: '...for a long time...',
        styles: {
          root: {
            height: 100,
          },
          rail: {
            borderStyle: 'dashed',
          },
          content: {
            opacity: 0.45,
          },
        },
      },
      {
        content: 'Technical testing 2015-09-01',
      },

      {
        content: 'Network problems being solved 2015-09-01',
      },
    ]}
  />
);

export default App;
