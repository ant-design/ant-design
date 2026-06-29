import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Alert } from 'antd';

const icon = <SmileOutlined />;

const App: React.FC = () => (
  <>
    <Alert icon={icon} title="showIcon = false" type="success" />
    <br />
    <Alert icon={icon} title="Success Tips" type="success" showIcon />
    <br />
    <Alert icon={icon} title="Informational Notes" type="info" showIcon />
    <br />
    <Alert icon={icon} title="Warning" type="warning" showIcon />
    <br />
    <Alert icon={icon} title="Error" type="error" showIcon />
    <br />
    <Alert
      icon={icon}
      title="Success Tips"
      description="Detailed description and advice about successful copywriting."
      type="success"
      showIcon
    />
    <br />
    <Alert
      icon={icon}
      title="Informational Notes"
      description="Additional description and information about copywriting."
      type="info"
      showIcon
    />
    <br />
    <Alert
      icon={icon}
      title="Warning"
      description="This is a warning notice about copywriting."
      type="warning"
      showIcon
    />
    <br />
    <Alert
      icon={icon}
      title="Error"
      description="This is an error message about copywriting."
      type="error"
      showIcon
    />
  </>
);

export default App;
