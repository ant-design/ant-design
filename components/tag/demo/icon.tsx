import React from 'react';
import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { Divider, Flex, Tag } from 'antd';

// Icons from third-party libraries are a bare `<svg>` rather than an `.anticon` wrapper.
// Sizing them in `em` keeps them aligned with the label at any font size.
const StarIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">
    <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
  </svg>
);

const HeartIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">
    <path d="M12 20.7l-1.4-1.3C5.4 14.8 2 11.7 2 8a5 5 0 0 1 10-1.7A5 5 0 0 1 22 8c0 3.7-3.4 6.8-8.6 11.4L12 20.7z" />
  </svg>
);

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
      <Flex gap="small" wrap align="center">
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
      <Flex gap="small" wrap align="center">
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
      <Divider titlePlacement="start">Tag with third-party icon</Divider>
      <Flex gap="small" wrap align="center">
        <Tag icon={<StarIcon />} color="#f50">
          Star
        </Tag>
        <Tag icon={<HeartIcon />} color="#eb2f96">
          Heart
        </Tag>
        <Tag icon={<StarIcon />} closable>
          Closable
        </Tag>
      </Flex>
    </>
  );
};

export default App;
