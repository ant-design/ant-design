import React from 'react';
import { Button, ConfigProvider } from 'antd';

const App: React.FC = () => (
  // <Flex gap="small" wrap>
  //   <Button type="primary">Primary Button</Button>
  //   <Button>Default Button</Button>
  //   <Button type="dashed">Dashed Button</Button>
  //   <Button type="text">Text Button</Button>
  //   <Button type="link">Link Button</Button>
  // </Flex>
  <ConfigProvider
    csp={{
      nonce: 'bamboo',
    }}
  >
    <Button />
  </ConfigProvider>
);

export default App;
