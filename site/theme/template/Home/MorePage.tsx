import * as React from 'react';
import { Card, Row, Col } from '@allenai/varnish';
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
    title: '设计考古：工具类产品 Office',
    description:
      '微软 Office 办公系列产品的精髓在于 Ribbon（功能区）设计模式，它很好的解决了文档类、工具类复杂产品的高交互密度设计难题。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*nJogR776K8EAAAAAAAAAAABkARQnAQ',
    date: '2019-11-05',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/90304083',
  },
  {
    title: '数据可视化的驱动与使能',
    description:
      '“指哪打哪”形容听从驱使。在数据可视化设计中，操作“听从驱使”的可视化作品又是一种什么样的体验呢？',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*kGFrS4JCGo8AAAAAAAAAAABkARQnAQ',
    date: '2019-10-30',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/89352118',
  },
  {
    title: '【AntV 关系图编辑器】交互设计沉思录',
    description:
      'AntV 是 Ant Design 设计语言中的可视化部分。本文讲述的是关系型数据 G6 中流程图编辑器的搭建经验。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*1fTSTKxbOqAAAAAAAAAAAABkARQnAQ',
    date: '2019-09-11',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/82146871',
  },
  {
    title: '设计法则「映射」: 让你的设计更符合直觉',
    description: '影响一个东西好不好用的因素有很多，本文将从125条通用设计法则中的「映射Mapping」出发，探讨一下这个法则对事物可用性的影响。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*AVELR486CNcAAAAAAAAAAABkARQnAQ',
    date: '2019-08-24',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/79632824',
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
