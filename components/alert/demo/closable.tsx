import React from 'react';
import { CloseSquareOutlined } from '@ant-design/icons';
import { Alert } from 'antd';

const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  console.log(e, 'I was closed.');
};

const App: React.FC = () => (
  <>
    <Alert
      title="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
      type="warning"
      closable={{ onClose }}
    />
    <br />
    <Alert
      title="Error Text"
      description="Error Description Error Description Error Description Error Description Error Description Error Description"
      type="error"
      closable={{ onClose }}
    />
    <br />
    <Alert
      title="Error Text"
      description="Error Description Error Description Error Description Error Description Error Description Error Description"
      type="error"
      closable={{
        onClose,
        'aria-label': 'close',
        closeIcon: <CloseSquareOutlined />,
      }}
    />
  </>
);

export default App;
