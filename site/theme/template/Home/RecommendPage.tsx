import * as React from 'react';
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
import { Row, Col, Typography } from '@allenai/varnish';
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
    title: 'Ant Design 1.0 背后的故事：把艺术变成技术',
    description:
      'Ant Design 是一个设计体系，而 Ant Designers 是一群人。本文将讲讲 Ant Design 1.0 背后的故事，还原那些人、那些事。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*h21tT45dgD8AAAAAAAAAAABkARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/104027273',
    popularize: true,
  },
  {
    title: 'Ant Design Pro V5 已经支持预览',
    description:
      '经过长时间的准备，Pro V5 已经基本完成。在新版本中我们进行了很多预设，对于数据流和布局更是进行了大刀阔斧的改进。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*oY1sTrR5FswAAAAAAAAAAABkARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/141740103',
  },
  {
    title: 'JCD 驱动 - 复杂系统设计应对之道',
    description: '基于蚂蚁集团 CTO 线的业务土壤，我们探索出以 JCD 为核心的企业级产品设计思维，助力设计师在深耕业务上有章可循，有方法可用。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*dGDxQZQ7ymoAAAAAAAAAAABkARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/103237648',
  },
];

const LIST_EN: Recommend[] = [
  {
    title: 'The Story behind Ant Design 1.0: Turn Art into Technology',
    description:
      '🌺 While Ant Design is a design system, Ant Designers are a group of people. This article will tell you the story behind Ant Design 1.0.',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*h21tT45dgD8AAAAAAAAAAABkARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/104027273',
    popularize: true,
  },
  {
    title: 'Ant Design Pro V5 has Supported Preview!',
    description:
      '📈 After a long time of preparation, Pro V5 has been basically completed. In this new version, we have done a lot of presets, and have made radical improvements to the data flow and layouts.',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*oY1sTrR5FswAAAAAAAAAAABkARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/141740103',
  },
  {
    title: 'Driven by JCD: How to Design Complicated Systems',
    description: '🏦 Based on the business practice of Ant Group CTO line, we have summed up a design thinking system of enterprise product, which is called JCD.',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*dGDxQZQ7ymoAAAAAAAAAAABkARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/103237648',
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
