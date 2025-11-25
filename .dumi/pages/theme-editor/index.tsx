import React, { Suspense } from 'react';
import { App, Button, ConfigProvider, Skeleton, version } from 'antd';
import { createStyles } from 'antd-style';
import { enUS, zhCN } from 'antd-token-previewer';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import { Helmet } from 'dumi';

import useLocale from '../../hooks/useLocale';

const ThemeEditor = React.lazy(() => import('antd-token-previewer/lib/ThemeEditor'));

const useStyle = createStyles(({ css }) => ({
  editor: css`
    svg,
    img {
      display: inline;
    }
  `,
}));

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

const [antdMajor] = version.split('.');
const ANT_DESIGN_V5_THEME_EDITOR_THEME = `ant-design-v${antdMajor}-theme-editor-theme`;

const CustomTheme: React.FC = () => {
  const { message } = App.useApp();
  const [locale, lang] = useLocale(locales);
  const { styles } = useStyle();

  const [theme, setTheme] = React.useState<ThemeConfig>(() => {
    try {
      const storedConfig = localStorage.getItem(ANT_DESIGN_V5_THEME_EDITOR_THEME);
      return storedConfig ? JSON.parse(storedConfig) : {};
    } catch {
      return {};
    }
  });

  const handleSave = () => {
    localStorage.setItem(ANT_DESIGN_V5_THEME_EDITOR_THEME, JSON.stringify(theme));
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
            theme={{ name: 'Custom Theme', key: 'test', config: theme }}
            style={{ height: 'calc(100vh - 64px)' }}
            className={styles.editor}
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
        </ConfigProvider>
      </Suspense>
    </div>
  );
};

export default CustomTheme;
