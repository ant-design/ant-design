import * as React from 'react';
import { BgColorsOutlined, CopyOutlined } from '@ant-design/icons';
import { App, ConfigProvider, Flex, theme, Tooltip } from 'antd';
import { createStyles } from 'antd-style';
import copy from 'antd/lib/_util/copy';
import { Link, useLocation } from 'dumi';

import { DarkContext } from '../../../../hooks/useDark';
import useLocale from '../../../../hooks/useLocale';
import ThemeIcon from '../../../../theme/common/ThemeSwitch/ThemeIcon';
import * as utils from '../../../../theme/utils';
import Group from '../Group';
import ComponentsBlock from '../PreviewPane/Components';
import usePreviewThemes from './previewThemes';
import { generateFullCopyFile } from './themeCodeUtils';

const locales = {
  cn: {
    themeTitle: '定制主题，随心所欲',
    themeDesc: '开放样式算法与语义化结构，让你与 AI 一起轻松定制主题',
    aiGenerate: 'AI 主题生成',
    aiGenerateDesc: '用一句话描述你想要的风格',
    copyTheme: '复制主题代码',
    copySuccess: '已复制',
    exploreThemes: '探索主题',
    editTheme: '主题编辑',
    contribution: '贡献',
  },
  en: {
    themeTitle: 'Flexible theme customization',
    themeDesc:
      'Open style algorithms and semantic structures make it easy for you and AI to customize themes',
    aiGenerate: 'AI Theme Generator',
    aiGenerateDesc: 'Describe your desired style',
    copyTheme: 'Copy theme code',
    copySuccess: 'Copied',
    exploreThemes: 'Explore Themes',
    editTheme: 'Theme Editor',
    contribution: 'Contribution',
  },
};
const useStyles = createStyles(({ css, cssVar }) => ({
  container: css({
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  }),

  wrapper: css({
    width: '100%',
    maxWidth: 1320,
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
    width: '100%',
    maxWidth: 1320,
    margin: '0 auto',
  }),
  themeBlock: css({
    height: 20,
    width: 20,
    fontSize: 20,
    borderRadius: '50%',
    cursor: 'pointer',
    backgroundSize: '75%',
    boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    outline: `2px solid ${cssVar.colorBgLayout}`,
    transition: `transform ${cssVar.motionDurationFast}, opacity ${cssVar.motionDurationSlow}`,
    '&:hover, &:focus-within': {
      outline: `2px solid ${cssVar.colorPrimaryBorder}`,
      transform: 'scale(1.1)',
    },
  }),
  active: css({
    outline: `2px solid ${cssVar.colorPrimaryBorder}`,
  }),
  switch: css({
    '@media (max-width: 1200px)': {
      justifyContent: 'center',
    },
  }),
  buttonBlock: css({
    height: 28,
    width: 28,
    borderRadius: '50%',
    fontSize: 15,
    color: cssVar.colorPrimaryBorder,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: cssVar.colorBgLayout,
    },
    '@media (max-width: 1200px)': {
      display: 'none',
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

  const previewThemes = usePreviewThemes();

  const [activeName, setActiveName] = React.useState(
    () => previewThemes?.find((theme) => theme.key === 'light')?.name,
  );
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

  const background = activeTheme?.bgImg
    ? activeTheme.bgImg
    : 'linear-gradient(180deg, #ffffff 0%, #F5F8FF 100%)';

  return (
    <Group
      title={locale.themeTitle}
      description={locale.themeDesc}
      collapse
      titleColor={activeTheme?.bgImgDark ? '#fff' : undefined}
      background={isDark ? '#393F4A' : background}
      backgroundPrefetchList={backgroundPrefetchList}
    >
      <Flex className={styles.container}>
        <Flex className={styles.wrapper} gap={16}>
          <Flex className={styles.switch} justify="space-between">
            <div></div>
            <Flex align="center" gap={12}>
              {previewThemes.map((previewTheme: any) => (
                <Tooltip placement="top" key={previewTheme.name} title={previewTheme.name}>
                  <div
                    className={`${styles.themeBlock} ${activeName === previewTheme.name ? styles.active : ''}`}
                    role="tab"
                    tabIndex={activeName === previewTheme.name ? 0 : -1}
                    aria-selected={activeName === previewTheme.name}
                    onClick={() => handleThemeClick(previewTheme.name)}
                    onKeyDown={(event) => handleKeyDown(event, previewTheme.name)}
                    style={{
                      backgroundImage: previewTheme.icon ? `url(${previewTheme.icon})` : undefined,
                      backgroundColor: 'rgba(229, 229, 229, 0.7)',
                    }}
                  />
                </Tooltip>
              ))}
              <Tooltip placement="top" title={locale.copyTheme}>
                <div className={styles.buttonBlock} onClick={handleCopyTheme}>
                  <CopyOutlined />
                </div>
              </Tooltip>
              <Tooltip placement="top" title={locale.editTheme}>
                <Link to={editPath} target="_blank" rel="noreferrer" title="editTheme">
                  <div className={styles.buttonBlock}>
                    <BgColorsOutlined />
                  </div>
                </Link>
              </Tooltip>
              <Tooltip placement="top" title={locale.aiGenerate}>
                <div className={styles.buttonBlock} onClick={onOpenPromptDrawer}>
                  <ThemeIcon />
                </div>
              </Tooltip>
            </Flex>
          </Flex>
          {/* ===== 组件预览区域 ===== */}
          <ComponentsBlock
            isDark={isDark}
            isDarkTheme={activeTheme?.bgImgDark}
            key={activeName}
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
