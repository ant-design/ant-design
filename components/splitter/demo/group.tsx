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
        content: <div>one</div>,
        resizable: false,
      },
      {
        content: (
          <Splitter
            items={[
              {
                content: <div>two</div>,
              },
              {
                content: (
                  <Splitter
                    layout="vertical"
                    items={[
                      {
                        content: <div>three</div>,
                        collapsible: true,
                      },
                      {
                        content: <div>four</div>,
                      },
                    ]}
                  />
                ),
              },
              {
                content: <div>five</div>,
              },
            ]}
          />
        ),
      },
    ]}
  />
);

export default App;
