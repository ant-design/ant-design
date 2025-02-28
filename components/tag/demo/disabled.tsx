import React, { useState } from 'react';
import { Flex, Tag, message } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { CheckableTag } = Tag;

const App: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(['Books']);

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
        <Tag disabled>Basic Tag</Tag>
        <Tag disabled>
          <a href="https://ant.design">Link Tag</a>
        </Tag>
        <Tag disabled href="https://ant.design">
          Href Tag
        </Tag>
        <Tag disabled color="success" icon={<CheckCircleOutlined />}>
          Icon Tag
        </Tag>
      </Flex>

      <Flex gap="small" wrap>
        <Tag disabled color="red">
          Preset Color Red
        </Tag>
        <Tag disabled color="#f50">
          Custom Color #f50
        </Tag>
        <Tag disabled color="success">
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
        <Tag disabled closable onClose={() => handleClose('Closable')}>
          Closable Tag
        </Tag>
        <Tag
          disabled
          closable
          color="success"
          icon={<CheckCircleOutlined />}
          onClose={() => handleClose('Closable Success')}
        >
          Closable with Icon
        </Tag>
        <Tag disabled closable closeIcon={<CloseCircleOutlined />}>
          Closable with Custom Icon
        </Tag>
      </Flex>

      <Flex gap="small" wrap>
        <Tag disabled bordered={false}>
          Borderless Basic
        </Tag>
        <Tag disabled bordered={false} color="success" icon={<CheckCircleOutlined />}>
          Borderless with Icon
        </Tag>
        <Tag disabled bordered={false} closable onClose={() => handleClose('Borderless Closable')}>
          Borderless Closable
        </Tag>
      </Flex>
    </Flex>
  );
};

export default App;
