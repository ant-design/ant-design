import React from 'react';
import { Button, message } from 'antd';

message.config({
  top: '20%',
})

const info = () => {
  message.info('This is a normal message');
};

const App: React.FC = () => (
  <Button type="primary" onClick={info}>
    Static Method
  </Button>
);

export default App;
