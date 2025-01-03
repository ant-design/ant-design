import React, { useState } from 'react';
import { Flex, Tag, message, Switch } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClick = (tagName: string) => {
    console.log(`Tag ${tagName} clicked`);
    message.info(`Tag ${tagName} clicked`);
  };

  const handleClose = (tagName: string) => {
    console.log(`Tag ${tagName} closed`);
    message.info(`Tag ${tagName} closed`);
  };

  return (
    <Flex vertical gap="middle">
      {/* 禁用状态开关 */}
      <Flex gap="small" align="center">
        <Switch
          checked={isDisabled}
          onChange={setIsDisabled}
          checkedChildren="Disabled"
          unCheckedChildren="Enabled"
        />
        <span>Toggle disabled state</span>
      </Flex>

      <Flex gap="small" wrap>
        <Tag disabled={isDisabled} onClick={() => handleClick('Basic')}>
          Basic Tag
        </Tag>
        <Tag disabled={isDisabled} onClick={() => handleClick('Click Test')}>
          Disabled Click
        </Tag>
      </Flex>

      <Flex gap="small" wrap>
        <Tag disabled={isDisabled} onClick={() => handleClick('Link')}>
          <a href="https://ant.design">Link Tag</a>
        </Tag>
      </Flex>

      <Flex gap="small" wrap>
        <Tag
          disabled={isDisabled}
          color="success"
          icon={<CheckCircleOutlined />}
          onClick={() => handleClick('Success')}
        >
          Icon Tag
        </Tag>
      </Flex>

      <Flex gap="small" wrap>
        <Tag disabled={isDisabled} color="red" onClick={() => handleClick('Red')}>
          Preset Color Red
        </Tag>
        <Tag disabled={isDisabled} color="#f50" onClick={() => handleClick('#f50')}>
          Custom Color #f50
        </Tag>
      </Flex>

      <Flex gap="small" wrap>
        <Tag
          disabled={isDisabled}
          closable
          onClick={() => handleClick('Closable')}
          onClose={() => handleClose('Closable')}
        >
          Closable Tag
        </Tag>
        <Tag
          disabled={isDisabled}
          closable
          color="success"
          icon={<CheckCircleOutlined />}
          onClick={() => handleClick('Closable Success')}
          onClose={() => handleClose('Closable Success')}
        >
          Closable with Icon
        </Tag>
      </Flex>

      <Flex gap="small" wrap>
        <Tag disabled={isDisabled} bordered={false} onClick={() => handleClick('Borderless')}>
          Borderless Basic
        </Tag>
        <Tag
          disabled={isDisabled}
          bordered={false}
          color="success"
          icon={<CheckCircleOutlined />}
          onClick={() => handleClick('Borderless Success')}
        >
          Borderless with Icon
        </Tag>
        <Tag
          disabled={isDisabled}
          bordered={false}
          closable
          onClick={() => handleClick('Borderless Closable')}
          onClose={() => handleClose('Borderless Closable')}
        >
          Borderless Closable
        </Tag>
      </Flex>
    </Flex>
  );
};

export default App;
