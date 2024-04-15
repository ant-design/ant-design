/* eslint-disable react/no-danger */
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Chatbox } from 'antd';
import markdownit from 'markdown-it';

const style: React.CSSProperties = {
  maxWidth: '100%',
  padding: '12px 16px',
  backgroundColor: '#f0f2f5',
  border: '1px solid #d9d9d9',
};

const md = markdownit({ html: true, breaks: true, typographer: true });

const App: React.FC = () => {
  const contentRender = React.useCallback((content?: string) => {
    if (!content) {
      return null;
    }
    return <div style={style} dangerouslySetInnerHTML={{ __html: md.render(content) }} />;
  }, []);
  return (
    <Chatbox
      avatar={<Avatar size={32} icon={<UserOutlined />} />}
      content={'# Title \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n ...'}
      contentRender={contentRender}
    />
  );
};

export default App;
