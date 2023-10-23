import React from 'react';
import { TimePicker } from 'antd';

const App: React.FC = () => <TimePicker minuteStep={15} secondStep={10} hourStep={1} />;

export default App;
