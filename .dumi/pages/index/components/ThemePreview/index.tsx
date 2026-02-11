import * as React from 'react';
import { ConfigProvider, Flex, theme } from 'antd';
import { createStyles } from 'antd-style';
import clsx from 'clsx';

import { DarkContext } from '../../../../hooks/useDark';
import useLocale from '../../../../hooks/useLocale';
import Group from '../Group';
import ComponentsBlock from './ComponentsBlock';
import usePreviewThemes from './previewThemes';

const locales = {
  cn: {
    themeTitle: '定制主题，随心所欲',
    themeDesc: '开放样式算法与语义化结构，让你与 AI 一起轻松定制主题',
    aiGenerate: 'AI 生成主题',
    aiGenerateDesc: '用一句话描述你想要的风格',
  },
  en: {
    themeTitle: 'Flexible theme customization',
    themeDesc:
      'Open style algorithms and semantic structures make it easy for you and AI to customize themes',
    aiGenerate: 'AI Generate Theme',
    aiGenerateDesc: 'Describe your desired style',
  },
};

const useStyles = createStyles(({ css, cssVar }) => ({
  container: css({
    width: '100%',
    color: cssVar.colorText,
    lineHeight: cssVar.lineHeight,
    fontSize: cssVar.fontSize,
    fontFamily: cssVar.fontFamily,
    alignItems: 'stretch',
    justifyContent: 'center',
  }),

  // List
  list: css({
    flex: 'auto',
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: cssVar.paddingSM,
  }),
  listItem: css({
    margin: 0,
    fontSize: cssVar.fontSizeLG,
    lineHeight: cssVar.lineHeightLG,
    paddingBlock: cssVar.padding,
    paddingInline: cssVar.paddingLG,
    border: `${cssVar.lineWidth} ${cssVar.lineType} ${cssVar.colorBorderSecondary}`,
    borderRadius: cssVar.borderRadius,
    borderColor: 'transparent',
    transition: `all ${cssVar.motionDurationMid} ${cssVar.motionEaseInOut}`,

    '&:hover:not(.active):not(.ai-generate-item)': {
      borderColor: cssVar.colorPrimaryBorder,
      backgroundColor: cssVar.colorPrimaryBg,
      cursor: 'pointer',
    },

    '&:focus-visible': {
      outline: `2px solid ${cssVar.colorPrimary}`,
      outlineOffset: 2,
    },

    '&.active': {
      borderColor: cssVar.colorPrimary,
      backgroundColor: cssVar.colorPrimaryBg,
      color: cssVar.colorPrimary,
    },

    // ========= Dark =========
    '&.dark': {
      color: cssVar.colorTextLightSolid,
      backgroundColor: 'transparent',

      '&:hover, &.active': {
        borderColor: cssVar.colorTextLightSolid,
        backgroundColor: 'transparent',
      },
    },
  }),

  // AI Generate Item
  aiGenerateItem: css({
    borderStyle: 'dashed',
    opacity: 0.7,
    cursor: 'pointer',
    color: cssVar.colorTextSecondary,
    paddingInline: cssVar.padding,

    '&:hover': {
      borderColor: cssVar.colorPrimary,
      color: cssVar.colorPrimary,
      opacity: 1,
    },
  }),

  aiGenerateContent: css({
    position: 'relative',
    zIndex: 1,
  }),

  aiGenerateIcon: css({
    fontSize: 14,
    marginRight: 6,
    opacity: 0.6,
  }),

  aiGenerateDesc: css({
    fontSize: cssVar.fontSizeSM,
    opacity: 0.5,
    marginTop: 2,
    fontWeight: 400,
  }),

  // Components
  componentsBlockContainer: css({
    flex: 'auto',
    display: 'flex',
    padding: cssVar.paddingXL,
    justifyContent: 'center',
    border: `${cssVar.lineWidth} ${cssVar.lineType} ${cssVar.colorBorderSecondary}`,
    borderRadius: cssVar.borderRadius,
    boxShadow: cssVar.boxShadow,
  }),
  componentsBlock: css({
    flex: 'none',
    maxWidth: `calc(420px + ${cssVar.paddingXL} * 2)`,
  }),
}));

export interface ThemePreviewProps {
  onOpenPromptDrawer?: () => void;
}

export default function ThemePreview(props: ThemePreviewProps = {}) {
  const { onOpenPromptDrawer } = props;
  const [locale] = useLocale(locales);
  const { styles } = useStyles();
  const isDark = React.use(DarkContext);

  const previewThemes = usePreviewThemes();

  const [activeName, setActiveName] = React.useState(() => previewThemes[0].name);

  React.useEffect(() => {
    const defaultThemeName = isDark ? 'dark' : 'light';

    const targetTheme =
      previewThemes.find((theme) => theme.key === defaultThemeName)?.name || previewThemes[0].name;

    setActiveName(targetTheme);
  }, [isDark]);

  // 收集所有背景图片用于预加载
  const backgroundPrefetchList = React.useMemo(
    () => previewThemes.map((theme) => theme.bgImg).filter((img): img is string => !!img),
    [previewThemes],
  );

  const handleThemeClick = (name: string) => {
    setActiveName(name);
  };

  const handleKeyDown = (event: React.KeyboardEvent, name: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleThemeClick(name);
    }
  };

  const activeTheme = previewThemes.find((theme) => theme.name === activeName);

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <Group
        title={locale.themeTitle}
        description={locale.themeDesc}
        background={activeTheme?.bgImg}
        titleColor={activeTheme?.bgImgDark ? '#fff' : undefined}
        backgroundPrefetchList={backgroundPrefetchList}
      >
        <Flex className={styles.container} gap="large">
          <div
            style={{
              display: 'flex',
            }}
          >
            <div className={styles.list} role="tablist" aria-label="Theme selection">
              {previewThemes.map((theme) => (
                <div
                  className={clsx(
                    styles.listItem,
                    activeName === theme.name && 'active',
                    activeTheme?.bgImgDark && 'dark',
                  )}
                  key={theme.name}
                  role="tab"
                  tabIndex={activeName === theme.name ? 0 : -1}
                  aria-selected={activeName === theme.name}
                  onClick={() => handleThemeClick(theme.name)}
                  onKeyDown={(event) => handleKeyDown(event, theme.name)}
                  style={{ marginBottom: 8 }}
                >
                  {theme.name}
                </div>
              ))}
              {/* AI 生成主题 - 最后一个选项 */}
              <div
                className={clsx(styles.listItem, styles.aiGenerateItem, 'ai-generate-item')}
                role="tab"
                tabIndex={0}
                onClick={onOpenPromptDrawer}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onOpenPromptDrawer?.();
                  }
                }}
              >
                <div className={styles.aiGenerateContent}>
                  <span className={styles.aiGenerateIcon}>🎨</span>
                  <span>{locale.aiGenerate}</span>
                </div>
                <div className={styles.aiGenerateDesc}>{locale.aiGenerateDesc}</div>
              </div>
            </div>
          </div>
          <ComponentsBlock
            key={activeName}
            config={activeTheme?.props}
            className={styles.componentsBlock}
            containerClassName={styles.componentsBlockContainer}
          />
        </Flex>
      </Group>
    </ConfigProvider>
  );
}
