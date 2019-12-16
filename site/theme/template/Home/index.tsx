import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Typography } from 'antd';
import RecommendPage from './RecommendPage';
import DesignPage from './DesignPage';
import MorePage from './MorePage';
import Footer from '../Layout/Footer';
import './index.less';

const { Title } = Typography;

interface BlockContentProps {
  title: React.ReactNode;
}

const BlockContent: React.FC<BlockContentProps> = ({ title, children }) => (
  <div
    style={{
      margin: '88px 24px 124px',
    }}
  >
    <Title level={2} style={{ fontWeight: 'lighter', marginBottom: 56 }}>
      {title}
    </Title>
    {children}
  </div>
);

export default function Home() {
  return (
    <div className="home-container">
      <FormattedMessage id="app.home.introduce" />

      <div style={{ maxWidth: 1256, margin: '0 auto' }}>
        <BlockContent title={<FormattedMessage id="app.home.recommend" />}>
          <RecommendPage />
        </BlockContent>

        <BlockContent title={<FormattedMessage id="app.home.design-and-framework" />}>
          <DesignPage />
        </BlockContent>

        <BlockContent title={<FormattedMessage id="app.home.more" />}>
          <MorePage />
        </BlockContent>
      </div>

      <Footer />
    </div>
  );
}
