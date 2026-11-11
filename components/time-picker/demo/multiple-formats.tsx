import React from 'react';
import { TimePicker } from 'antd';

const App: React.FC = () => <TimePicker format={['HH:mm', 'HHmm']} placeholder="14:30 or 1430" />;

export default App;
