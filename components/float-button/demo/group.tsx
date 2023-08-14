import React from 'react';
import { QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton.Group shape="circle" style={{ right: 24 }}>
      <FloatButton icon={<QuestionCircleOutlined />} />
      <FloatButton />
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>
    <FloatButton.Group shape="square" style={{ right: 94 }}>
      <FloatButton icon={<QuestionCircleOutlined />} />
      <FloatButton />
      <FloatButton icon={<SyncOutlined />} />
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>
  </>
);

export default App;
