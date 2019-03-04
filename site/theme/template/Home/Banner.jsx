import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import ScrollParallax from 'rc-scroll-anim/lib/ScrollParallax';
import { Link } from 'bisheng/router';
import { FormattedMessage } from 'react-intl';
import GitHubButton from 'react-github-button';
import { Button } from 'antd';
import BannerImage from './BannerImage';
import * as utils from '../utils';

const loop = {
  duration: 3000,
  yoyo: true,
  repeat: -1,
};

class Banner extends React.PureComponent {
  static contextTypes = {
    intl: PropTypes.object.isRequired,
  };

  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: 'banner',
  };

  render() {
    const { className, isMobile } = this.props;
    const {
      intl: { locale },
    } = this.context;
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
        <QueueAnim className={`${className} page`} type="alpha" delay={150}>
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
                  key="github-button"
                  size="large"
                  type="stargazers"
                  namespace="ant-design"
                  repo="ant-design"
                />
              )}
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
  }
}

export default Banner;
