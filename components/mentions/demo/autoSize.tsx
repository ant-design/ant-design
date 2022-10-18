import React from 'react';
import { Mentions } from 'antd';

const { Option } = Mentions;

const App: React.FC = () => (
  <Mentions autoSize style={{ width: '100%' }}>
    <Option value="afc163">afc163</Option>
    <Option value="zombieJ">zombieJ</Option>
    <Option value="yesmeck">yesmeck</Option>
  </Mentions>
);

export default App;
