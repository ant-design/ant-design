import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';

const App: React.FC = () => (
  <>
    <InputNumber prefix="￥" style={{ width: '100%' }} />
    <br />
    <br />
    <InputNumber
      prefix={
        <>
          <div style={{ marginRight: 8 }}>
            <UserOutlined />
          </div>
          ￥
        </>
      }
      style={{ width: '100%' }}
    />
    <br />
    <br />
    <InputNumber prefix="￥" disabled style={{ width: '100%' }} />
    <br />
    <br />
    <InputNumber suffix="RMB" style={{ width: '100%' }} />
  </>
);

export default App;
