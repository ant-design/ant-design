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
    title: '「人机自然交互」Ant Design 设计价值观解析',
    description:
      '这一次，我们将清晰阐述「自然」这一价值观，希望能启发或帮助大家完成自己的产品 / 体系构建；同时，你们的反馈和互动也会成为我们进步的源泉和动力。',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*fxVBRLq4TAcAAAAAAAAAAABkARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/44809866',
    popularize: true,
  },
  {
    title: '言之有序 | Ant Design 4.0 系列分享',
    description:
      '信息组织是我们在日常生活中经常会遇到的问题，各式各样的信息是如何被组织编排到一起，又是以何种方式把信息呈现给用户呢？',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*67WaSIK0AaYAAAAAAAAAAABkARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/110442621',
  },
  {
    title: '整齐划一？不如错落有致。| Ant Design 4.0 系列分享',
    description:
      '表单是在各类业务产品中出现最高频的元素之一。今天我们来讨论一个被大家忽视但实则举重若轻的问题：怎样去考虑表单的宽度？',
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*lRHfT6DmdFcAAAAAAAAAAABkARQnAQ',
    href: 'https://zhuanlan.zhihu.com/p/110096160',
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
