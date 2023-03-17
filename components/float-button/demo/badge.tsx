import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <FloatButton shape="circle" badge={{ count: 5 }} style={{ right: 24 + 70 }} />
    <FloatButton shape="circle" badge={{ dot: true }} style={{ right: 24 + 70 + 70 }} />
    <FloatButton.Group shape="circle" style={{ right: 24 }}>
      <FloatButton badge={{ count: 12 }} icon={<QuestionCircleOutlined />} />
      <FloatButton badge={{ count: 123, overflowCount: 999 }} />
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>
  </>
);

export default App;
