import { QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, FloatButton } from 'antd';
import { random } from 'lodash';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [number, setNumber] = useState<number>(5);
  return (
    <>
      <Button type="primary" style={{ margin: 16 }} onClick={() => setNumber(random(0, 100))}>
        change value
      </Button>
      <FloatButton shape="square" badge={{ count: number }} style={{ right: 234 }} />
      <FloatButton shape="circle" badge={{ count: number }} style={{ right: 164 }} />
      <FloatButton
        shape="square"
        badge={{ count: number, dot: true }}
        style={{ right: 234, bottom: 108 }}
      />
      <FloatButton
        shape="circle"
        badge={{ count: number, dot: true }}
        style={{ right: 164, bottom: 108 }}
      />
      <FloatButton.Group shape="circle" style={{ right: 24 }}>
        <FloatButton badge={{ count: number }} icon={<QuestionCircleOutlined />} />
        <FloatButton badge={{ count: number }} />
        <FloatButton.BackTop badge={{ count: number }} visibilityHeight={0} />
      </FloatButton.Group>
      <FloatButton.Group shape="square" style={{ right: 94 }}>
        <FloatButton badge={{ count: number }} icon={<QuestionCircleOutlined />} />
        <FloatButton badge={{ count: number }} />
        <FloatButton badge={{ count: number }} icon={<SyncOutlined />} />
        <FloatButton.BackTop badge={{ count: number }} visibilityHeight={0} />
      </FloatButton.Group>
    </>
  );
};

export default App;
