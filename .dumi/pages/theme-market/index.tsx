import React from 'react';
import { Space, Typography } from 'antd';
import { Sender } from '@ant-design/x';
import { Helmet } from 'dumi';

import useLocale from '../../hooks/useLocale';

const { Title, Paragraph } = Typography;

const locales = {
  cn: {
    title: '主题市场',
    description: '发现和下载社区贡献的主题',
    searchPlaceholder: '搜索主题...',
  },
  en: {
    title: 'Theme Market',
    description: 'Discover and download community-contributed themes',
    searchPlaceholder: 'Search themes...',
  },
};

const ThemeMarket: React.FC = () => {
  const [locale] = useLocale(locales);

  return (
    <div style={{ padding: '24px' }}>
      {/* <Helmet>
        <title>{`${locale.title} - Ant Design`}</title>
        <meta property="og:title" content={`${locale.title} - Ant Design`} />
        <meta name="description" content={locale.description} />
      </Helmet> */}
      
      {/* <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Title level={1}>{locale.title}</Title>
        <Paragraph style={{ fontSize: '16px', color: '#666' }}>
          {locale.description}
        </Paragraph>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Sender
            placeholder={locale.searchPlaceholder}
            style={{ borderRadius: '8px' }}
          />
        </Space>
      </div> */}
    </div>
  );
};

export default ThemeMarket;
