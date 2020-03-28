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
    title: 'Ant Design 4.0 正式版来了！',
    description:
      'Ant Design 4.0 正式版于 2 月 28 日提前发布！设计资产不断丰富，设计工具层出不穷，为百万设计者和开发者创造快乐工作。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*G0nDS5-aESoAAAAAAAAAAABkARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/109633620',
    popularize: true,
  },
  {
    title: '图表库 G2Plot 1.0 发布了！',
    description:
      '开箱即用图表库 G2Plot 1.0 发布，支持 40+ 图表类型，高级统计分析组件和复杂交互内置。',
    img: 'https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*Wv4XTIoIJ3gAAAAAAAAAAABkARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/113888415',
  },
  {
    title: 'HiTu·让人人都是插画师',
    description: '图形化设计资产「海兔」帮助大家解决通用层面的需求，把设计师从重复劳动中解放出来。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*sybfTLM-CA8AAAAAAAAAAABkARQnAQ',
    href: 'https://ant.design/docs/spec/illustration-cn',
  },
];

const LIST_EN: Recommend[] = [
  {
    title: 'Ant Design 4.0 is out!',
    description:
      '⚡️ Smaller, faster, prettier and more powerfull, finally Ant Design 4.0 right here.',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*G0nDS5-aESoAAAAAAAAAAABkARQnAQ',
    href: 'https://github.com/ant-design/ant-design/issues/21656',
    popularize: true,
  },
  {
    title: 'Introduce AntV',
    description: '✨ New player of front-end data visualization',
    img:
      'https://gw.alipayobjects.com/zos/antfincdn/Vb5TpaLRSn/089e332b-a54c-421e-a4f0-f2a3480e2f42.png',
    href:
      'https://medium.com/ant-design/introduce-antv-a-new-player-in-data-visualization-90ca999cfb08',
  },
  {
    title: 'G2Plot: a charting library',
    description: '📊 A charting library based on the grammar of graphics',
    img:
      'https://gw.alipayobjects.com/zos/antfincdn/NBwf%24mYoDf/d100a715-d763-4bc5-b801-23b7f56b665d.png',
    href: 'https://github.com/antvis/G2Plot',
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
        <Paragraph>{description}</Paragraph>
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
