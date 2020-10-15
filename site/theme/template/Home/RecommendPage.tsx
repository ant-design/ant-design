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
    title: '树形控件在生产力工具中的设计',
    description:
      '惊！半年实践血泪史，3000 字深度好文，一个爱树的设计师手把手教你如何设计「树 」！',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Z4eXS55fMigAAAAAAAAAAAAAARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/260068653',
    popularize: true,
  },
  {
    title: '或许这就是下一代组件库',
    description:
      '随着 React hooks、Vue composition API 的推出，或许组件库有了新的突破点。',
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
    title: "How to Design Tree Component",
    description:
      '🌲 Surprise! With half-a-year practice of blood and tears, here comes a designer who deeply loves trees to teach you how to design 「tree」component!',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Z4eXS55fMigAAAAAAAAAAAAAARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/260068653',
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
