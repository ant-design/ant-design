import React, { Suspense } from 'react';
import { Button, ConfigProvider, Space, Typography } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import { Link, useLocation } from 'dumi';

import useLocale from '../../../../hooks/useLocale';
import SiteContext from '../../../../theme/slots/SiteContext';
import * as utils from '../../../../theme/utils';
import { GroupMask } from '../Group';
import useMouseTransform from './useMouseTransform';

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

const useStyle = () => {
  const { direction } = React.useContext(ConfigProvider.ConfigContext);
  const isRTL = direction === 'rtl';

  return createStyles(({ token, css, cx }) => {
    const textShadow = `0 0 3px ${token.colorBgContainer}`;

    const mask = cx(css`
      position: absolute;
      inset: 0;
      backdrop-filter: blur(4px);
      opacity: 1;
      transition: opacity 1s ease;
    `);

    return {
      holder: css`
        height: 520px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        perspective: 800px;
        /* fix safari bug by removing blur style */
        transform: translateZ(1000px);
        row-gap: ${token.marginXL}px;

        &:hover .${mask} {
          opacity: 0;
        }
      `,

      mask,

      typography: css`
        text-align: center;
        position: relative;
        z-index: 1;
        padding-inline: ${token.paddingXL}px;
        text-shadow: ${new Array(5)
          .fill(null)
          .map(() => textShadow)
          .join(', ')};

        h1 {
          font-family: AliPuHui, ${token.fontFamily} !important;
          font-weight: 900 !important;
          font-size: ${token.fontSizeHeading2 * 2}px !important;
          line-height: ${token.lineHeightHeading2} !important;
        }

        p {
          font-size: ${token.fontSizeLG}px !important;
          font-weight: normal !important;
          margin-bottom: 0;
        }
      `,

      block: css`
        position: absolute;
        inset-inline-end: 0;
        top: -38px;
        transform: ${isRTL ? 'rotate3d(24, 83, -45, 57deg)' : 'rotate3d(24, -83, 45, 57deg)'};
      `,

      child: css`
        position: relative;
        z-index: 1;
      `,
    };
  })();
};

export interface PreviewBannerProps {
  children?: React.ReactNode;
}

const PreviewBanner: React.FC<PreviewBannerProps> = (props) => {
  const { children } = props;

  const [locale] = useLocale(locales);
  const { styles } = useStyle();
  const { isMobile } = React.useContext(SiteContext);
  const token = useTheme();
  const { pathname, search } = useLocation();
  const isZhCN = utils.isZhCN(pathname);

  const [componentsBlockStyle, mouseEvents] = useMouseTransform();

  return (
    <GroupMask {...mouseEvents}>
      {/* Image Left Top */}
      <img
        style={{ position: 'absolute', left: isMobile ? -120 : 0, top: 0, width: 240 }}
        src="https://gw.alipayobjects.com/zos/bmw-prod/49f963db-b2a8-4f15-857a-270d771a1204.svg"
        alt="bg"
      />
      {/* Image Right Top */}
      <img
        style={{ position: 'absolute', right: isMobile ? 0 : '40%', bottom: 120, width: 240 }}
        src="https://gw.alipayobjects.com/zos/bmw-prod/e152223c-bcae-4913-8938-54fda9efe330.svg"
        alt="bg"
      />

      <div className={styles.holder}>
        {/* Mobile not show the component preview */}
        <Suspense fallback={null}>
          {!isMobile && <ComponentsBlock className={styles.block} style={componentsBlockStyle} />}
        </Suspense>
        <div className={styles.mask} />

        <Typography className={styles.typography}>
          <h1>Ant Design 5.0</h1>
          <p>{locale.slogan}</p>
        </Typography>

        <Space size="middle" style={{ marginBottom: token.marginXL }}>
          <Link to={utils.getLocalizedPathname('/components/overview/', isZhCN, search)}>
            <Button size="large" type="primary">
              {locale.start}
            </Button>
          </Link>
          <Link to={utils.getLocalizedPathname('/docs/spec/introduce/', isZhCN, search)}>
            <Button size="large">{locale.designLanguage}</Button>
          </Link>
        </Space>
        <div className={styles.child}>{children}</div>
      </div>
    </GroupMask>
  );
};

export default PreviewBanner;
