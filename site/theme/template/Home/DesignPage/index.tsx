import * as React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'bisheng/router';
import { getLocalizedPathname } from '../../utils';
import './index.less';
import Certainty from './Certainty';
import Meaningful from './Meaningful';
import Growth from './Growth';
import Natural from './Natural';

const { Title } = Typography;

interface PanelProps {
  img: string;
  title: React.ReactNode;
  description: string;
  href?: string;
  link?: string;
}

const MINI_LIST: PanelProps[] = [
  {
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ZhzDQLMyYlYAAAAAAAAAAABkARQnAQ',
    title: 'AntV',
    description: 'app.home.product-antv-slogan',
    href: 'https://antv.vision',
  },
  {
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*I-ygS5prYksAAAAAAAAAAABkARQnAQ',
    title: 'Ant Design Pro',
    description: 'app.home.product-pro-slogan',
    href: 'https://pro.ant.design/',
  },
  {
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*mb-WQILTlSEAAAAAAAAAAABkARQnAQ',
    title: 'Ant Design Mobile',
    description: 'app.home.product-mobile-slogan',
    href: 'https://mobile.ant.design/',
  },
  {
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*_6bRTavNfH4AAAAAAAAAAABkARQnAQ',
    title: <FormattedMessage id="app.home.product-hitu" />,
    description: 'app.home.product-hitu-slogan',
  },
  {
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*MaL2SYtHPuMAAAAAAAAAAABkARQnAQ',
    title: 'Kitchen',
    description: 'app.home.product-kitchen-slogan',
    href: 'https://kitchen.alipay.com/',
  },
  {
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*T_HeSIJ30IIAAAAAAAAAAABkARQnAQ',
    title: 'Icons',
    description: 'app.home.product-icons-slogan',
    link: '/components/icon/',
  },
];

const MiniPanel = ({
  title,
  img,
  description,
  href,
  link,
  isZhCN,
}: PanelProps & { isZhCN: boolean }) => {
  let content = (
    <Card
      hoverable
      className="design-mini-panel"
      cover={<img alt={typeof title === 'string' ? title : 'Hitu'} src={img} />}
    >
      <Card.Meta title={title} description={<FormattedMessage id={description} />} />
    </Card>
  );

  if (href) {
    content = (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  } else if (link) {
    content = <Link to={getLocalizedPathname(link, isZhCN)}>{content}</Link>;
  }

  return (
    <Col xs={24} sm={8}>
      {content}
    </Col>
  );
};

export default function DesignPage() {
  const { locale } = useIntl();
  const isZhCN = locale === 'zh-CN';

  return (
    <div style={{ marginBottom: -28 }}>
      {/* ***************************** Group 1 ***************************** */}
      <Row gutter={[40, 40]}>
        {/* *********************** Design Values *********************** */}
        <Col span={24}>
          <div
            className="design-card"
            style={{
              backgroundImage:
                'url(https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*i1EySrFVZvAAAAAAAAAAAABkARQnAQ)',
              backgroundSize: 'cover',
            }}
          >
            <Title level={3}>
              <FormattedMessage id="app.home.design-values" />
            </Title>

            <Link
              className="design-card-detail"
              to={getLocalizedPathname('/docs/spec/values', isZhCN)}
            >
              <FormattedMessage id="app.home.detail" />
              <RightOutlined />
            </Link>

            <Row>
              <Col xs={24} sm={8}>
                <FormattedMessage id="app.home.design-values-description" />
              </Col>
              <Col xs={24} sm={16}>
                <Row className="design-values">
                  <Col span={6}>
                    <Certainty />
                    <h4>
                      <FormattedMessage id="app.home.certainty" />
                    </h4>
                  </Col>
                  <Col span={6}>
                    <Meaningful />
                    <h4>
                      <FormattedMessage id="app.home.meaningful" />
                    </h4>
                  </Col>
                  <Col span={6}>
                    <Growth />
                    <h4>
                      <FormattedMessage id="app.home.growth" />
                    </h4>
                  </Col>
                  <Col span={6}>
                    <Natural />
                    <h4>
                      <FormattedMessage id="app.home.natural" />
                    </h4>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>

        {/* *********************** Design Guides *********************** */}
        <Col xs={24} sm={12}>
          <div className="design-card sub-card" style={{ background: '#E6F1FF' }}>
            <Row>
              <Col xs={24} sm={9} className="card-info">
                <Title level={3}>
                  <FormattedMessage id="app.home.design-guide" />
                </Title>

                <ul>
                  <li>
                    <Link to={getLocalizedPathname('/docs/spec/colors', isZhCN)}>
                      <FormattedMessage id="app.home.global-style" />
                      <RightOutlined />
                    </Link>
                  </li>
                  <li>
                    <Link to={getLocalizedPathname('/docs/spec/overview', isZhCN)}>
                      <FormattedMessage id="app.home.design-patterns" />
                      <RightOutlined />
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col xs={24} sm={15} style={{ alignSelf: 'flex-end', textAlign: 'right' }}>
                <img
                  alt="design guide"
                  style={{ maxHeight: 278, maxWidth: '100%' }}
                  src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*5PRzTL4pwuYAAAAAAAAAAABkARQnAQ"
                />
              </Col>
            </Row>
          </div>
        </Col>

        {/* ************************* Component ************************* */}
        <Col xs={24} sm={12}>
          <div className="design-card sub-card" style={{ background: '#DEF6FF' }}>
            <Row>
              <Col xs={24} sm={9} className="card-info">
                <Title level={3}>
                  <FormattedMessage id="app.home.components" />
                </Title>

                <ul>
                  <li>
                    <Link to={getLocalizedPathname('/docs/react/introduce', isZhCN)}>
                      Ant Design of React
                      <RightOutlined />
                    </Link>
                  </li>
                  <li>
                    <a href="https://ng.ant.design/" target="_blank" rel="noopener noreferrer">
                      Ant Design of Angular
                      <RightOutlined />
                    </a>
                  </li>
                  <li>
                    <a href="https://vue.ant.design/" target="_blank" rel="noopener noreferrer">
                      Ant Design of Vue
                      <RightOutlined />
                    </a>
                  </li>
                </ul>
              </Col>
              <Col xs={24} sm={15} style={{ alignSelf: 'flex-end', textAlign: 'right' }}>
                <img
                  alt="components"
                  style={{ maxHeight: 278, maxWidth: '100%' }}
                  src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*8VDFTbQn4UAAAAAAAAAAAABkARQnAQ"
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* ***************************** Group 2 ***************************** */}
      <Row style={{ marginTop: 40 }} gutter={[40, 40]}>
        {MINI_LIST.map(panel => (
          <MiniPanel key={panel.description} {...panel} isZhCN={isZhCN} />
        ))}
      </Row>
    </div>
  );
}
