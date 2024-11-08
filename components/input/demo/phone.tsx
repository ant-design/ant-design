import React from 'react';
import { Flex, Input, Typography } from 'antd';
import type { GetProps } from 'antd';

type PhoneProps = GetProps<typeof Input.Phone>;

const { Title } = Typography;

const App: React.FC = () => {
  const onChange: PhoneProps['onChange'] = (text) => {
    console.log('onChange:', text);
  };

  return (
    <Flex gap="middle" align="flex-start" vertical>
      <Title level={5}>With custom regions</Title>
      <Input.Phone
        defaultRegion="CN"
        customRegions={[{ value: 'TW', emoji: '🌐' }]}
        onChange={onChange}
      />
    </Flex>
  );
};

export default App;
