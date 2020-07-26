import * as React from 'react';
import { Card, Row, Col } from 'antd';
import './MorePage.less';

interface MoreProps {
  title: string;
  description: string;
  date: string;
  img: string;
  source: 'zhihu' | 'yuque';
  href: string;
}

const SourceImages = {
  zhihu: 'https://gw.alipayobjects.com/zos/basement_prod/5f4e1fd0-d255-4309-b181-a3715a720ebe.svg',
  yuque: 'https://gw.alipayobjects.com/zos/basement_prod/53e7a5b8-c9f4-45a4-8378-cbf50f2dd0d0.svg',
};

const MORE_LIST: MoreProps[] = [
  {
    title: '编辑器设计系列：每天都在用，你真的了解它么？',
    description:
      '提起编辑器，你会想到什么？也许你从来没有意识到，但是从接触计算机开始，你就和各种编辑器打上了交道。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*c88yR4TO1z8AAAAAAAAAAABkARQnAQ',
    date: '2020-04-15',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/113961511',
  },
  {
    title: '让价值被发现：如何在 B 端做增长',
    description:
      '在蚂蚁体验技术部，我们除了做好体验设计的「老本行」外，也在现有的增长理论指导下，结合自身业务，边落地实践，边沉淀总结。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*6ZajSKDM3MMAAAAAAAAAAABkARQnAQ',
    date: '2020-01-17',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/103093131',
  },
  {
    title: '蚂蚁前端研发最佳实践',
    description:
      '本文介绍了蚂蚁前端研发的最佳实践，其中提取了三个比较重要的点，每个点都是我们实践和深入思考后的结果，希望能对大家有所启发。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*eHjqRLpxlcsAAAAAAAAAAABkARQnAQ',
    date: '2019-12-03',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/94949118',
  },
  {
    title: '“炫酷狂拽”的 AntV - L7 地图可视化设计',
    description:
      '不忘初心，方致千里，L7 从「心」出发，知设计体系之源，致地图可视化设计之远。本文揭秘 L7 这次探寻之旅中的 4 大发现。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*dGj_Tq9PtPMAAAAAAAAAAABkARQnAQ',
    date: '2019-11-28',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/94203386',
  },
];

const MoreCard = ({ title, description, date, img, source, href }: MoreProps) => {
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
              <img src={SourceImages[source]} alt={source} />
            </span>
          </div>
        </Card>
      </a>
    </Col>
  );
};

export default function MorePage() {
  return (
    <Row gutter={[24, 32]}>
      {MORE_LIST.map(more => (
        <MoreCard key={more.title} {...more} />
      ))}
    </Row>
  );
}
