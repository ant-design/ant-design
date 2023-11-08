import React from 'react';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';

const Text1 = () => '部署';
const Text2 = () => <span>部署</span>;
const Text3 = () => 'Submit';

const App: React.FC = () => (
  <Flex wrap="wrap" gap="small">
    <Button>
      <span>
        <span>部署</span>
      </span>
    </Button>
    <Button loading>部署</Button>
    <Button loading>
      <Text1 />
    </Button>
    <Button loading>
      <Text2 />
    </Button>
    <Button loading>
      <Text3 />
    </Button>
    <Button loading icon={<PoweroffOutlined />}>
      <Text1 />
    </Button>
    <Button loading>按钮</Button>
  </Flex>
);

export default App;
