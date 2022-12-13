import React, { useEffect } from 'react';
import { enUS, zhCN, ThemeEditor } from 'antd-token-previewer';
import { Button, ConfigProvider, message, Modal, Typography } from 'antd';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import { Helmet } from 'dumi';
import { css } from '@emotion/react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';
import useLocale from '../../hooks/useLocale';

const locales = {
  cn: {
    title: '主题编辑器',
    save: '保存',
    reset: '重置',
    export: '导出',
    exportDesc: '将下面的 JSON 对象复制到 ConfigProvider 的 theme 属性中即可。',
    saveSuccessfully: '保存成功',
  },
  en: {
    title: 'Theme Editor',
    save: 'Save',
    reset: 'Reset',
    export: 'Export',
    exportDesc: 'Copy the following JSON object to the theme prop of ConfigProvider.',
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
  const [modalApi, modalContextHolder] = Modal.useModal();
  const [locale, lang] = useLocale(locales);

  const [theme, setTheme] = React.useState<ThemeConfig>({});

  useEffect(() => {
    const storedConfig = localStorage.getItem(ANT_DESIGN_V5_THEME_EDITOR_THEME);
    if (storedConfig) {
      setTheme(() => JSON.parse(storedConfig));
    }
  }, []);

  const styles = useStyle();

  const handleSave = () => {
    localStorage.setItem(ANT_DESIGN_V5_THEME_EDITOR_THEME, JSON.stringify(theme));
    messageApi.success(locale.saveSuccessfully);
  };

  const onCopy = (text: string, result: boolean) => {
    if (result) {
      messageApi.success('Copy theme config successfully!');
    } else {
      messageApi.error('Copy failed, please try again.');
    }
  };

  const handleOutput = () => {
    modalApi.info({
      title: locale.export,
      width: 600,
      content: (
        <div>
          <div style={{ color: 'rgba(0,0,0,0.65)' }}>{locale.exportDesc}</div>
          <pre
            style={{
              padding: 12,
              background: '#f5f5f5',
              borderRadius: 4,
              marginTop: 12,
              position: 'relative',
            }}
          >
            <CopyToClipboard text={JSON.stringify(theme, null, 2)} onCopy={onCopy}>
              <Button
                type="text"
                icon={<CopyOutlined />}
                style={{ position: 'absolute', right: 8, top: 8 }}
              />
            </CopyToClipboard>
            {JSON.stringify(theme, null, 2)}
          </pre>
        </div>
      ),
    });
  };

  const handleReset = () => {
    setTheme({});
  };

  return (
    <div>
      <Helmet>
        <title>{`${locale.title} - Ant Design`}</title>
        <meta property="og:title" content={`${locale.title} - Ant Design`} />
      </Helmet>
      {contextHolder}
      {modalContextHolder}
      <ConfigProvider theme={{ inherit: false }}>
        <div css={styles.header}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {locale.title}
          </Typography.Title>
          <div>
            <Button onClick={handleOutput} style={{ marginRight: 8 }}>
              {locale.export}
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
