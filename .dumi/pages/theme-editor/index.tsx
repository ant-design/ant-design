import { css } from '@emotion/react';
import { Button, ConfigProvider, Modal, Spin, Typography, message } from 'antd';
import { ThemeEditor, enUS, zhCN } from 'antd-token-previewer';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import { Helmet } from 'dumi';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import type { JSONContent, TextContent } from 'vanilla-jsoneditor';
import useLocale from '../../hooks/useLocale';

const JSONEditor = React.lazy(() => import('../../theme/common/JSONEditor'));

function isObject(target: any) {
  return Object.prototype.toString.call(target) === '[object Object]';
}

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

const useStyle = () => ({
  header: css({
    display: 'flex',
    height: 56,
    alignItems: 'center',
    padding: '0 24px',
    justifyContent: 'space-between',
    borderBottom: '1px solid #F0F0F0',
  }),
});

const ANT_DESIGN_V5_THEME_EDITOR_THEME = 'ant-design-v5-theme-editor-theme';

const CustomTheme = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [locale, lang] = useLocale(locales);

  const [theme, setTheme] = React.useState<ThemeConfig>({});

  const [editModelOpen, setEditModelOpen] = useState<boolean>(false);
  const [editThemeFormatRight, setEditThemeFormatRight] = useState<boolean>(true);
  const [themeConfigContent, setThemeConfigContent] = useState<JSONContent & TextContent>({
    text: '{}',
    json: undefined,
  });

  useEffect(() => {
    const storedConfig = localStorage.getItem(ANT_DESIGN_V5_THEME_EDITOR_THEME);
    if (storedConfig) {
      const themeConfig = JSON.parse(storedConfig);
      const originThemeConfig = {
        json: themeConfig,
        text: undefined,
      };
      setThemeConfigContent(originThemeConfig);
      setTheme(themeConfig);
    }
  }, []);

  const styles = useStyle();

  const handleSave = () => {
    localStorage.setItem(ANT_DESIGN_V5_THEME_EDITOR_THEME, JSON.stringify(theme));
    messageApi.success(locale.saveSuccessfully);
  };

  const handleEditConfig = () => {
    setEditModelOpen(true);
  };

  const editModelClose = useCallback(() => {
    setEditModelOpen(false);
  }, [themeConfigContent]);

  const handleEditConfigChange = (newcontent, preContent, status) => {
    setThemeConfigContent(newcontent);
    setEditThemeFormatRight(!status.contentErrors);
  };

  const editSave = useCallback(() => {
    const contentFormatError = !editThemeFormatRight;

    if (contentFormatError) {
      message.error(locale.editJsonContentTypeError);
      return;
    }
    const themeConfig = themeConfigContent.text
      ? JSON.parse(themeConfigContent.text)
      : themeConfigContent.json;
    if (!isObject(themeConfig)) {
      message.error(locale.editJsonContentTypeError);
      return;
    }
    setTheme(themeConfig);
    editModelClose();
    messageApi.success(locale.editSuccessfully);
  }, [themeConfigContent, editThemeFormatRight]);

  const handleExport = () => {
    const file = new File([JSON.stringify(theme, null, 2)], `Ant Design Theme.json`, {
      type: 'text/json; charset=utf-8;',
    });
    const tmpLink = document.createElement('a');
    const objectUrl = URL.createObjectURL(file);

    tmpLink.href = objectUrl;
    tmpLink.download = file.name;
    document.body.appendChild(tmpLink);
    tmpLink.click();

    document.body.removeChild(tmpLink);
    URL.revokeObjectURL(objectUrl);
  };

  return (
    <div>
      <Helmet>
        <title>{`${locale.title} - Ant Design`}</title>
        <meta property="og:title" content={`${locale.title} - Ant Design`} />
      </Helmet>
      {contextHolder}
      <ConfigProvider theme={{ inherit: false }}>
        <div css={styles.header}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {locale.title}
          </Typography.Title>
          <div>
            <Modal
              open={editModelOpen}
              title={locale.editModelTitle}
              width={600}
              okText={locale.save}
              onOk={editSave}
              onCancel={editModelClose}
            >
              <Suspense
                fallback={
                  <div style={{ textAlign: 'center', width: '100%', padding: '24px 0' }}>
                    <Spin tip={locale.initialEditor} />
                  </div>
                }
              >
                <JSONEditor
                  content={themeConfigContent}
                  onChange={handleEditConfigChange}
                  mainMenuBar={false}
                />
              </Suspense>
            </Modal>
            <Button onClick={handleExport} style={{ marginRight: 8 }}>
              {locale.export}
            </Button>
            <Button onClick={handleEditConfig} style={{ marginRight: 8 }}>
              {locale.edit}
            </Button>
            <Button type="primary" onClick={handleSave}>
              {locale.save}
            </Button>
          </div>
        </div>
        <ThemeEditor
          theme={{ name: 'Custom Theme', key: 'test', config: theme }}
          style={{ height: 'calc(100vh - 64px - 56px)' }}
          onThemeChange={(newTheme) => {
            setTheme(newTheme.config);
          }}
          locale={lang === 'cn' ? zhCN : enUS}
        />
      </ConfigProvider>
    </div>
  );
};

export default CustomTheme;
