import React, { Suspense } from 'react';
import { App, Button, ConfigProvider, Skeleton } from 'antd';
import { enUS, zhCN } from 'antd-token-previewer';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import { Helmet } from 'dumi';

import useLocale from '../../hooks/useLocale';
import useLocalStorage from '../../hooks/useLocalStorage';

const ThemeEditor = React.lazy(() => import('antd-token-previewer/lib/ThemeEditor'));

const locales = {
  cn: {
    title: '主题编辑器',
    save: '保存',
    edit: '编辑',
    export: '导出',
    editModelTitle: '编辑主题配置',
    editJsonContentTypeError: '主题 JSON 格式错误',
    editSuccessfully: '编辑成功',
    saveSuccessfully: '保存成功',
    initialEditor: '正在初始化编辑器...',
  },
  en: {
    title: 'Theme Editor',
    save: 'Save',
    edit: 'Edit',
    export: 'Export',
    editModelTitle: 'edit Theme Config',
    editJsonContentTypeError: 'The theme of the JSON format is incorrect',
    editSuccessfully: 'Edited successfully',
    saveSuccessfully: 'Saved successfully',
    initialEditor: 'Initializing Editor...',
  },
};

const ANT_THEME_EDITOR_THEME = 'ant-theme-editor-theme';

const CustomTheme: React.FC = () => {
  const { message } = App.useApp();
  const [locale, lang] = useLocale(locales);

  const [themeConfig, setThemeConfig] = useLocalStorage<ThemeConfig>(ANT_THEME_EDITOR_THEME, {
    defaultValue: {},
  });

  const handleSave = () => {
    setThemeConfig(themeConfig);
    message.success(locale.saveSuccessfully);
  };

  return (
    <div>
      <Helmet>
        <title>{`${locale.title} - Ant Design`}</title>
        <meta property="og:title" content={`${locale.title} - Ant Design`} />
      </Helmet>
      <Suspense fallback={<Skeleton style={{ margin: 24 }} />}>
        <ConfigProvider theme={{ inherit: false }}>
          <ThemeEditor
            advanced
            hideAdvancedSwitcher
            theme={{ name: 'Custom Theme', key: 'test', config: themeConfig }}
            style={{ height: 'calc(100vh - 64px)' }}
            onThemeChange={(newTheme) => setThemeConfig(newTheme.config)}
            locale={lang === 'cn' ? zhCN : enUS}
            actions={
              <Button type="primary" onClick={handleSave}>
                {locale.save}
              </Button>
            }
          />
        </ConfigProvider>
      </Suspense>
    </div>
  );
};

export default CustomTheme;
