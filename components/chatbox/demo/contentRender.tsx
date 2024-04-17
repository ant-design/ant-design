/* eslint-disable react/no-danger */
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Chatbox } from 'antd';
import type { ChatboxProps } from 'antd';
import markdownit from 'markdown-it';

const md = markdownit({ html: true, breaks: true });

const contentRender: ChatboxProps['contentRender'] = (content) => {
  if (!content) {
    return null;
  }
  return <span dangerouslySetInnerHTML={{ __html: md.render(content) }} />;
};

const App: React.FC = () => (
  <Chatbox
    typing
    avatar={<Avatar size={32} icon={<UserOutlined />} />}
    content={'# Title \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n ...'}
    contentRender={contentRender}
  />
);

export default App;
