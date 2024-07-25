import React from 'react';
import { Button, Flex } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap={15}>
    <Flex justify="space-between">
      <Button color="default" variant="solid" size="small">
        Solid
      </Button>
      <Button color="default" variant="outlined" size="small">
        Outlined
      </Button>
      <Button color="default" variant="dashed" size="small">
        Dashed
      </Button>
      <Button color="default" variant="filled" size="small">
        Filled
      </Button>
      <Button color="default" variant="text" size="small">
        Text
      </Button>
      <Button color="default" variant="link" size="small">
        Link
      </Button>
    </Flex>
    <Flex justify="space-between">
      <Button color="primary" variant="solid" size="small">
        Solid
      </Button>
      <Button color="primary" variant="outlined" size="small">
        Outlined
      </Button>
      <Button color="primary" variant="dashed" size="small">
        Dashed
      </Button>
      <Button color="primary" variant="filled" size="small">
        Filled
      </Button>
      <Button color="primary" variant="text" size="small">
        Text
      </Button>
      <Button color="primary" variant="link" size="small">
        Link
      </Button>
    </Flex>
    <Flex justify="space-between">
      <Button color="danger" variant="solid" size="small">
        Solid
      </Button>
      <Button color="danger" variant="outlined" size="small">
        Outlined
      </Button>
      <Button color="danger" variant="dashed" size="small">
        Dashed
      </Button>
      <Button color="danger" variant="filled" size="small">
        Filled
      </Button>
      <Button color="danger" variant="text" size="small">
        Text
      </Button>
      <Button color="danger" variant="link" size="small">
        Link
      </Button>
    </Flex>
  </Flex>
);

export default App;
