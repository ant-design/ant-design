import React from 'react';
import { Input, Space, Typography, type GetProp } from 'antd';

const { Title } = Typography;

const App: React.FC = () => {
  const onChange: GetProp<typeof Input.OTP, 'onChange'> = (text) => {
    console.log('onChange:', text);
  };

  const sharedProps = {
    onChange,
  };

  return (
    <Space direction="vertical">
      <Title level={5}>With formatter (Upcase)</Title>
      <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
      <Title level={5}>With Disabled</Title>
      <Input.OTP disabled {...sharedProps} />
      <Title level={5}>With Length (8)</Title>
      <Input.OTP length={8} {...sharedProps} />
      <Title level={5}>With variant</Title>
      <Input.OTP variant="filled" {...sharedProps} />
    </Space>
  );
};

export default App;
