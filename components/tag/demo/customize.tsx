import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Flex, Tag } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" align="center" wrap>
    <Tag closable closeIcon="关 闭">
      Tag1
    </Tag>
    <Tag closable closeIcon={<CloseCircleOutlined />}>
      Tag2
    </Tag>
  </Flex>
);

export default App;
