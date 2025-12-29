import React, { Suspense, use, useState } from 'react';
import { Button, Flex, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { clsx } from 'clsx';
import { useLocation } from 'dumi';

import useLocale from '../../../../hooks/useLocale';
import LinkButton from '../../../../theme/common/LinkButton';
import SiteContext from '../../../../theme/slots/SiteContext';
import type { SiteContextProps } from '../../../../theme/slots/SiteContext';
import * as utils from '../../../../theme/utils';
import GroupMaskLayer from '../GroupMaskLayer';
import { muiComponentConfig, muiDark, muiLight } from './themes/mui';
import { shadcnComponentConfig, shadcnDark, shadcnLight } from './themes/shadcn';
import PromptDrawer from '../../../../theme/common/ThemeSwitch/PromptDrawer';
import ThemeIcon from '../../../../theme/common/ThemeSwitch/ThemeIcon';
import type { ConfigProviderProps, ThemeConfig } from 'antd';
import { DarkContext } from '../../../../hooks/useDark';

import '../SiteContext';

const ComponentsBlock = React.lazy(() => import('./ComponentsBlock'));

const locales = {
  cn: {
    slogan: '助力设计开发者「更灵活」地搭建出「更美」的产品，让用户「快乐工作」～',
    start: '开始使用',
    designLanguage: '设计语言',
  },
  en: {
    slogan:
      'Help designers/developers building beautiful products more flexible and working with happiness',
    start: 'Getting Started',
    designLanguage: 'Design Language',
  },
};

const useStyle = createStyles(({ cssVar, css, cx }, siteConfig: SiteContextProps) => {
  const textShadow = `0 0 4px ${cssVar.colorBgContainer}`;
  const mask = cx(css`
    position: absolute;
    inset: 0;
    backdrop-filter: blur(2px);
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.2);
    transition: all 1s ease;
    pointer-events: none;
    [data-prefers-color='dark'] & {
      background-color: rgba(0, 0, 0, 0.2);
    }
  `);

  const block = cx(css`
    position: absolute;
    inset-inline-end: -60px;
    top: -24px;
    transition: all 1s cubic-bezier(0.03, 0.98, 0.52, 0.99);
  `);

  return {
    holder: css`
      height: 640px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      perspective: 800px;
      /* fix safari bug by removing blur style */
      transform: translateZ(1000px);
      row-gap: ${cssVar.marginXL};

      &:hover {
        .${mask} {
          opacity: 0;
        }

        .${block} {
          transform: scale(0.96);
        }
      }
    `,

    mask,

    typography: css`
      text-align: center;
      position: relative;
      z-index: 1;
      padding-inline: ${cssVar.paddingXL};
      text-shadow: ${Array.from({ length: 5 }, () => textShadow).join(', ')};
      h1 {
        font-weight: 900 !important;
        font-size: calc(${cssVar.fontSizeHeading2} * 2) !important;
        line-height: ${cssVar.lineHeightHeading2} !important;
      }

      p {
        font-size: ${cssVar.fontSizeLG} !important;
        font-weight: normal !important;
        margin-bottom: 0;
      }
    `,
    block,
    child: css`
      position: relative;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      z-index: 1;
    `,
    btnWrap: css`
      margin-bottom: ${cssVar.marginXL};
    `,
    bgImg: css`
      position: absolute;
      width: 240px;
    `,
    bgImgTop: css`
      top: 0;
      inset-inline-start: ${siteConfig.isMobile ? '-120px' : 0};
    `,
    bgImgBottom: css`
      bottom: 120px;
      inset-inline-end: ${siteConfig.isMobile ? 0 : '40%'};
    `,
    themeBar: css`
      display: flex;
      gap: 12px;
      margin: 24px 0;
      align-items: center;
      justify-content: center;
    `,
    themeLabel: css`
      background: ${cssVar.colorBgElevated};
      padding: 6px 12px;
      border-radius: 20px;
      box-shadow: ${cssVar.boxShadowSecondary};
      color: ${cssVar.colorText};
      font-weight: 600;
      font-size: ${cssVar.fontSizeSM};
    `,
    presets: css`
      display: flex;
      gap: 8px;
      align-items: center;
    `,
    presetButton: cx(css`
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border-radius: 14px;
      background: ${cssVar.colorBgElevated};
      color: ${cssVar.colorText};
      cursor: pointer;
      border: 1px solid transparent;
      box-shadow: ${cssVar.boxShadowSecondary};
      transition: all 0.2s ease;
      font-size: ${cssVar.fontSizeSM};
      padding: 7px 18px;
      line-height: 18px;
      border-radius: 6px;
      font-size: 14px;
      &:hover {
        transform: translateY(-2px);
      }
    `),
    swatches: css`
      display: inline-flex;
      align-items: center;
      gap: 6px;
    `,
    swatch: css`
      width: 10px;
      height: 10px;
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.25);
    `,
    name: css`
      margin-left: 10px;
      text-transform: capitalize;
    `,
  };
});

type THEME_MAP = 'antd' | 'shadcn' | 'mui';

interface Theme {
  name: THEME_MAP;
  theme: ThemeConfig;
  componentsConfig: Partial<ConfigProviderProps>;
  style?: React.CSSProperties;
  activeStyle: React.CSSProperties;
  swatches: string[];
}

const PreviewBanner: React.FC<Readonly<React.PropsWithChildren>> = (props) => {
  const { updateSiteConfig } = use<SiteContextProps>(SiteContext);
  const [isMarketDrawerOpen, setIsMarketDrawerOpen] = useState(false);
  const { children } = props;
  const [locale] = useLocale(locales);
  const siteConfig = use(SiteContext);
  const { styles } = useStyle(siteConfig);
  const { pathname, search } = useLocation();
  const isZhCN = utils.isZhCN(pathname);
  const [theme, setTheme] = useState('antd');
  const isDark = React.use(DarkContext);

  const themeMap: Record<THEME_MAP, Theme> = {
    antd: {
      name: 'antd',
      theme: {},
      componentsConfig: {},
      activeStyle: {
        border: '1px solid #1677ff',
      },
      swatches: ['#1677ff', '#91d5ff', '#f0f5ff'],
    },
    shadcn: {
      name: 'shadcn',
      theme: isDark ? shadcnDark : shadcnLight,
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
      activeStyle: {
        border: '1px solid oklch(0.205 0 0)',
      },
      componentsConfig: shadcnComponentConfig,
      swatches: ['oklch(0.205 0 0)', 'oklch(0.556 0 0)', 'rgba(0, 0, 0, 0.05)'],
    },
    mui: {
      name: 'mui',
      theme: isDark ? muiDark : muiLight,
      componentsConfig: muiComponentConfig,
      style: {
        color: '#fff',
        backgroundColor: 'rgb(2, 136, 209, 0.5)',
      },
      activeStyle: {
        border: '1px solid rgb(25, 118, 210)',
      },
      swatches: ['#1677ff', '#91d5ff', '#f0f5ff'],
    },
  };

  return (
    <GroupMaskLayer>
      <div
        className={styles.holder}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'center',
          height: 640,
          position: 'relative',
          overflow: 'hidden',
          perspective: 800,
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <img
            alt="bg"
            src="https://gw.alipayobjects.com/zos/bmw-prod/49f963db-b2a8-4f15-857a-270d771a1204.svg"
            draggable={false}
            className={clsx(styles.bgImg, styles.bgImgTop)}
            style={{ position: 'absolute', left: 0, top: 0, zIndex: 0 }}
          />
          <div className={styles.mask} />

          <Typography className={styles.typography}>
            <h1>Ant Design</h1>
            <p>{locale.slogan}</p>
          </Typography>
          <div className={styles.themeBar}>
            <div className={styles.presets}>
              {Object.keys(themeMap).map((v, i) => {
                const key = v as THEME_MAP;
                return (
                  <div
                    key={i}
                    role="button"
                    tabIndex={0}
                    onClick={() => setTheme(themeMap[key].name)}
                    onKeyDown={() => {}}
                    className={clsx(styles.presetButton)}
                    style={{
                      ...themeMap[key].style,
                      ...(theme === themeMap[key].name ? themeMap[key].activeStyle : {}),
                    }}
                  >
                    <div className={styles.swatches}>
                      {themeMap[key].swatches?.map((s: any) => (
                        <span key={s} className={styles.swatch} style={{ background: s }} />
                      ))}
                    </div>
                    <span className={styles.name}>{themeMap[key].name}</span>
                  </div>
                );
              })}
              <Button
                variant="solid"
                icon={<ThemeIcon />}
                onClick={() => setIsMarketDrawerOpen(true)}
                style={{ fontSize: 16 }}
              />
            </div>
          </div>
          <Flex gap="middle" className={styles.btnWrap}>
            <LinkButton
              size="large"
              type="primary"
              to={utils.getLocalizedPathname('/components/overview/', isZhCN, search)}
            >
              {locale.start}
            </LinkButton>
            <LinkButton
              size="large"
              to={utils.getLocalizedPathname('/docs/spec/introduce/', isZhCN, search)}
            >
              {locale.designLanguage}
            </LinkButton>
          </Flex>
          <div className={styles.child}>{children}</div>
        </div>
        <PromptDrawer
          open={isMarketDrawerOpen}
          onClose={() => setIsMarketDrawerOpen(false)}
          onThemeChange={(nextTheme) => {
            updateSiteConfig({
              dynamicTheme: nextTheme,
            });
          }}
        />
        <div
          style={{
            width: '40%',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            backgroundColor: isDark ? '#393F4A' : '#f4f8ff',
            borderRadius: '0 0px 0px 12px',
          }}
        >
          <img
            alt="bg"
            src="https://gw.alipayobjects.com/zos/bmw-prod/e152223c-bcae-4913-8938-54fda9efe330.svg"
            draggable={false}
            className={clsx(styles.bgImg, styles.bgImgBottom)}
            style={{ position: 'absolute', right: 0, top: 0, zIndex: 0 }}
          />
          <Suspense fallback={null}>
            {siteConfig.isMobile ? null : (
              <div className={styles.block} style={{ position: 'relative', zIndex: 1 }}>
                <ComponentsBlock
                  config={{
                    theme: themeMap[theme].theme,
                    ...themeMap[theme].componentsConfig,
                  }}
                />
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </GroupMaskLayer>
  );
};

export default PreviewBanner;
