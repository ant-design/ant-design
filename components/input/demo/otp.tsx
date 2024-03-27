import React from 'react';
import { Input, Segmented, Space, Typography, type GetProp } from 'antd';

const { Title } = Typography;

type Status = 'default' | 'disabled' | 'warning' | 'error';

const App: React.FC = () => {
  const [status, setStatus] = React.useState<Status>('default');

  const onChange: GetProp<typeof Input.OTP, 'onChange'> = (text) => {
    console.log('onChange:', text);
  };

  const sharedProps = {
    disabled: status === 'disabled',
    onChange,
    status: status === 'error' || status === 'warning' ? status : undefined,
  };

  return (
    <Space direction="vertical">
      <Space>
        <Segmented<Status>
          options={['default', 'disabled', 'warning', 'error']}
          value={status}
          onChange={setStatus}
        />
      </Space>

      <Title level={5}>With formatter (Upcase)</Title>
      <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
      <Title level={5}>With Length</Title>
      <Input.OTP length={8} {...sharedProps} />
      <Title level={5}>With variant</Title>
      <Input.OTP variant="filled" {...sharedProps} />
    </Space>
  );
};

export default App;
