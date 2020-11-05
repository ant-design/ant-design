import * as React from 'react';
import { useIntl } from 'react-intl';
import { Card, Row, Col, Spin } from 'antd';
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
}

const MoreCard = ({ title, description, date, img, source, href, icons }: MoreProps) => {
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
        <Card hoverable cover={<img alt={title} src={img} />} className="more-card">
          <Card.Meta title={title} description={description} />
          <div>
            {date}
            <span className="more-card-source">
              {icons ? <img src={icons[source]} alt={source} /> : <Spin />}
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
  const list = useSiteData<MoreProps[]>(['extras', isZhCN ? 'cn' : 'en']);
  const icons = useSiteData<Icons>(['icons']);
  return (
    <Row gutter={[24, 32]}>
      {list ? list.map(more => <MoreCard key={more.title} {...more} icons={icons} />) : <Spin />}
    </Row>
  );
}
