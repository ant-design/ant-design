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
    title: 'Ant Design 4.0：创造快乐工作',
    description: '本篇文章将和大家一起聊聊 Ant Design 4.0，以及穿插一些 4.0 背后的故事。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*yQqmQ514NNIAAAAAAAAAAABkARQnAQ',
    date: '2020-01-16',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/103016912',
  },
  {
    title: '设计体系的响应式设计',
    description:
      'Ant Design 在很多组件中提供了响应式设计，但拥有更加完备的环境适应性应该是设计体系长期的目标之一。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*C6uMRqtw90AAAAAAAAAAAABkARQnAQ',
    date: '2020-02-29',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/109781992',
  },
  {
    title: '“表里不一”的设计资产',
    description:
      '随着企业级产品复杂业务场景的增加，Ant Design 的列表覆盖度也受到了很大的挑战，因此我们决定一探究竟。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*z-BPSqBKK_cAAAAAAAAAAABkARQnAQ',
    date: '2020-03-01',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/110071209',
  },
  {
    title: '整齐划一？不如错落有致',
    description:
      '今天我们从中来讨论一个更被大家忽视但实则举重若轻的问题——「我们应怎样去考虑表单的宽度」',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*1HQFQKoRUCQAAAAAAAAAAABkARQnAQ',
    date: '2020-03-01',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/110096160',
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
