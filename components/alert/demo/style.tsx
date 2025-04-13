import React from 'react';
import { Alert } from 'antd';

const App: React.FC = () => (
  <>
    <Alert message="Success Text" type="success" />
    <br />
    <Alert message="Info Text" type="info" />
    <br />
    <Alert message="Warning Text" type="warning" />
    <br />
    <Alert message="Error Text" type="error" />
  </>
);

export default App;
