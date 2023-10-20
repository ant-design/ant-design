import { enUS, zhCN } from 'antd-token-previewer';
import { Helmet } from 'dumi';
import React, { Suspense, useEffect } from 'react';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import { Button, message, Skeleton } from 'antd';
import useLocale from '../../hooks/useLocale';

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

const ANT_DESIGN_V5_THEME_EDITOR_THEME = 'ant-design-v5-theme-editor-theme';

const CustomTheme = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [locale, lang] = useLocale(locales);

  const [theme, setTheme] = React.useState<ThemeConfig>({});

  useEffect(() => {
    const storedConfig = localStorage.getItem(ANT_DESIGN_V5_THEME_EDITOR_THEME);
    if (storedConfig) {
      const themeConfig = JSON.parse(storedConfig);
      setTheme(themeConfig);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(ANT_DESIGN_V5_THEME_EDITOR_THEME, JSON.stringify(theme));
    messageApi.success(locale.saveSuccessfully);
  };

  return (
    <div>
      <Helmet>
        <title>{`${locale.title} - Ant Design`}</title>
        <meta property="og:title" content={`${locale.title} - Ant Design`} />
      </Helmet>
      {contextHolder}
      <Suspense fallback={<Skeleton style={{ margin: 24 }} />}>
        <ThemeEditor
          advanced
          hideAdvancedSwitcher
          theme={{ name: 'Custom Theme', key: 'test', config: theme }}
          style={{ height: 'calc(100vh - 64px)' }}
          onThemeChange={(newTheme) => {
            setTheme(newTheme.config);
          }}
          locale={lang === 'cn' ? zhCN : enUS}
          actions={
            <Button type="primary" onClick={handleSave}>
              {locale.save}
            </Button>
          }
        />
      </Suspense>
    </div>
  );
};

export default CustomTheme;
