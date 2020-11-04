import * as React from 'react';
import { useIntl } from 'react-intl';
import { Card, Row, Col, Spin } from 'antd';
import './MorePage.less';
import { getSiteData } from './util';

interface MoreProps {
  title: string;
  description: string;
  date: string;
  img: string;
  source: 'zhihu' | 'yuque';
  href: string;
  icons?: { [source in 'zhihu' | 'yuque']: string };
}

const MoreCard = ({ title, description, date, img, source, href, icons }: MoreProps) => {
  return (
    <Col xs={24} sm={6}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          if (window.gtag) {
            window.gtag('event', '点击', {
              event_category: '首页文章',
              event_label: href,
            });
          }
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
  const [list, setList] = React.useState<Array<MoreProps>>(null!);
  const [icons, setIcons] = React.useState<any>(null!);
  getSiteData(['extras', isZhCN ? 'cn' : 'en']).then(setList);
  getSiteData(['icons']).then(setIcons);
  return (
    <Row gutter={[24, 32]}>
      {list ? list.map(more => <MoreCard key={more.title} {...more} icons={icons} />) : <Spin />}
    </Row>
  );
}
