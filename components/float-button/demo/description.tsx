import React from 'react';
import { FileTextOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton
      icon={<FileTextOutlined />}
      description="HELP INFO"
      shape="square"
      style={{ insetInlineEnd: 24 }}
    />
    <FloatButton description="HELP INFO" shape="square" style={{ insetInlineEnd: 94 }} />
    <FloatButton
      icon={<FileTextOutlined />}
      description="HELP"
      shape="square"
      style={{ insetInlineEnd: 164 }}
    />
  </>
);

export default App;
