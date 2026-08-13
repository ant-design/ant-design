import React from 'react';
import { Flex, Layout, Segmented, theme } from 'antd';

const { Header } = Layout;

const App: React.FC = () => {
  const { token } = theme.useToken();
  const [headerTheme, setHeaderTheme] = React.useState<'light' | 'dark'>('light');

  return (
    <Flex vertical gap="middle">
      <Segmented
        options={['light', 'dark'] as const}
        value={headerTheme}
        onChange={setHeaderTheme}
      />
      <Header
        theme={headerTheme}
        style={{
          color: headerTheme === 'dark' ? token.colorTextLightSolid : undefined,
          textAlign: 'center',
        }}
      >
        Header
      </Header>
    </Flex>
  );
};

export default App;
