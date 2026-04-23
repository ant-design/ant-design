import React from 'react';
import { Card } from 'antd';

const App: React.FC = () => (
  <Card
    style={{ width: 300 }}
    cover={<img alt="example" src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
    actions={[<span key="setting">setting</span>, <span key="edit">edit</span>]}
  />
);

export default App;
