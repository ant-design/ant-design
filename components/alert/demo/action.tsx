import React from 'react';
import { Alert, Button, Flex } from 'antd';

const App: React.FC = () => (
  <>
    <Alert
      title="Success Tips"
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
      title="Error Text"
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
      title="Warning Text"
      type="warning"
      action={
        <Button type="text" size="small">
          Done
        </Button>
      }
      closable
    />
    <br />
    <Alert
      title="Info Text"
      description="Info Description Info Description Info Description Info Description"
      type="info"
      action={
        <Flex vertical gap="small" style={{ minWidth: 80 }}>
          <Button size="small" type="primary" block>
            Accept
          </Button>
          <Button size="small" danger ghost block>
            Decline
          </Button>
        </Flex>
      }
      closable
    />
  </>
);

export default App;
