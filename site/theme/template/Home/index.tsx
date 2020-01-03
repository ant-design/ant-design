import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Typography } from 'antd';
import { Link } from 'bisheng/router';
import Banner from './Banner';
import RecommendPage from './RecommendPage';
import DesignPage from './DesignPage';
import MorePage from './MorePage';
import Footer from '../Layout/Footer';
import { getLocalizedPathname } from '../utils';
import './index.less';

const { Title } = Typography;

function getStyle() {
  return `
    .rc-footer-container {
      padding-left: 0;
      padding-right: 0;
    }

    .rc-footer-columns {
      max-width: 1208px;
      margin: 0 auto;
    }
  `;
}

interface BlockContentProps {
  title: React.ReactNode;
  extra?: React.ReactNode;
}

const BlockContent: React.FC<BlockContentProps> = ({ title, children, extra }) => (
  <div className="home-block-content">
    <Title level={2} style={{ fontWeight: 'lighter', color: '#314659' }}>
      {title}

      {extra && <div className="home-block-content-extra">{extra}</div>}
    </Title>
    {children}
  </div>
);

export default function Home() {
  const { locale } = useIntl();
  const isZhCN = locale === 'zh-CN';

  return (
    <div className="home-container">
      <style dangerouslySetInnerHTML={{ __html: getStyle() }} /> {/* eslint-disable-line */}
      <Banner />
      <div style={{ maxWidth: 1256, margin: '0 auto' }}>
        <BlockContent title={<FormattedMessage id="app.home.recommend" />}>
          <RecommendPage />
        </BlockContent>

        <BlockContent title={<FormattedMessage id="app.home.design-and-framework" />}>
          <DesignPage />
        </BlockContent>

        <BlockContent
          title={<FormattedMessage id="app.home.more" />}
          extra={
            <Link to={getLocalizedPathname('/docs/spec/article', isZhCN)}>
              <FormattedMessage id="app.home.view-more" />
            </Link>
          }
        >
          <MorePage />
        </BlockContent>
      </div>
      <Footer />
    </div>
  );
}
