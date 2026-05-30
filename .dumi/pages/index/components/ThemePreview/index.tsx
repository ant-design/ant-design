import * as React from 'react';
import { BgColorsOutlined, CopyOutlined } from '@ant-design/icons';
import { App, ConfigProvider, Flex, theme } from 'antd';
import { createStyles } from 'antd-style';
import copy from 'antd/lib/_util/copy';
import * as utils from '../../../../theme/utils';
import Link from '../../../../theme/common/Link';
import { useLocation } from 'dumi';

import { DarkContext } from '../../../../hooks/useDark';
import useLocale from '../../../../hooks/useLocale';
import ThemeIcon from '../../../../theme/common/ThemeSwitch/ThemeIcon';
import Group from '../Group';
import ComponentsBlock from '../PreviewPane/Components';
import usePreviewThemes from './previewThemes';
import { generateFullCopyFile } from './themeCodeUtils';

const locales = {
  cn: {
    themeTitle: '定制主题，随心所欲',
    themeDesc: '开放样式算法与语义化结构，让你与 AI 一起轻松定制主题',
    aiGenerate: 'AI 生成',
    aiGenerateDesc: '用一句话描述你想要的风格',
    copyTheme: '复制主题代码',
    copySuccess: '已复制',
    exploreThemes: '探索主题',
  },
  en: {
    themeTitle: 'Flexible theme customization',
    themeDesc:
      'Open style algorithms and semantic structures make it easy for you and AI to customize themes',
    aiGenerate: 'AI Generate',
    aiGenerateDesc: 'Describe your desired style',
    copyTheme: 'Copy theme code',
    copySuccess: 'Copied',
    exploreThemes: 'Explore Themes',
  },
};
const useStyles = createStyles(({ css }) => ({
  container: css({
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  }),

  wrapper: css({
    width: 1320,
    flexDirection: 'column',
    alignItems: 'stretch',
  }),

  // ======= 组件预览区域 =======
  componentsBlockContainer: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }),

  componentsBlock: css({
    width: 1320,
    margin: '0 auto',
  }),
  themeBlock: css({
    height: 20,
    width: 20,
    borderRadius: '50%',
    cursor: 'pointer',
    outline: '1px solid #f5f5f5',
  }),
  buttonBlock: css({
    height: 32,
    width: 32,
    borderRadius: '50%',
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  }),
}));

export interface ThemePreviewProps {
  onOpenPromptDrawer?: () => void;
}

function ThemePreviewContent(props: ThemePreviewProps) {
  const { onOpenPromptDrawer } = props;
  const { pathname, search } = useLocation();
  const isZhCN = utils.isZhCN(pathname);
  const [locale] = useLocale(locales);
  const { styles } = useStyles();
  const isDark = React.use(DarkContext);
  const { message } = App.useApp();
  const { token } = theme.useToken();

  const previewThemes = usePreviewThemes();

  const [activeName, setActiveName] = React.useState(() => previewThemes[0].name);
  const copyTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    const defaultThemeName = isDark ? 'dark' : 'light';
    const targetTheme =
      previewThemes.find((previewTheme) => previewTheme.key === defaultThemeName)?.name ||
      previewThemes[0].name;
    setActiveName(targetTheme);
  }, [isDark]);

  const backgroundPrefetchList = React.useMemo(
    () => previewThemes.map((t) => t.bgImg).filter((img): img is string => !!img),
    [previewThemes],
  );

  const handleThemeClick = (name: string) => setActiveName(name);

  const handleKeyDown = (event: React.KeyboardEvent, name: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleThemeClick(name);
    }
  };

  const activeTheme = previewThemes.find((previewTheme) => previewTheme.name === activeName);

  const handleCopyTheme = async (event: React.MouseEvent) => {
    event.stopPropagation();
    const code = generateFullCopyFile({
      themeConfig: activeTheme!.props!.theme,
      copyCode: activeTheme!.copyCode,
    });
    const success = await copy(code);
    if (success) {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
      message.success(locale.copySuccess);
    }
  };

  React.useEffect(
    () => () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
    },
    [],
  );

  const editPath = utils.getLocalizedPathname('/theme-editor-cn', isZhCN, search);

  return (
    <Group
      title={locale.themeTitle}
      description={locale.themeDesc}
      collapse
      background={isDark ? '#393F4A' : 'linear-gradient(180deg, #ffffff 0%, #F5F8FF 100%)'}
      backgroundPrefetchList={backgroundPrefetchList}
    >
      <Flex className={styles.container} gap={token.paddingLG}>
        <Flex className={styles.wrapper} gap={8}>
          <Flex justify="space-between">
            <div></div>
            <Flex align="center" gap={6}>
              {previewThemes.map((previewTheme: any) => (
                <div
                  key={previewTheme.name}
                  className={styles.themeBlock}
                  role="tab"
                  tabIndex={activeName === previewTheme.name ? 0 : -1}
                  aria-selected={activeName === previewTheme.name}
                  onClick={() => handleThemeClick(previewTheme.name)}
                  onKeyDown={(event) => handleKeyDown(event, previewTheme.name)}
                  style={{
                    backgroundColor: previewTheme.colors[0],
                  }}
                />
              ))}
              <div className={styles.buttonBlock} onClick={handleCopyTheme}>
                <CopyOutlined />
              </div>
              <Link to={editPath}>
                <div className={styles.buttonBlock}>
                  <BgColorsOutlined />
                </div>
              </Link>
              <div className={styles.buttonBlock} onClick={onOpenPromptDrawer}>
                <ThemeIcon />
              </div>
            </Flex>
          </Flex>
          {/* ===== 组件预览区域 ===== */}
          <ComponentsBlock
            isDark={isDark}
            key={activeName}
            bgImg={activeTheme?.bgImg}
            config={activeTheme?.props}
            className={styles.componentsBlock}
            containerClassName={styles.componentsBlockContainer}
          />
        </Flex>
      </Flex>
    </Group>
  );
}

export default function ThemePreview(props: ThemePreviewProps = {}) {
  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <App>
        <ThemePreviewContent {...props} />
      </App>
    </ConfigProvider>
  );
}
