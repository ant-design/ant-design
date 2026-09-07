import React from 'react';
import { CheckOutlined, CloseOutlined, FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { Flex, Switch } from 'antd';

const Demo: React.FC = () => (
  <Flex gap="medium" align="flex-start" justify="flex-start" vertical>
    <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
    <Switch checkedChildren={1} unCheckedChildren={0} defaultChecked />
    <Switch
      defaultChecked
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
    />
    <Switch
      defaultChecked
      checkedChildren={
        <Flex gap={4} justify="flex-start" align="center">
          <SmileOutlined />
          Happy
        </Flex>
      }
      unCheckedChildren={
        <Flex gap={4} justify="flex-start" align="center">
          <FrownOutlined />
          Sad
        </Flex>
      }
    />
  </Flex>
);

export default Demo;
