import * as React from 'react';
import { BgColorsOutlined, CopyOutlined } from '@ant-design/icons';
import { App, ConfigProvider, Flex, Segmented, theme, Tooltip } from 'antd';
import type { ThemeConfig } from 'antd';
import { createStyles } from 'antd-style';
import copy from 'antd/lib/_util/copy';
import { clsx } from 'clsx';
import { Link, useLocation } from 'dumi';

import { DarkContext } from '../../../../hooks/useDark';
import useLocale from '../../../../hooks/useLocale';
import ThemeIcon from '../../../../theme/common/ThemeSwitch/ThemeIcon';
import * as utils from '../../../../theme/utils';
import Group from '../Group';
import ComponentsBlock from '../PreviewPane/Components';
import { ThemeDashboard } from '../Theme';
import usePreviewThemes from './previewThemes';
import { generateFullCopyFile } from './themeCodeUtils';

const PREVIEW_CARD_RADIUS = 16;

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
  dashboardBlock: css({
    width: '100%',
    maxWidth: 1320,
    margin: '0 auto',
  }),
  previewTabs: css({
    padding: 3,
    borderRadius: 100,
    background: cssVar.colorFillQuaternary,
    '.ant-segmented-group': {
      gap: 2,
    },
    '.ant-segmented-thumb': {
      borderRadius: 100,
      background: cssVar.colorBgElevated,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    },
    '@media (max-width: 768px)': {
      width: '60%',
    },
  }),
  tabsDark: css({
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    backdropFilter: 'blur(18px)',
    boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.16)',
    '.ant-segmented-thumb': {
      backgroundColor: 'rgba(255, 255, 255, 0.96)',
      boxShadow: '0 8px 18px rgba(0,0,0,0.24)',
    },
  }),
  tabsItem: css({
    minWidth: 112,
    borderRadius: 100,
    color: cssVar.colorTextTertiary,
    '&.ant-segmented-item-selected': {
      color: cssVar.colorText,
    },
    '@media (max-width: 768px)': {
      flex: 1,
      minWidth: 0,
      paddingInline: 12,
      fontSize: 16,
    },
  }),
  tabsItemDark: css({
    color: 'rgba(255, 255, 255, 0.78)',
    '&:not(.ant-segmented-item-selected):not(.ant-segmented-item-disabled):hover': {
      color: '#fff',
      background: 'rgba(255, 255, 255, 0.08)',
    },
    '&.ant-segmented-item-selected': {
      color: cssVar.colorText,
    },
  }),
  previewTabsLabel: css({
    minHeight: 30,
    lineHeight: '30px',
  }),
  themeBlock: css({
    height: 20,
    width: 20,
    fontSize: 20,
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    outline: `2px solid ${cssVar.colorBgLayout}`,
    backgroundColor: cssVar.colorBgLayout,
    transition: ['background-color', 'transform', 'opacity']
      .map((prop) => `${prop} ${cssVar.motionDurationFast}`)
      .join(', '),
    '&:hover, &:focus-within': {
      outline: `2px solid ${cssVar.colorPrimaryBorder}`,
      transform: 'scale(1.1)',
    },
    '> img': {
      fontSize: 0,
      display: 'block',
      width: '100%',
      height: '100%',
    },
  }),
  active: css({
    outline: `2px solid ${cssVar.colorPrimaryBorder}`,
  }),
  switch: css({
    alignItems: 'center',
    gap: 16,
    '@media (max-width: 1200px)': {
      justifyContent: 'center',
      flexDirection: 'column',
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

type PreviewPane = 'components' | 'dashboard';

const previewPaneOptions: { label: string; value: PreviewPane }[] = [
  { label: 'Components', value: 'components' },
  { label: 'Dashboard', value: 'dashboard' },
];

export interface ThemePreviewProps {
  onOpenPromptDrawer?: () => void;
}

const ThemePreviewContent: React.FC<ThemePreviewProps> = (props) => {
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
  const [activePane, setActivePane] = React.useState<PreviewPane>('components');

  const copyTimerRef = React.useRef<ReturnType<typeof setTimeout>>(null);

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
      themeConfig: activeTheme?.props?.theme,
      copyCode: activeTheme?.copyCode,
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
  const hasDarkBackground = !!activeTheme?.bgImgDark;

  return (
    <Group
      title={locale.themeTitle}
      description={locale.themeDesc}
      collapse
      titleColor={hasDarkBackground ? '#fff' : undefined}
      background={background}
      backgroundPrefetchList={backgroundPrefetchList}
    >
      <Flex className={styles.container}>
        <Flex className={styles.wrapper} gap={16}>
          <Flex className={styles.switch} justify="space-between">
            <Segmented<PreviewPane>
              classNames={{
                label: clsx(styles.previewTabsLabel),
                root: clsx(styles.previewTabs, { [styles.tabsDark]: hasDarkBackground }),
                item: clsx(styles.tabsItem, { [styles.tabsItemDark]: hasDarkBackground }),
              }}
              options={previewPaneOptions}
              value={activePane}
              onChange={setActivePane}
            />
            <Flex align="center" gap={12}>
              {previewThemes.map((theme) => {
                const { name, icon: Icon, key } = theme;
                const isSelected = activeName === name;
                return (
                  <Tooltip placement="top" key={`item-${key}`} title={name}>
                    <div
                      role="tab"
                      className={clsx(styles.themeBlock, { [styles.active]: isSelected })}
                      tabIndex={isSelected ? 0 : -1}
                      aria-selected={isSelected}
                      onClick={() => handleThemeClick(name)}
                      onKeyDown={(event) => handleKeyDown(event, name)}
                    >
                      {typeof Icon === 'string' ? (
                        <img src={Icon} alt={name} title={name} draggable={false} />
                      ) : (
                        <Icon />
                      )}
                    </div>
                  </Tooltip>
                );
              })}
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
          {activePane === 'components' ? (
            <ComponentsBlock
              isDark={isDark}
              isDarkTheme={hasDarkBackground}
              key={activeName}
              config={activeTheme?.props}
              className={styles.componentsBlock}
              containerClassName={styles.componentsBlockContainer}
            />
          ) : (
            <ThemeDashboard
              key={activeName}
              className={styles.dashboardBlock}
              config={activeTheme?.props}
              activeTheme={activeTheme}
              style={{ borderRadius: PREVIEW_CARD_RADIUS }}
            />
          )}
        </Flex>
      </Flex>
    </Group>
  );
};

const ThemePreview: React.FC<ThemePreviewProps> = (props) => {
  const memoizedThemeConfig = React.useMemo<ThemeConfig>(() => {
    return { algorithm: theme.defaultAlgorithm };
  }, []);

  return (
    <ConfigProvider theme={memoizedThemeConfig}>
      <App>
        <ThemePreviewContent {...props} />
      </App>
    </ConfigProvider>
  );
};

export default ThemePreview;
