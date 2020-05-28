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
    title: '蚂蚁金服体验技术部招聘啦！',
    description:
      '欢迎志同道合的你加入我们，一同在「引领全球体验科技，创造一流用户体验」的愿景指引下前行。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*BPVATKTgfXwAAAAAAAAAAABkARQnAQ',
    href: 'https://www.yuque.com/uf44r1/wqrwsg/alwufg',
    popularize: true,
  },
  {
    title: '图表库 G2Plot 1.0 发布了！',
    description:
      '开箱即用图表库 G2Plot 1.0 发布，支持 40+ 图表类型，高级统计分析组件和复杂交互内置。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*UsnLRpUZChQAAAAAAAAAAABkARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/113888415',
  },
  {
    title: 'Ant Design 暗黑模式设计解析',
    description: '让我们一起来看下，Ant Design 这一针对企业级的设计体系是如何设计暗黑模式的？',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*pxK_TboMzL8AAAAAAAAAAABkARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/112470365',
  },
];

const LIST_EN: Recommend[] = [
  {
    title: 'Ant Experience Technology Department Wants You!',
    description:
      '⚡️ Our vision is ’To Lead Global Experience Technology, to Create First-Class User Experience.‘. Welcome to join us.',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*BPVATKTgfXwAAAAAAAAAAABkARQnAQ',
    href: 'https://www.yuque.com/uf44r1/wqrwsg/alwufg',
    popularize: true,
  },
  {
    title: 'Chart Library G2Plot 1.0 has Come!',
    description:
      '📈 G2Plot 1.0 supports 40+ types of charts, including built-in statistic & analysis components and complicated interactions. Now it is ready for use out of the box.',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*UsnLRpUZChQAAAAAAAAAAABkARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/113888415',
  },
  {
    title: 'Dark Theme of Ant Design',
    description: '🌃 Let us take a look at how to design the dark theme of Ant Design.',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*pxK_TboMzL8AAAAAAAAAAABkARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/112470365',
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
