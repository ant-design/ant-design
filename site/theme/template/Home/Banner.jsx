import React from 'react';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import ScrollParallax from 'rc-scroll-anim/lib/ScrollParallax';
import { Link } from 'bisheng/router';
import { FormattedMessage, useIntl } from 'react-intl';
import GitHubButton from 'react-github-button';
import { Button, Divider, Icon } from 'antd';
import BannerImage from './BannerImage';
import * as utils from '../utils';

const loop = {
  duration: 3000,
  yoyo: true,
  repeat: -1,
};

const Banner = ({ isMobile }) => {
  const { locale } = useIntl();
  const isZhCN = locale === 'zh-CN';
  return (
    <div className="home-page-wrapper banner-wrapper" id="banner">
      <div className="banner-bg-wrapper">
        <svg width="400px" height="576px" viewBox="0 0 400 576" fill="none">
          <TweenOne component="g" animation={[{ opacity: 0, type: 'from' }, { ...loop, y: 15 }]}>
            <ellipse cx="100" cy="100" rx="6" ry="6" stroke="#2F54EB" strokeWidth="1.6" />
          </TweenOne>
          <TweenOne component="g" animation={[{ opacity: 0, type: 'from' }, { ...loop, y: -15 }]}>
            <g transform="translate(200 450)">
              <g style={{ transformOrigin: '50% 50%', transform: 'rotate(-340deg)' }}>
                <rect stroke="#FADB14" strokeWidth="1.6" width="9" height="9" />
              </g>
            </g>
          </TweenOne>
        </svg>
        <ScrollParallax
          location="banner"
          className="banner-bg"
          animation={{ playScale: [1, 1.5], rotate: 0 }}
        />
      </div>
      <QueueAnim className="banner page" type="alpha" delay={150}>
        {isMobile && (
          <div className="img-wrapper" key="image">
            <BannerImage />
          </div>
        )}
        <QueueAnim className="text-wrapper" key="text" type="bottom">
          <h1 key="h1">Ant Design</h1>
          <p key="p">
            <FormattedMessage id="app.home.introduce" />
          </p>
          <div className="banner-btns" key="buttons">
            <Link to={utils.getLocalizedPathname('/docs/react/introduce', isZhCN)}>
              <Button type="primary" className="banner-btn components">
                <FormattedMessage id="app.home.getting-started" />
              </Button>
            </Link>
            <Link
              to={utils.getLocalizedPathname('/docs/spec/introduce', isZhCN)}
              style={{ marginLeft: 16 }}
            >
              <Button className="banner-btn language">
                <FormattedMessage id="app.home.design-language" />
              </Button>
            </Link>
            {!isMobile && (
              <GitHubButton
                style={{ marginLeft: 16 }}
                size="large"
                type="stargazers"
                namespace="ant-design"
                repo="ant-design"
              />
            )}
          </div>
          <div
            key="promote"
            className="banner-promote"
            style={{
              width: isZhCN ? 412 : 522,
            }}
          >
            <Divider>
              <FormattedMessage id="app.home.recommend" />
            </Divider>
            <a
              href="https://www.yuque.com/?chInfo=ch_antd"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (window.gtag) {
                  window.gtag('event', '点击', {
                    event_category: '首页推广',
                    event_label: 'https://www.yuque.com/?chInfo=ch_antd',
                  });
                }
              }}
            >
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg"
                alt="yuque logo"
              />
              <FormattedMessage id="app.home.recommend.yuque" />
              <Icon type="right" style={{ marginLeft: 6, fontSize: 12, opacity: 0.6 }} />
            </a>
          </div>
        </QueueAnim>
        {!isMobile && (
          <div className="img-wrapper" key="image">
            <ScrollParallax
              location="banner"
              component={BannerImage}
              animation={{ playScale: [1, 1.5], y: 80 }}
            />
          </div>
        )}
      </QueueAnim>
    </div>
  );
};

export default Banner;
