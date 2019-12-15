import * as React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Typography } from 'antd';
import './RecommendPage.less';

const { Title, Paragraph } = Typography;

interface Recommend {
  title: string;
  popularize?: boolean;
  description: string;
}

const LIST: Recommend[] = [
  {
    title: '语雀·我们都喜欢的文档工具',
    description:
      '好的界面设计并不始于图片，而是始于对人的理解，比如人们喜欢什么，为什么人们会试用某种特定的软件，他们可能与之怎样交互',
    popularize: true,
  },
  {
    title: '全新的蚂蚁全新的蚂蚁金服数据可视化解决方案',
    description:
      '好的界面设计并不始于图片，而是始于对人的理解，比如人们喜欢什么，为什么人们会试用某种特定的软件，他们可能与之怎样交互',
  },
  {
    title: 'Kitchen·界面设计师神器',
    description:
      '好的界面设计并不始于图片，而是始于对人的理解，比如人们喜欢什么，为什么人们会试用某种特定的软件，他们可能与之怎样交互',
  },
];

interface RecommendBlockProps extends Recommend {
  main?: boolean;
}

const RecommendBlock = ({ main, title, popularize, description }: RecommendBlockProps) => {
  return (
    <a className={classNames('recommend-block', main && 'main')}>
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
    <Row gutter={24}>
      <Col span={14}>
        <RecommendBlock {...LIST[0]} main />
      </Col>
      <Col span={10}>
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
