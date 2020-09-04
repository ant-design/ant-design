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
    title: '智能组件探索：这个工具栏会自动布局',
    description:
      '工程师只需要选择「我要展示哪些元素、每个元素有多少」，而「这些元素怎么摆」、「间距是多少」等细节问题都会根据规则自动生成。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*A_F0SL5shbEAAAAAAAAAAAAAARQnAQ',
    date: '2020-08-19',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/188693322',
  },
  {
    title: '一个好用的智能栅格工具是如何诞生的？',
    description:
      '和大家分享一下整个智能栅格的设计开发过程，并从中感受到设计的「穿透力」，聊聊如何打破界限、从表面到内核、从表象到本质。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*hk19TqWVSDsAAAAAAAAAAAAAARQnAQ',
    date: '2020-08-09',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/176534657',
  },
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
    title: '设计法则「映射」: 让你的设计更符合直觉',
    description:
      '影响一个东西好不好用的因素有很多，本文将从125条通用设计法则中的「映射Mapping」出发，探讨一下这个法则对事物可用性的影响。',
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
