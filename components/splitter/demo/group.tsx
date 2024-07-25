import React from 'react';
import { Splitter } from 'antd';

const App: React.FC = () => (
  <Splitter
    layout="vertical"
    style={{
      height: 300,
      borderRadius: '4px',
      border: '1px solid #e5e7eb',
    }}
    items={[
      {
        content: <div>111</div>,
      },
      {
        content: (
          <Splitter
            items={[
              {
                content: <div>222</div>,
              },
              {
                content: (
                  <Splitter
                    layout="vertical"
                    items={[
                      {
                        content: <div>333</div>,
                      },
                      {
                        content: <div>444</div>,
                      },
                    ]}
                  />
                ),
              },
              {
                content: <div>555</div>,
              },
            ]}
          />
        ),
      },
    ]}
  />
);

export default App;
