import React from 'react';
import { InputNumber } from 'antd';

const App: React.FC = () => <InputNumber min={1} max={10} defaultValue={3} bordered={false} />;

export default App;
