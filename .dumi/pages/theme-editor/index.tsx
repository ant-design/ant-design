import { ThemeEditor } from 'antd-token-previewer';
import { useContext } from 'react';
import ThemeContext from '../../theme/slots/ThemeContext';
import useLocale from '../../hooks/useLocale';
import { ConfigProvider } from 'antd';

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
  const { setTheme, theme } = useContext(ThemeContext);

  return (
    <div>
      <ConfigProvider theme={{ algorithm: undefined }}>
        <ThemeEditor
          theme={{ name: 'test', key: 'test', config: theme }}
          simple
          style={{ height: 'calc(100vh - 64px)' }}
          onThemeChange={newTheme => {
            setTheme(newTheme.config);
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default CustomTheme;
