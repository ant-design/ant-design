import React, { useState } from 'react';
import { ThemeEditor } from 'antd-token-previewer';
import { ConfigProvider } from 'antd';
import type { ThemeConfig } from 'antd/es/config-provider/context';

const CustomTheme = () => {
  const [theme, setTheme] = useState<ThemeConfig>({});

  return (
    <div>
      <ConfigProvider theme={{ inherit: false }}>
        <ThemeEditor
          theme={{ name: 'Custom Theme', key: 'test', config: theme }}
          simple
          style={{ height: 'calc(100vh - 64px)' }}
          onThemeChange={(newTheme) => {
            setTheme(newTheme.config);
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default CustomTheme;
