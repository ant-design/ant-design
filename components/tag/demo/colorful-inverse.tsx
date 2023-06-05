import React from 'react';
import { Space, Tag } from 'antd';

const App: React.FC = () => (
  <Space size={[0, 8]} wrap>
    <Tag color="magenta-inverse">magenta</Tag>
    <Tag color="red-inverse">red</Tag>
    <Tag color="volcano-inverse">volcano</Tag>
    <Tag color="orange-inverse">orange</Tag>
    <Tag color="gold-inverse">gold</Tag>
    <Tag color="lime-inverse">lime</Tag>
    <Tag color="green-inverse">green</Tag>
    <Tag color="cyan-inverse">cyan</Tag>
    <Tag color="blue-inverse">blue</Tag>
    <Tag color="geekblue-inverse">geekblue</Tag>
    <Tag color="purple-inverse">purple</Tag>
  </Space>
);

export default App;
