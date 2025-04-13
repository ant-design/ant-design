import React from 'react';
import { Button, ConfigProvider, Flex } from 'antd';
import { useResponsive } from 'antd-style';

const App: React.FC = () => {
  const { xxl } = useResponsive();

  return (
    <ConfigProvider componentSize={xxl ? 'middle' : 'small'}>
      <Flex vertical gap="small">
        <Flex gap="small" wrap>
          <Button color="default" variant="solid">
            Solid
          </Button>
          <Button color="default" variant="outlined">
            Outlined
          </Button>
          <Button color="default" variant="dashed">
            Dashed
          </Button>
          <Button color="default" variant="filled">
            Filled
          </Button>
          <Button color="default" variant="text">
            Text
          </Button>
          <Button color="default" variant="link">
            Link
          </Button>
        </Flex>
        <Flex gap="small" wrap>
          <Button color="primary" variant="solid">
            Solid
          </Button>
          <Button color="primary" variant="outlined">
            Outlined
          </Button>
          <Button color="primary" variant="dashed">
            Dashed
          </Button>
          <Button color="primary" variant="filled">
            Filled
          </Button>
          <Button color="primary" variant="text">
            Text
          </Button>
          <Button color="primary" variant="link">
            Link
          </Button>
        </Flex>
        <Flex gap="small" wrap>
          <Button color="danger" variant="solid">
            Solid
          </Button>
          <Button color="danger" variant="outlined">
            Outlined
          </Button>
          <Button color="danger" variant="dashed">
            Dashed
          </Button>
          <Button color="danger" variant="filled">
            Filled
          </Button>
          <Button color="danger" variant="text">
            Text
          </Button>
          <Button color="danger" variant="link">
            Link
          </Button>
        </Flex>
        <Flex gap="small" wrap>
          <Button color="pink" variant="solid">
            Solid
          </Button>
          <Button color="pink" variant="outlined">
            Outlined
          </Button>
          <Button color="pink" variant="dashed">
            Dashed
          </Button>
          <Button color="pink" variant="filled">
            Filled
          </Button>
          <Button color="pink" variant="text">
            Text
          </Button>
          <Button color="pink" variant="link">
            Link
          </Button>
        </Flex>
        <Flex gap="small" wrap>
          <Button color="purple" variant="solid">
            Solid
          </Button>
          <Button color="purple" variant="outlined">
            Outlined
          </Button>
          <Button color="purple" variant="dashed">
            Dashed
          </Button>
          <Button color="purple" variant="filled">
            Filled
          </Button>
          <Button color="purple" variant="text">
            Text
          </Button>
          <Button color="purple" variant="link">
            Link
          </Button>
        </Flex>
        <Flex gap="small" wrap>
          <Button color="cyan" variant="solid">
            Solid
          </Button>
          <Button color="cyan" variant="outlined">
            Outlined
          </Button>
          <Button color="cyan" variant="dashed">
            Dashed
          </Button>
          <Button color="cyan" variant="filled">
            Filled
          </Button>
          <Button color="cyan" variant="text">
            Text
          </Button>
          <Button color="cyan" variant="link">
            Link
          </Button>
        </Flex>
      </Flex>
    </ConfigProvider>
  );
};

export default App;
