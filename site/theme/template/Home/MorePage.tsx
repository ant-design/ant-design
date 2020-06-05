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
    title: 'Ant Design 4.0 的一些杂事儿 - Space 篇',
    description:
      '作为前端开发者，我们总是不断的在与样式做斗争。今天，我们聊聊 Ant Design 中新增的 Space 组件。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*jHvSR48tRccAAAAAAAAAAABkARQnAQ',
    date: '2020-04-24',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/135446399',
  },
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
    title: 'JCD 驱动 - 复杂系统设计应对之道',
    description:
      '基于蚂蚁金服CTO线的业务土壤，我们探索出以JCD为核心的企业级产品设计思维，助力设计师在深耕业务上有章可循。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*y-xiQoZzBCEAAAAAAAAAAABkARQnAQ',
    date: '2020-01-17',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/103237648',
  },
  {
    title: '折柱饼 +3 个套路，简单图表你真的会用吗？',
    description: '本文一句话概括：数据可视化中，如何用最简单的图表高效地传递信息。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Q1DMQpLCDQgAAAAAAAAAAABkARQnAQ',
    date: '2019-11-28',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/93808863',
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
