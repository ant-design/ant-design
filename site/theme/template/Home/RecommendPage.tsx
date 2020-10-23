import * as React from 'react';
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
import { Row, Col, Typography } from 'antd';
import './RecommendPage.less';

const { Title, Paragraph } = Typography;

interface Recommend {
  title: string;
  img: string;
  href: string;
  popularize?: boolean;
  description: string;
}

const LIST_CN: Recommend[] = [
  {
    title: '这几个 Ant Design 色彩的小知识，我猜你不知道！',
    description: '今天不说大道理，就给大家科普几个 Ant Design 色彩的小知识——',
    img: 'https://pic2.zhimg.com/v2-254eebfe6b092b0b9c1f8d17f3c64d3d_1440w.jpg?source=172ae18b',
    href: 'https://zhuanlan.zhihu.com/p/268168773',
    popularize: true,
  },
  {
    title: '或许这就是下一代组件库',
    description: '随着 React hooks、Vue composition API 的推出，或许组件库有了新的突破点。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*SU6hQ5jHVEsAAAAAAAAAAAAAARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/252824872',
  },
  {
    title: 'Ant Design 4.0 的一些杂事儿 - VirtualList 篇',
    description:
      '在 React 中，我们常说不太需要关注性能问题。然而作为组件库，这些事你就不得不考虑一下。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ULOBQroFRMQAAAAAAAAAAAAAARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/237996796',
  },
];

const LIST_EN: Recommend[] = [
  {
    title: 'These a few color knowledge of Ant Design, I guess you do not know!',
    description:
      'This time, we do not talk about theoretical knowledge, just a few color design skills of Ant Design',
    img: 'https://pic2.zhimg.com/v2-254eebfe6b092b0b9c1f8d17f3c64d3d_1440w.jpg?source=172ae18b',
    href: 'https://zhuanlan.zhihu.com/p/268168773',
    popularize: true,
  },
  {
    title: 'Next Generation of Component Library?',
    description:
      '😎 With the launch of React hooks and Vue composition API, perhaps we have met a new breakthrough point of component libraries.',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*SU6hQ5jHVEsAAAAAAAAAAAAAARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/252824872',
  },
  {
    title: 'Stories about Ant Design 4.0: VirtualList',
    description:
      "🏃 In React, usually you don't need to focus on performance problems. However, as a component library, we have to think about it.",
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ULOBQroFRMQAAAAAAAAAAAAAARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/237996796',
  },
];

interface RecommendBlockProps extends Recommend {
  main?: boolean;
  img: string;
  href: string;
}

const RecommendBlock = ({
  main,
  title,
  popularize,
  description,
  img,
  href,
}: RecommendBlockProps) => {
  return (
    <a
      className={classNames('recommend-block', main && 'recommend-block-main')}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        if (window.gtag) {
          window.gtag('event', '点击', {
            event_category: '首页推广',
            event_label: href,
          });
        }
      }}
    >
      <img src={img} alt={title} />
      {popularize && (
        <span className="recommend-popularize">
          <FormattedMessage id="app.home.popularize" />
        </span>
      )}
      <div className="recommend-content">
        <Title level={4}>{title}</Title>
        <Paragraph style={{ fontSize: 13 }}>{description}</Paragraph>
      </div>
    </a>
  );
};

export default function RecommendPageo() {
  const { locale } = useIntl();
  const isZhCN = locale === 'zh-CN';
  const LIST = isZhCN ? LIST_CN : LIST_EN;
  return (
    <Row gutter={[24, 24]} style={{ marginBottom: -36 }}>
      <Col xs={24} sm={14}>
        <RecommendBlock {...LIST[0]} main />
      </Col>
      <Col xs={24} sm={10}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <RecommendBlock {...LIST[1]} />
          </Col>
          <Col span={24}>
            <RecommendBlock {...LIST[2]} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
