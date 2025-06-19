import React from 'react';
import { FileTextOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton
      icon={<FileTextOutlined />}
      content="HELP INFO"
      shape="square"
      style={{ insetInlineEnd: 24 }}
    />
    <FloatButton content="HELP INFO" shape="square" style={{ insetInlineEnd: 94 }} />
    <FloatButton
      icon={<FileTextOutlined />}
      content="HELP"
      shape="square"
      style={{ insetInlineEnd: 164 }}
    />
  </>
);

export default App;
