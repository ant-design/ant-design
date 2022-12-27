import React, { useCallback, useEffect, useState } from 'react';
import { enUS, zhCN, ThemeEditor } from 'antd-token-previewer';
import { Button, ConfigProvider, message, Modal, Typography } from 'antd';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import { Helmet } from 'dumi';
import { css } from '@emotion/react';
import { EditOutlined } from '@ant-design/icons';
import type { JSONContent, TextContent } from 'vanilla-jsoneditor';
import useLocale from '../../hooks/useLocale';
import JSONEditor from './components/JSONEditor';
import { isObject } from './components/utils';

const locales = {
  cn: {
    title: '主题编辑器',
    save: '保存',
    reset: '重置',
    edit: '代码',
    editModelTitle: '编辑主题配置',
    editTitle: '在下方编辑你的主题 JSON 即可',
    editJsonContentTypeError: '主题 JSON 格式错误',
    editSuccessfully: '编辑成功',
    saveSuccessfully: '保存成功',
  },
  en: {
    title: 'Theme Editor',
    save: 'Save',
    reset: 'Reset',
    edit: 'Code',
    editModelTitle: 'edit Theme Config',
    editTitle: 'Edit your theme JSON below',
    editJsonContentTypeError: 'The theme of the JSON format is incorrect',
    editSuccessfully: 'Edited successfully',
    saveSuccessfully: 'Saved successfully',
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
      setTheme(() => JSON.parse(storedConfig));
    }
  }, []);

  useEffect(() => {
    if (editModelOpen === true) return;
    setThemeConfigContent({
      json: theme as any,
      text: undefined,
    });
  }, [theme, editModelOpen]);

  const styles = useStyle();

  const handleSave = () => {
    localStorage.setItem(ANT_DESIGN_V5_THEME_EDITOR_THEME, JSON.stringify(theme));
    messageApi.success(locale.saveSuccessfully);
  };

  const handleReset = () => {
    setTheme({});
  };

  const handleEditConfig = () => {
    setEditModelOpen(true);
  };

  const editModelClose = useCallback(() => {
    setEditModelOpen(false);
  }, [themeConfigContent]);

  const handleEditConfigChange = (newcontent, preContent, status) => {
    setThemeConfigContent(newcontent);
    if (
      Array.isArray(status.contentErrors.validationErrors) &&
      status.contentErrors.validationErrors.length === 0
    ) {
      setEditThemeFormatRight(true);
    } else {
      setEditThemeFormatRight(false);
    }
  };

  const editSave = useCallback(() => {
    if (!editThemeFormatRight) {
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
  }, [themeConfigContent]);

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
              <div>
                <div style={{ color: 'rgba(0,0,0,0.65)' }}>{locale.editTitle}</div>
                <JSONEditor
                  content={themeConfigContent}
                  onChange={handleEditConfigChange}
                  mainMenuBar={false}
                />
              </div>
            </Modal>
            <Button onClick={handleEditConfig} icon={<EditOutlined />} style={{ marginRight: 8 }}>
              {locale.edit}
            </Button>
            <Button onClick={handleReset} style={{ marginRight: 8 }}>
              {locale.reset}
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
