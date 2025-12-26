import React from 'react';
import { PoweroffOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';

const Text1 = () => <>部署</>;
const Text2 = () => <span>部署</span>;
const Text3 = () => <>Submit</>;

const App: React.FC = () => (
  <Flex wrap gap="small">
    <Button>
      <span>
        <span>部署</span>
      </span>
    </Button>
    <Button loading size="small">
      部署
    </Button>
    <Button loading>
      <Text1 />
    </Button>
    <Button loading size="middle">
      <Text2 />
    </Button>
    <Button loading size="large">
      <Text3 />
    </Button>
    <Button loading icon={<PoweroffOutlined />}>
      <Text1 />
    </Button>
    <Button loading={{ icon: <SyncOutlined spin /> }}>按钮</Button>
  </Flex>
);

export default App;
