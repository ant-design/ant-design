import React, { useState } from 'react';
import { Flex, Tag, message, Switch } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { CheckableTag } = Tag;

const App: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Books']);

  const handleClick = (tagName: string) => {
    console.log(`Tag ${tagName} clicked`);
    message.info(`Tag ${tagName} clicked`);
  };

  const handleClose = (tagName: string) => {
    console.log(`Tag ${tagName} closed`);
    message.info(`Tag ${tagName} closed`);
  };

  const handleCheckableChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
    message.info(`${tag} is ${checked ? 'checked' : 'unchecked'}`);
  };

  return (
    <Flex vertical gap="middle">
      <Flex gap="small" align="center">
        <Switch
          checked={isDisabled}
          onChange={setIsDisabled}
          checkedChildren="Disabled"
          unCheckedChildren="Enabled"
        />
      </Flex>

      <Flex gap="small" wrap>
        <Tag disabled={isDisabled} onClick={() => handleClick('Basic')}>
          Basic Tag
        </Tag>
        <Tag disabled={isDisabled} onClick={() => handleClick('Link')}>
          <a href="https://ant.design">Link Tag</a>
        </Tag>
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
        <Tag disabled={isDisabled} color="success" onClick={() => handleClick('Success')}>
          Preset Status Success
        </Tag>
      </Flex>

      <Flex gap="small" wrap>
        {['Books', 'Movies', 'Music'].map((tag) => (
          <CheckableTag
            key={tag}
            disabled={isDisabled}
            checked={selectedTags.includes(tag)}
            onChange={(checked) => handleCheckableChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
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
