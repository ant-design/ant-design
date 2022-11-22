import { ThemeEditor } from 'antd-token-previewer';
import { useState } from 'react';
import useLocale from '../../hooks/useLocale';
import { ConfigProvider } from 'antd';
import { ThemeConfig } from 'antd/es/config-provider/context';

const locales = {
  cn: {
    title: '主题编辑器',
  },
  en: {
    title: 'Theme Editor',
  },
};

const CustomTheme = () => {
  const [locale] = useLocale(locales);
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
