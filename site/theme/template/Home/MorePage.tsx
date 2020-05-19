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
    title: 'Ant Design 4.0 的一些杂事儿 - CI 篇',
    description: '4.0 正式版的到来之后，在这里想聊聊技术之外的事儿。不用动太多脑子，当个小品阅读即可~',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*GhL4Q5oRePsAAAAAAAAAAABkARQnAQ',
    date: '2020-03-16',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/113537427',
  },
  {
    title: 'Ant Design 4.0 ，脱离业务的框架都是耍流氓',
    description:
      '作为 Ant Design 的实践案例、业务需求方和同一层楼的小伙伴，一起聊聊「4.0 背后的故事」。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*C1-TT7vgidAAAAAAAAAAAABkARQnAQ',
    date: '2020-03-04',
    source: 'zhihu',
    href: 'https://zhuanlan.zhihu.com/p/110863773',
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
