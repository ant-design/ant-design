import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  console.log('Change:', e.target.value);
};

const App: React.FC = () => (
  <>
    <TextArea
      showCount
      maxLength={100}
      style={{ height: 120, marginBottom: 24 }}
      onChange={onChange}
      placeholder="can resize"
    />
    <TextArea
      showCount
      maxLength={100}
      style={{ height: 120, resize: 'none' }}
      onChange={onChange}
      placeholder="disable resize"
    />
  </>
);

export default App;
