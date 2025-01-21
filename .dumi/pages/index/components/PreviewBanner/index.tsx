import React, { Suspense } from 'react';
import { ConfigProvider, Flex, Typography } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { useLocation } from 'dumi';

import useLocale from '../../../../hooks/useLocale';
import LinkButton from '../../../../theme/common/LinkButton';
import SiteContext from '../../../../theme/slots/SiteContext';
import * as utils from '../../../../theme/utils';
import GroupMaskLayer from '../GroupMaskLayer';

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
  const { isMobile } = React.useContext(SiteContext);
  const isRTL = direction === 'rtl';
  return createStyles(({ token, css, cx }) => {
    const textShadow = `0 0 4px ${token.colorBgContainer}`;

    const mask = cx(css`
      position: absolute;
      inset: 0;
      backdrop-filter: blur(4px);
      opacity: 1;
      background-color: rgba(255, 255, 255, 0.2);
      transition: all 1s ease;
      pointer-events: none;
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
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        z-index: 1;
      `,
      btnWrap: css`
        margin-bottom: ${token.marginXL}px;
      `,
      bgImg: css`
        position: absolute;
        width: 240px;
      `,
      bgImgTop: css`
        top: 0;
        inset-inline-start: ${isMobile ? '-120px' : 0};
      `,
      bgImgBottom: css`
        bottom: 120px;
        inset-inline-end: ${isMobile ? 0 : '40%'};
      `,
    };
  })();
};

const PreviewBanner: React.FC<Readonly<React.PropsWithChildren>> = (props) => {
  const { children } = props;
  const [locale] = useLocale(locales);
  const { styles } = useStyle();
  const { isMobile } = React.useContext(SiteContext);
  const { pathname, search } = useLocation();
  const isZhCN = utils.isZhCN(pathname);

  return (
    <GroupMaskLayer>
      {/* Image Left Top */}
      <img
        alt="bg"
        src="https://gw.alipayobjects.com/zos/bmw-prod/49f963db-b2a8-4f15-857a-270d771a1204.svg"
        draggable={false}
        className={classNames(styles.bgImg, styles.bgImgTop)}
      />
      {/* Image Right Top */}
      <img
        alt="bg"
        src="https://gw.alipayobjects.com/zos/bmw-prod/e152223c-bcae-4913-8938-54fda9efe330.svg"
        draggable={false}
        className={classNames(styles.bgImg, styles.bgImgBottom)}
      />

      <div className={styles.holder}>
        {/* Mobile not show the component preview */}
        <Suspense fallback={null}>
          {isMobile ? null : (
            <div className={styles.block}>
              <ComponentsBlock />
            </div>
          )}
        </Suspense>
        <div className={styles.mask} />
        <Typography className={styles.typography}>
          <h1>Ant Design 5.0</h1>
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
