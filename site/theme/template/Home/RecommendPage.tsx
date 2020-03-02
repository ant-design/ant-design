import * as React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
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

const LIST: Recommend[] = [
  {
    title: 'Ant Design 4.0 正式版来了！',
    description:
      'Ant Design 4.0 正式版于 2 月 28 日提前发布！设计资产不断丰富，设计工具层出不穷，为百万设计者和开发者创造快乐工作。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*G0nDS5-aESoAAAAAAAAAAABkARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/109633620',
    popularize: true,
  },
  {
    title: '我的按钮究竟该放哪儿！？',
    description:
      '按钮是一种使用广泛的基础界面元素，我们需要并一直在探索建立按钮设计规范。Ant Design 提供了丰富的按钮类型以覆盖各种场景。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*wXuKQ6-ssWMAAAAAAAAAAABkARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/109644406',
  },
  {
    title: 'HiTu·让人人都是插画师',
    description: '图形化设计资产「海兔」帮助大家解决通用层面的需求，把设计师从重复劳动中解放出来。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*sybfTLM-CA8AAAAAAAAAAABkARQnAQ',
    href: 'https://ant.design/docs/spec/illustration-cn',
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

export default function RecommendPage() {
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
