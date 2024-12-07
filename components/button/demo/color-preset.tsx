import React from 'react';
import { Button, ConfigProvider, Flex } from 'antd';
import { useResponsive } from 'antd-style';

const App: React.FC = () => {
  const { xxl } = useResponsive();

  return (
    <ConfigProvider componentSize={xxl ? 'middle' : 'small'}>
      <Flex vertical gap="middle">
        <Flex gap="middle" wrap>
          <Button color="blue" variant="solid">
            Blue
          </Button>
          <Button color="purple" variant="solid">
            Purple
          </Button>
          <Button color="cyan" variant="solid">
            Cyan
          </Button>
          <Button color="green" variant="solid">
            Green
          </Button>
          <Button color="magenta" variant="solid">
            Magenta
          </Button>
        </Flex>
      </Flex>
    </ConfigProvider>
  );
};

export default App;
