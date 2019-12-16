import * as React from 'react';
import { Card, Row, Col } from 'antd';
import './MorePage.less';

interface MoreProps {
  title: string;
  description: string;
  date: string;
  img: string;
  source: 'zhihu' | 'yuque';
}

const SourceImages = {
  zhihu: 'https://gw.alipayobjects.com/zos/basement_prod/82ed216a-542d-4cfa-ac82-0043cd026330.svg',
  yuque: 'https://gw.alipayobjects.com/zos/basement_prod/a94c012e-53ae-4640-ab9e-d1633dda48e0.svg',
};

const MORE_LIST: MoreProps[] = [
  {
    title: '自然交互-Ant Design 设计价值观解析',
    description: '不要在你家里放一件你不知其用，或你认为不美的东西',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*OkjZQ7w-hIoAAAAAAAAAAABkARQnAQ',
    date: '2019-12-28',
    source: 'zhihu',
  },
  {
    title: 'Ant Design 色板生成算法演进之路',
    description:
      'Ant Design 三个大版本的色板生成算法各不相同，却一直在完善，本文对其三个版本的色板…',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*73YrSYdHajIAAAAAAAAAAABkARQnAQ',
    date: '2019-10-23',
    source: 'zhihu',
  },
  {
    title: '如何向开源项目提交无法解答的问题',
    description: '开源社区里，提问和回答是最有趣的组成部分，有些你来我往，有些则石沉大海。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*hdaZR4xFtLYAAAAAAAAAAABkARQnAQ',
    date: '2019-09-15',
    source: 'yuque',
  },
  {
    title: 'Ant Design 设计工具 Kitchen 获客增长实践',
    description: '不要在你家里放一件你不知其用，或你认为不美的东西',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*UFLvR6yPQzoAAAAAAAAAAABkARQnAQ',
    date: '2019-04-12',
    source: 'zhihu',
  },
];

const MoreCard = ({ title, description, date, img, source }: MoreProps) => {
  return (
    <Col xs={24} sm={6}>
      <Card hoverable cover={<img alt={title} src={img} />} className="more-card">
        <Card.Meta title={title} description={description} />
        <div>
          {date}
          <span className="more-card-source">
            <img src={SourceImages[source]} alt={source} />
          </span>
        </div>
      </Card>
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
