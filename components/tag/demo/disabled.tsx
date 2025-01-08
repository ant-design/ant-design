import React, { useState } from 'react';
import { Flex, Tag, message } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { CheckableTag } = Tag;

const App: React.FC = () => {
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
      <Flex gap="small" wrap>
        <Tag disabled onClick={() => handleClick('Basic')}>
          Basic Tag
        </Tag>
        <Tag disabled onClick={() => handleClick('Link')}>
          <a href="https://ant.design">Link Tag</a>
        </Tag>
        <Tag
          disabled
          color="success"
          icon={<CheckCircleOutlined />}
          onClick={() => handleClick('Success')}
        >
          Icon Tag
        </Tag>
      </Flex>

      <Flex gap="small" wrap>
        <Tag disabled color="red" onClick={() => handleClick('Red')}>
          Preset Color Red
        </Tag>
        <Tag disabled color="#f50" onClick={() => handleClick('#f50')}>
          Custom Color #f50
        </Tag>
        <Tag disabled color="success" onClick={() => handleClick('Success')}>
          Preset Status Success
        </Tag>
      </Flex>

      <Flex gap="small" wrap>
        {['Books', 'Movies', 'Music'].map((tag) => (
          <CheckableTag
            key={tag}
            disabled
            checked={selectedTags.includes(tag)}
            onChange={(checked) => handleCheckableChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </Flex>

      <Flex gap="small" wrap>
        <Tag
          disabled
          closable
          onClick={() => handleClick('Closable')}
          onClose={() => handleClose('Closable')}
        >
          Closable Tag
        </Tag>
        <Tag
          disabled
          closable
          color="success"
          icon={<CheckCircleOutlined />}
          onClick={() => handleClick('Closable Success')}
          onClose={() => handleClose('Closable Success')}
        >
          Closable with Icon
        </Tag>
        <Tag disabled closable closeIcon={<CloseCircleOutlined />}>
          Closable with Custom Icon
        </Tag>
      </Flex>

      <Flex gap="small" wrap>
        <Tag disabled bordered={false} onClick={() => handleClick('Borderless')}>
          Borderless Basic
        </Tag>
        <Tag
          disabled
          bordered={false}
          color="success"
          icon={<CheckCircleOutlined />}
          onClick={() => handleClick('Borderless Success')}
        >
          Borderless with Icon
        </Tag>
        <Tag
          disabled
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
