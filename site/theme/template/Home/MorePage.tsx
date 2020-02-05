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
    title: 'Ant Design 设计资产的秩序之美',
    description:
      '希望通过这套方法和资产能够赋能给更多的用户，提高设计生产效率的同时更好的保障产品体验的内在一致性。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*a7OXQpgmA-YAAAAAAAAAAABkARQnAQ',
    date: '2020-01-15',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/102696372',
  },
  {
    title: '围绕应用生命周期的编排设计',
    description:
      '我们是企业级技术产品领域的设计师，同时也是掘金者，这篇分享即是我们探索的一些方法总结。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*jwQGT7HifmcAAAAAAAAAAABkARQnAQ',
    date: '2020-01-14',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/102546649',
  },
  {
    title: '解放图形化设计生产力 - HiTu',
    description:
      'HiTu 目前以图形化设计资产的形式和大家见面，使用 ETCG 的思路设计，让人人都是插画设计师。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Up8ARYnOd_AAAAAAAAAAAABkARQnAQ',
    date: '2020-01-10',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/100925117',
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
