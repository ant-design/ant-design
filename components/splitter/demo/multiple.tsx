import React from 'react';
import { Divider, Splitter } from 'antd';

const App: React.FC = () => (
  <Splitter
    style={{
      height: 300,
      borderRadius: '4px',
      border: '1px solid #e5e7eb',
    }}
    items={[
      {
        size: 40,
        content: <Divider>1</Divider>,
        collapsible: true,
      },
      {
        min: 10,
        max: 40,
        resizable: false,
        content: <Divider>2</Divider>,
      },
      {
        content: <Divider>3</Divider>,
      },
      {
        min: 10,
        max: 40,
        content: <Divider>4</Divider>,
      },
    ]}
    onResizeStart={() => {
      console.log('[ onResizeStart ] ===>');
    }}
    onResize={(sizes) => {
      console.log('[ sizes ] ===>', sizes);
    }}
    onResizeEnd={() => {
      console.log('[ onResizeStart ] ===>');
    }}
  />
);

export default App;
