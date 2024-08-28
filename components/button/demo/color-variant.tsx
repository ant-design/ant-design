import React from 'react';
import { Button, ConfigProvider, Flex } from 'antd';

const App: React.FC = () => (
  <ConfigProvider componentSize="small">
    <Flex vertical gap={15}>
      <Flex justify="space-between">
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
      <Flex justify="space-between">
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
      <Flex justify="space-between">
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
    </Flex>
  </ConfigProvider>
);

export default App;
