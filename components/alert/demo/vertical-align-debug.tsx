import React from 'react';
import { Alert, Button } from 'antd';

const wrapperStyle: React.CSSProperties = {
  width: 360,
};

const alertStyle: React.CSSProperties = {
  marginBlockEnd: 12,
};

const title = 'Long alert title wraps to multiple lines when the alert container is narrow enough.';

const App: React.FC = () => (
  <div style={wrapperStyle}>
    <Alert title={title} type="info" showIcon closable style={alertStyle} />
    <Alert
      title={title}
      type="success"
      showIcon
      closable
      style={alertStyle}
      action={
        <Button size="small" type="text">
          Action
        </Button>
      }
    />
    <Alert
      title={title}
      type="warning"
      showIcon
      closable
      style={alertStyle}
      description="Additional information follows the alert title."
    />
    <Alert
      title={title}
      type="error"
      showIcon
      closable
      description="Additional information follows the alert title."
      action={
        <Button size="small" danger>
          Detail
        </Button>
      }
    />
  </div>
);

export default App;
