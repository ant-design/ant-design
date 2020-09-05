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
    title: '智能组件探索：这个工具栏会自动布局',
    description:
      '工程师只需要选择「我要展示哪些元素、每个元素有多少」，而「这些元素怎么摆」、「间距是多少」等细节问题都会根据规则自动生成。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ijAcT7rl4nwAAAAAAAAAAAAAARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/188693322',
    popularize: true,
  },
  {
    title: '一个好用的智能栅格工具是如何诞生的？',
    description:
      '和大家分享一下整个智能栅格的设计开发过程，并从中感受到设计的「穿透力」，聊聊如何打破界限、从表面到内核、从表象到本质。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*jmkkRYTanJAAAAAAAAAAAAAAARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/176534657',
  },
  {
    title: '首个 Vue 3 组件库发布',
    description:
      '支持 Vite & TypeScript，开发体验比德芙还要丝滑！',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*GuqtQ4IgCz4AAAAAAAAAAAAAARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/211136687',
  },
];

const LIST_EN: Recommend[] = [
  {
    title: "「Natural Human Computer Interaction」Ant Design's Design Values",
    description:
      '🌺 This time, we will clearly explain one of our design values--「nature」, hoping to inspire you to complete your own products or systems.',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*fxVBRLq4TAcAAAAAAAAAAABkARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/44809866',
    popularize: true,
  },
  {
    title: 'Information Layouts | Ant Design 4.0',
    description:
      '🌃 Information organization is a problem we often encounter in our daily life. How to arrange all kinds of information together? And how to present them to users?',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*67WaSIK0AaYAAAAAAAAAAABkARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/110442621',
  },
  {
    title: 'Form Widths | Ant Design 4.0',
    description:
      "💡 Form is one of the most frequently-used elements in business products. Now let's discuss a neglected question: how to decide the width of a form?",
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*lRHfT6DmdFcAAAAAAAAAAABkARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/110096160',
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
