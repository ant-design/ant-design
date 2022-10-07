/*
 * iframe: 360 */import React from 'react';
import { FloatButton } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

const App: React.FC = () => (
  <>
    <FloatButton
      icon={<FileTextOutlined />}
      description="帮助文档"
      shape="square"
      style={{ right: 24 }}
    />
    <FloatButton description="帮助文档" shape="square" style={{ right: 94 }} />
    <FloatButton
      icon={<FileTextOutlined />}
      description="文档"
      shape="square"
      style={{ right: 164 }}
    />
  </>
);

export default App;
