import React from 'react';
import { Flex } from 'antd';

const boxStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#eee',
  padding: 10,
};

const itemStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  backgroundColor: '#777',
};

const App: React.FC = () => (
  <Flex style={boxStyle} justify="space-around" align="center">
    <div style={itemStyle} />
    <div style={itemStyle} />
    <div style={itemStyle} />
  </Flex>
);

export default App;
