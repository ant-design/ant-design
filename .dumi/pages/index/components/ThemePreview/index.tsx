import * as React from 'react';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { App, Button, ConfigProvider, Flex, theme, Tooltip } from 'antd';
import { createStyles } from 'antd-style';
import clsx from 'clsx';

import copy from '../../../../../components/_util/copy';
import { DarkContext } from '../../../../hooks/useDark';
import useLocale from '../../../../hooks/useLocale';
import Group from '../Group';
import ComponentsBlock from './ComponentsBlock';
import usePreviewThemes from './previewThemes';
import { generateThemeCode } from './themeCodeUtils';

const locales = {
  cn: {
    themeTitle: '定制主题，随心所欲',
    themeDesc: '开放样式算法与语义化结构，让你与 AI 一起轻松定制主题',
    aiGenerate: 'AI 生成主题',
    aiGenerateDesc: '用一句话描述你想要的风格',
    copyTheme: '复制主题代码',
    copySuccess: '已复制',
  },
  en: {
    themeTitle: 'Flexible theme customization',
    themeDesc:
      'Open style algorithms and semantic structures make it easy for you and AI to customize themes',
    aiGenerate: 'AI Generate Theme',
    aiGenerateDesc: 'Describe your desired style',
    copyTheme: 'Copy theme code',
    copySuccess: 'Copied',
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
    cursor: 'pointer',

    '&:hover:not(.active):not(.dark)': {
      borderColor: cssVar.colorPrimaryBorder,
      backgroundColor: cssVar.colorPrimaryBg,
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

  copyButton: css({
    opacity: 0,
    transition: `opacity ${cssVar.motionDurationMid} ${cssVar.motionEaseInOut}`,
    flexShrink: 0,

    '&.visible': {
      opacity: 1,
    },
  }),

  // AI Generate Item
  aiGenerateItem: css({
    borderStyle: 'dashed',
    opacity: 0.7,
    cursor: 'pointer',
    paddingInline: cssVar.padding,
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

function ThemePreviewContent(props: ThemePreviewProps) {
  const { onOpenPromptDrawer } = props;
  const [locale] = useLocale(locales);
  const { styles } = useStyles();
  const isDark = React.use(DarkContext);
  const { message } = App.useApp();

  const previewThemes = usePreviewThemes();

  const [activeName, setActiveName] = React.useState(() => previewThemes[0].name);
  const [copiedName, setCopiedName] = React.useState<string | null>(null);
  const [hoveredName, setHoveredName] = React.useState<string | null>(null);
  const copyTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    const defaultThemeName = isDark ? 'dark' : 'light';

    const targetTheme =
      previewThemes.find((previewTheme) => previewTheme.key === defaultThemeName)?.name ||
      previewThemes[0].name;

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

  const handleCopyTheme = async (
    event: React.MouseEvent,
    themeProps: (typeof previewThemes)[0]['props'],
    name: string,
  ) => {
    event.stopPropagation();
    const code = generateThemeCode(themeProps?.theme);
    const success = await copy(code);
    if (success) {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
      setCopiedName(name);
      message.success(locale.copySuccess);
      copyTimerRef.current = setTimeout(() => setCopiedName(null), 2000);
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

  const activeTheme = previewThemes.find((previewTheme) => previewTheme.name === activeName);

  return (
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
            {previewThemes.map((previewTheme) => (
              <div
                className={clsx(
                  styles.listItem,
                  activeName === previewTheme.name && 'active',
                  activeTheme?.bgImgDark && 'dark',
                )}
                key={previewTheme.name}
                role="tab"
                tabIndex={activeName === previewTheme.name ? 0 : -1}
                aria-selected={activeName === previewTheme.name}
                onClick={() => handleThemeClick(previewTheme.name)}
                onKeyDown={(event) => handleKeyDown(event, previewTheme.name)}
                onMouseEnter={() => setHoveredName(previewTheme.name)}
                onMouseLeave={() => setHoveredName(null)}
                style={{ marginBottom: 8 }}
              >
                <Flex justify="space-between" align="center">
                  <span>{previewTheme.name}</span>
                  <Tooltip title={locale.copyTheme}>
                    <Button
                      className={clsx(
                        styles.copyButton,
                        (hoveredName === previewTheme.name ||
                          copiedName === previewTheme.name) &&
                          'visible',
                      )}
                      type="text"
                      size="small"
                      icon={
                        copiedName === previewTheme.name ? (
                          <CheckOutlined />
                        ) : (
                          <CopyOutlined />
                        )
                      }
                      onClick={(e) => handleCopyTheme(e, previewTheme.props, previewTheme.name)}
                      aria-label={locale.copyTheme}
                    />
                  </Tooltip>
                </Flex>
              </div>
            ))}
            {/* AI 生成主题 - 最后一个选项 */}
            <div
              className={clsx(
                styles.listItem,
                styles.aiGenerateItem,
                activeTheme?.bgImgDark && 'dark',
              )}
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
