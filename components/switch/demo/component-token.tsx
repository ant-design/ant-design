import { ConfigProvider, Space, Switch } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Switch: {
          height: 24,
          heightSM: 18,
          minWidth: 40,
          minWidthSM: 36,
          opacityLoading: 0.1,
          color: '#1569EE',
          padding: 10,
          innerMarginMin: 4,
          innerMarginMinSM: 2,
          innerMarginMax: 8,
          innerMarginMaxSM: 6,
        },
      },
    }}
  >
    <Space>
      <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
    </Space>
    <Space>
      <Switch disabled defaultChecked />
    </Space>
  </ConfigProvider>
);

export default App;
