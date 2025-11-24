import React from 'react';
import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { Divider, Flex, Tag } from 'antd';

const App: React.FC = () => {
  const [checked, setChecked] = React.useState<Array<boolean>>([true, false, false, false]);

  const handleChange = (index: number, value: boolean) => {
    const newChecked = [...checked];
    newChecked[index] = value;
    setChecked(newChecked);
  };

  return (
    <>
      <Divider titlePlacement="start">Tag with icon</Divider>
      <Flex gap="4px 0" wrap align="center">
        <Tag icon={<TwitterOutlined />} color="#55acee">
          Twitter
        </Tag>
        <Tag icon={<YoutubeOutlined />} color="#cd201f">
          Youtube
        </Tag>
        <Tag icon={<FacebookOutlined />} color="#3b5999">
          Facebook
        </Tag>
        <Tag icon={<LinkedinOutlined />} color="#55acee">
          LinkedIn
        </Tag>
      </Flex>
      <Divider titlePlacement="start">CheckableTag with icon</Divider>
      <Flex gap="4px 0" wrap align="center">
        <Tag.CheckableTag
          icon={<TwitterOutlined />}
          checked={checked[0]}
          onChange={(checked) => handleChange(0, checked)}
        >
          Twitter
        </Tag.CheckableTag>
        <Tag.CheckableTag
          icon={<YoutubeOutlined />}
          checked={checked[1]}
          onChange={(checked) => handleChange(1, checked)}
        >
          Youtube
        </Tag.CheckableTag>
        <Tag.CheckableTag
          icon={<FacebookOutlined />}
          checked={checked[2]}
          onChange={(checked) => handleChange(2, checked)}
        >
          Facebook
        </Tag.CheckableTag>
        <Tag.CheckableTag
          icon={<LinkedinOutlined />}
          checked={checked[3]}
          onChange={(checked) => handleChange(3, checked)}
        >
          LinkedIn
        </Tag.CheckableTag>
      </Flex>
    </>
  );
};

export default App;
