import * as React from 'react';
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
import { Row, Col, Typography, Spin } from 'antd';
import { useSiteData } from './util';
import './RecommendPage.less';

const { Title, Paragraph } = Typography;

interface Recommend {
  title?: string;
  img?: string;
  href?: string;
  popularize?: boolean;
  description?: string;
  loading?: boolean;
}

interface RecommendBlockProps extends Recommend {
  main?: boolean;
}

const RecommendBlock = ({
  main,
  title,
  popularize,
  description,
  img,
  href,
  loading,
}: RecommendBlockProps) => {
  return (
    <a
      className={classNames('recommend-block', {
        'recommend-block-main': !!main,
        'recommend-block-loading': loading,
      })}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        window?.gtag('event', '点击', {
          event_category: '首页推广',
          event_label: href,
        });
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
  const list = useSiteData<Recommend[]>('recommendations', isZhCN ? 'cn' : 'en');
  const isLoading = !list;
  console.log(list);
  return (
    <Row gutter={[24, 24]} style={{ marginBottom: -36 }}>
      <Col xs={24} sm={14}>
        <RecommendBlock {...(list ? list[0] : {})} main loading={isLoading} />
      </Col>
      <Col xs={24} sm={10}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <RecommendBlock {...(list ? list[1] : {})} loading={isLoading} />
          </Col>
          <Col span={24}>
            <RecommendBlock {...(list ? list[2] : {})} loading={isLoading} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
