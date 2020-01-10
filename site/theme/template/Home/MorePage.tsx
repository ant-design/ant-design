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
    title: 'Ant Design 1.0 背后的故事：把艺术变成技术',
    description: '本文将跟大家分享 Ant Design 1.0 诞生背后的故事，还原 3-4 年前那些事、那些人。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Cu8LRZW_AqgAAAAAAAAAAABkARQnAQ',
    date: '2019-11-07',
    source: 'yuque',
    href: 'https://www.yuque.com/lyndon/daylesson/xw45g0',
  },
  {
    title: '「人机自然交互」Ant Design 设计价值观解析',
    description: '为何选择「自然」作为设计价值观？本文会详细阐述这背后的思考和实践。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*V-w4Q6EvVWsAAAAAAAAAAABkARQnAQ',
    date: '2019-09-26',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/44809866',
  },
  {
    title: 'Ant Design 色板生成算法演进之路',
    description:
      '「确定」 作为设计价值观之一，在调色板中发挥得淋漓尽致，既做到设计有迹可循，也提高代码的可维护性。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*2iP4TLjiZMwAAAAAAAAAAABkARQnAQ',
    date: '2018-03-13',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/32422584',
  },
  {
    title: '2019，优雅的 AntV 来了',
    description:
      '对可视化系统而言，设计正是把不确定的海量、高维、非结构化的数据用准确、有效的方式传递。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*_9JJSpF6T6oAAAAAAAAAAABkARQnAQ',
    date: '2019-11-25',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/93620507',
  },
];

const MoreCard = ({ title, description, date, img, source, href }: MoreProps) => {
  return (
    <Col xs={24} sm={6}>
      <a href={href} target="_blank" rel="noopener noreferrer">
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
