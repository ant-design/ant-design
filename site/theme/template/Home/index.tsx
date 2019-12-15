import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Typography } from 'antd';
import RecommendPage from './RecommendPage';

const { Title } = Typography;

interface BlockContentProps {
  title: React.ReactNode;
}

const BlockContent: React.FC<BlockContentProps> = ({ title, children }) => (
  <div style={{ margin: '0 24px', background: 'red' }}>
    <Title level={2} style={{ fontWeight: 'lighter', marginBottom: 56 }}>
      {title}
    </Title>
    {children}
  </div>
);

export default function Home() {
  return (
    <div>
      <FormattedMessage id="app.home.introduce" />

      <div style={{ maxWidth: 1208, margin: '0 auto' }}>
        <BlockContent title={<FormattedMessage id="app.home.recommend" />}>
          <RecommendPage />
        </BlockContent>
      </div>
    </div>
  );
}
