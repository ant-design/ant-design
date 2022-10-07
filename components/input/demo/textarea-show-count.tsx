import { Input } from 'antd';
import React from 'react';

const { TextArea } = Input;

const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  console.log('Change:', e.target.value);
};

const App: React.FC = () => (
  <TextArea showCount maxLength={100} style={{ height: 120 }} onChange={onChange} />
);

export default App;
