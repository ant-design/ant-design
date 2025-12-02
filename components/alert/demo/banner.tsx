import React from 'react';
import { Alert } from 'antd';

const App: React.FC = () => (
  <>
    <Alert title="Warning text" banner />
    <br />
    <Alert
      title="Very long warning text warning text text text text text text text"
      banner
      closable
    />
    <br />
    <Alert showIcon={false} title="Warning text without icon" banner />
    <br />
    <Alert type="error" title="Error text" banner />
  </>
);

export default App;
