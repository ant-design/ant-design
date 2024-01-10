import React from 'react';
import { Button, ConfigProvider } from 'antd';

const Main = () => (
  <ConfigProvider
    componentSize="small"
    theme={{
      // token: { fontSize: 12 },
      components: { Button: { contentFontSizeSM: 12 } },
      // components: { Button: { sm: { fontSize: 12 }, ghost: { colorBgBase: 'red' } } },
      // components: {
      //   Button: ({ size, ghost }) => {
      //     const _theme = {};
      //     if (size) {
      //       _theme.fontSize = 12;
      //     }
      //     if (ghost) {
      //       _theme.colorBgBase = 'red';
      //     }
      //     return _theme;
      //   },
      // },
    }}
  >
    <Button>
      哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
    </Button>
  </ConfigProvider>
);

export default Main;
