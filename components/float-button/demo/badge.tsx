import { QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <FloatButton shape="square" badge={{ count: 10 }} style={{ right: 234 }} />
    <FloatButton shape="circle" badge={{ count: 10 }} style={{ right: 164 }} />
    <FloatButton.Group shape="circle" style={{ right: 24 }}>
      <FloatButton badge={{ count: 10 }} icon={<QuestionCircleOutlined />} />
      <FloatButton badge={{ count: 10 }} />
      <FloatButton.BackTop badge={{ count: 10 }} visibilityHeight={0} />
    </FloatButton.Group>
    <FloatButton.Group shape="square" style={{ right: 94 }}>
      <FloatButton badge={{ count: 10 }} icon={<QuestionCircleOutlined />} />
      <FloatButton badge={{ count: 10 }} />
      <FloatButton badge={{ count: 10 }} icon={<SyncOutlined />} />
      <FloatButton.BackTop badge={{ count: 10 }} visibilityHeight={0} />
    </FloatButton.Group>
  </>
);

export default App;
