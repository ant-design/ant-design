import React, { Suspense, use } from 'react';
import { Flex, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { clsx } from 'clsx';
import { useLocation } from 'dumi';

import useLocale from '../../../../hooks/useLocale';
import LinkButton from '../../../../theme/common/LinkButton';
import SiteContext from '../../../../theme/slots/SiteContext';
import type { SiteContextProps } from '../../../../theme/slots/SiteContext';
import * as utils from '../../../../theme/utils';
import GroupMaskLayer from '../GroupMaskLayer';

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
  const isDark = siteConfig.theme.includes('dark');
  const mask = cx(css`
    position: absolute;
    inset: 0;
    backdrop-filter: blur(2px);
    opacity: 1;
    background-color: ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
    transition: all 1s ease;
    pointer-events: none;
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
  };
});

const PreviewBanner: React.FC<Readonly<React.PropsWithChildren>> = (props) => {
  const { children } = props;
  const [locale] = useLocale(locales);
  const siteConfig = use(SiteContext);
  const { styles } = useStyle(siteConfig);
  const { pathname, search } = useLocation();
  const isZhCN = utils.isZhCN(pathname);

  return (
    <GroupMaskLayer>
      {/* Image Left Top */}
      <img
        alt="bg"
        src="https://gw.alipayobjects.com/zos/bmw-prod/49f963db-b2a8-4f15-857a-270d771a1204.svg"
        draggable={false}
        className={clsx(styles.bgImg, styles.bgImgTop)}
      />
      {/* Image Right Top */}
      <img
        alt="bg"
        src="https://gw.alipayobjects.com/zos/bmw-prod/e152223c-bcae-4913-8938-54fda9efe330.svg"
        draggable={false}
        className={clsx(styles.bgImg, styles.bgImgBottom)}
      />

      <div className={styles.holder}>
        {/* Mobile not show the component preview */}
        <Suspense fallback={null}>
          {siteConfig.isMobile ? null : (
            <div className={styles.block}>
              <ComponentsBlock />
            </div>
          )}
        </Suspense>
        <div className={styles.mask} />
        <Typography className={styles.typography}>
          <h1>Ant Design</h1>
          <p>{locale.slogan}</p>
        </Typography>
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
    </GroupMaskLayer>
  );
};

export default PreviewBanner;
