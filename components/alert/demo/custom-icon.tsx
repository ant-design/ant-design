import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Alert } from 'antd';

const icon = <SmileOutlined />;

const App: React.FC = () => (
  <>
    <Alert icon={icon} message="showIcon = false" type="success" />
    <br />
    <Alert icon={icon} message="Success Tips" type="success" showIcon />
    <br />
    <Alert icon={icon} message="Informational Notes" type="info" showIcon />
    <br />
    <Alert icon={icon} message="Warning" type="warning" showIcon />
    <br />
    <Alert icon={icon} message="Error" type="error" showIcon />
    <br />
    <Alert
      icon={icon}
      message="Success Tips"
      description="Detailed description and advice about successful copywriting."
      type="success"
      showIcon
    />
    <br />
    <Alert
      icon={icon}
      message="Informational Notes"
      description="Additional description and information about copywriting."
      type="info"
      showIcon
    />
    <br />
    <Alert
      icon={icon}
      message="Warning"
      description="This is a warning notice about copywriting."
      type="warning"
      showIcon
    />
    <br />
    <Alert
      icon={icon}
      message="Error"
      description="This is an error message about copywriting."
      type="error"
      showIcon
    />
  </>
);

export default App;
