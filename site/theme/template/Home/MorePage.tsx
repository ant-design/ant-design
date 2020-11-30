import * as React from 'react';
import { useIntl } from 'react-intl';
import { Card, Row, Col } from 'antd';
import { useSiteData } from './util';
import './MorePage.less';

type SourceType = 'zhihu' | 'yuque';

type Icons = Record<SourceType, string>;

interface MoreProps {
  title: string;
  description: string;
  date: string;
  img: string;
  source: SourceType;
  href: string;
  icons?: Icons;
  loading?: boolean;
}

const MoreCard = ({ title, description, date, img, source, href, icons, loading }: MoreProps) => {
  return (
    <Col xs={24} sm={6}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          window?.gtag('event', '点击', {
            event_category: '首页文章',
            event_label: href,
          });
        }}
      >
        <Card
          hoverable
          cover={loading ? undefined : <img alt={title} src={img} />}
          loading={loading}
          className="more-card"
        >
          <Card.Meta title={title} description={description} />
          <div>
            {date}
            <span className="more-card-source">
              {icons ? <img src={icons[source]} alt={source} /> : null}
            </span>
          </div>
        </Card>
      </a>
    </Col>
  );
};

export default function MorePage() {
  const { locale } = useIntl();
  const isZhCN = locale === 'zh-CN';
  const list = useSiteData<MoreProps[]>('extras', isZhCN ? 'cn' : 'en');
  const icons = useSiteData<Icons>('icons');
  const loadingProps = { loading: true } as MoreProps;
  return (
    <Row gutter={[24, 32]}>
      {(list || [loadingProps, loadingProps, loadingProps, loadingProps]).map((more, i) => (
        <MoreCard key={more.title || i} {...more} icons={icons} />
      ))}
    </Row>
  );
}
