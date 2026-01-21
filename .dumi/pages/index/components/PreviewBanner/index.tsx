import React, { Suspense, use } from 'react';
import { Flex, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { useLocation } from 'dumi';

import useLocale from '../../../../hooks/useLocale';
import LinkButton from '../../../../theme/common/LinkButton';
import SiteContext from '../../../../theme/slots/SiteContext';
import * as utils from '../../../../theme/utils';
import GroupMaskLayer from '../GroupMaskLayer';

import '../SiteContext';

import LuminousBg from './LuminousBg';

const locales = {
  cn: {
    slogan: 'AI 友好的「设计系统」，让美与智能并进，让工作充满「灵感」与「快乐」。',
    start: '开始使用',
    designLanguage: '设计语言',
  },
  en: {
    slogan:
      'AI friendly design system that combines beauty and intelligence, making work full of inspiration and joy.',
    start: 'Getting Started',
    designLanguage: 'Design Language',
  },
};

const useStyle = createStyles(({ cssVar, css, cx }) => {
  const textShadow = `0 0 4px ${cssVar.colorBgContainer}`;

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
        .${block} {
          transform: scale(0.96);
        }
      }
    `,

    typography: css`
      text-align: center;
      position: relative;
      z-index: 1;
      padding-inline: ${cssVar.paddingXL};
      text-shadow: ${Array.from({ length: 5 }, () => textShadow).join(', ')};
      h1 {
        font-weight: 900 !important;
        font-size: calc(${cssVar.fontSizeHeading1} * 2) !important;
        line-height: ${cssVar.lineHeightHeading1} !important;
      }

      p {
        font-size: calc(${cssVar.fontSizeLG} * 1.5) !important;
        font-weight: 400 !important;
        margin-bottom: 0;
        color: ${cssVar.colorTextTertiary} !important;
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
      <div className={styles.holder}>
        {/* Mobile not show the component preview */}
        <Suspense fallback={null}>
          <LuminousBg />
        </Suspense>
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
