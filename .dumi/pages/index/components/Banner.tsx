import * as React from 'react';
import { Button, Flex, Typography } from 'antd';
import { createStyles, css, useTheme } from 'antd-style';
import classNames from 'classnames';
import { Link, useLocation } from 'dumi';

import useLocale from '../../../hooks/useLocale';
import SiteContext from '../../../theme/slots/SiteContext';
import * as utils from '../../../theme/utils';
import GroupMaskLayer from './GroupMaskLayer';

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
  const { isMobile } = React.useContext(SiteContext);
  return createStyles(({ token }) => ({
    titleBase: css`
      h1& {
        font-family: AliPuHui, ${token.fontFamily};
      }
    `,
    title: isMobile
      ? css`
          h1& {
            margin-bottom: ${token.margin}px;
            font-weight: normal;
            font-size: ${token.fontSizeHeading1 + 2}px;
            line-height: ${token.lineHeightHeading2};
          }
        `
      : css`
          h1& {
            margin-bottom: ${token.marginMD}px;
            font-weight: 900;
            font-size: 68px;
          }
        `,
    btnWrap: css`
      margin-bottom: ${token.marginXL}px;
    `,
    layer: css`
      text-align: center;
      padding-top: ${token.marginFar - 16}px;
      padding-bottom: ${token.marginFarSM}px;
    `,
    mobileBg: css`
      width: 100%;
    `,
    videoWrap: css`
      height: 320px;
      background-color: #77c6ff;
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
    `,
    video: css`
      height: 100%;
      object-fit: contain;
    `,
    bg: css`
      flex: auto;
      background-repeat: repeat-x;
      background-size: auto 100%;
    `,
    bg1: css`
      background-image: url(https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*6d50SboraPIAAAAAAAAAAAAAARQnAQ);
      background-position: 100% 0;
    `,
    bg2: css`
      background-image: url(https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*8ILtRrQlVDMAAAAAAAAAAAAAARQnAQ);
      background-position: 0 0;
      margin-inline-start: -1px;
    `,
    logoWrap: css`
      position: relative;
      background-color: #fff;
    `,
    bgImg: css`
      position: absolute;
      width: 240px;
    `,
  }))();
};

const Banner: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [locale] = useLocale(locales);
  const { pathname, search } = useLocation();
  const token = useTheme();
  const { styles } = useStyle();
  const { isMobile } = React.useContext(SiteContext);
  const isZhCN = utils.isZhCN(pathname);
  return (
    <>
      {/* Banner Placeholder Motion */}
      {isMobile ? (
        <img
          className={styles.mobileBg}
          src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*JmlaR5oQn3MAAAAAAAAAAAAADrJ8AQ/original"
          alt=""
        />
      ) : (
        <div className={classNames(styles.videoWrap)}>
          <div className={classNames(styles.bg, styles.bg1)} />
          <video className={styles.video} autoPlay muted loop>
            <source
              type="video/webm"
              src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*uYT7SZwhJnUAAAAAAAAAAAAADgCCAQ"
            />
            <source
              type="video/mp4"
              src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/file/A*XYYNQJ3NbmMAAAAAAAAAAAAAARQnAQ"
            />
          </video>
          <div className={classNames(styles.bg, styles.bg2)} />
        </div>
      )}
      {/* Logo */}
      <div className={styles.logoWrap}>
        {/* Image Bottom Right */}
        <img
          className={classNames(styles.bgImg)}
          style={{ right: 0, top: 240 }}
          src="https://gw.alipayobjects.com/zos/bmw-prod/b3b8dc41-dce8-471f-9d81-9a0204f27d03.svg"
          alt="Ant Design"
        />
        <GroupMaskLayer className={styles.layer}>
          {/* Image Left Top */}
          <img
            className={classNames(styles.bgImg)}
            style={{ left: isMobile ? -120 : 0, top: 0 }}
            src="https://gw.alipayobjects.com/zos/bmw-prod/49f963db-b2a8-4f15-857a-270d771a1204.svg"
            alt="bg"
          />
          {/* Image Right Top */}
          <img
            className={classNames(styles.bgImg)}
            style={{ right: isMobile ? 0 : 120, top: 0 }}
            src="https://gw.alipayobjects.com/zos/bmw-prod/e152223c-bcae-4913-8938-54fda9efe330.svg"
            alt="bg"
          />
          <Typography.Title level={1} className={classNames(styles.titleBase, styles.title)}>
            Ant Design 5.0
          </Typography.Title>
          <Typography.Paragraph
            style={{
              fontSize: isMobile ? token.fontSizeHeading5 - 2 : token.fontSizeHeading5,
              lineHeight: isMobile ? token.lineHeightSM : token.lineHeightHeading5,
              marginBottom: token.marginMD * 2,
              padding: isMobile ? `0 ${token.paddingLG + 2}px` : 0,
            }}
          >
            <div>{locale.slogan}</div>
          </Typography.Paragraph>
          <Flex gap="middle" className={styles.btnWrap}>
            <Link to={utils.getLocalizedPathname('/components/overview/', isZhCN, search)}>
              <Button size="large" type="primary">
                {locale.start}
              </Button>
            </Link>
            <Link to={utils.getLocalizedPathname('/docs/spec/introduce/', isZhCN, search)}>
              <Button size="large">{locale.designLanguage}</Button>
            </Link>
          </Flex>
          {children}
        </GroupMaskLayer>
      </div>
    </>
  );
};

export default Banner;
