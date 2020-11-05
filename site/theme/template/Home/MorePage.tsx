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
    title: '易用度在企业级中后台产品的探索和实践',
    description:
      '作为产品设计者，经常遇到一个备受灵魂拷问的问题：怎么衡量我们设计的产品，用户体验是过关的？',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*T2tGQbqfXHUAAAAAAAAAAAAAARQnAQ',
    date: '2020-10-19',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/266728471',
  },
  {
    title: '通过200+产品设计实践给产品体验探索一个好用标准',
    description:
      '“体验”是一个非常抽象的词，我们怎么把一个抽象的概念拆解成可落地执行的策略，作用到企业中后台产品上？怎么衡量策略的有效性？',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*xougSaGIAXoAAAAAAAAAAAAAARQnAQ',
    date: '2020-10-19',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/266730093',
  },
  {
    title: '树形控件在生产力工具中的设计',
    description:
      '惊！半年实践血泪史，3000 字深度好文，一个爱树的设计师手把手教你如何设计「树 」！',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*HeZnTr710lIAAAAAAAAAAAAAARQnAQ',
    date: '2020-09-29',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/260068653',
  },
  {
    title: '我的按钮究竟该放哪儿！？',
    description:
      '按钮是一种使用广泛的基础界面元素，正因其使用的普遍性和重要性，我们需要并一直在探索建立按钮设计规范。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*d595RpGKQ_IAAAAAAAAAAAAAARQnAQ',
    date: '2020-02-29',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/109644406',
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
