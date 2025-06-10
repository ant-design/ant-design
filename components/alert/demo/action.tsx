import React from 'react';
import { Alert, Button, Space } from 'antd';

const App: React.FC = () => (
  <>
    <Alert
      message="Success Tips"
      type="success"
      showIcon
      action={
        <Button size="small" type="text">
          UNDO
        </Button>
      }
      closable
    />
    <br />
    <Alert
      message="Error Text"
      showIcon
      description="Error Description Error Description Error Description Error Description"
      type="error"
      action={
        <Button size="small" danger>
          Detail
        </Button>
      }
    />
    <br />
    <Alert
      message="Warning Text"
      type="warning"
      action={
        <Space>
          <Button type="text" size="small">
            Done
          </Button>
        </Space>
      }
      closable
    />
    <br />
    <Alert
      message="Info Text"
      description="Info Description Info Description Info Description Info Description"
      type="info"
      action={
        <Space direction="vertical">
          <Button size="small" type="primary">
            Accept
          </Button>
          <Button size="small" danger ghost>
            Decline
          </Button>
        </Space>
      }
      closable
    />
  </>
);

export default App;
