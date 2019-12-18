import * as React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'bisheng/router';
import { getLocalizedPathname } from '../../utils';
import './index.less';
import Certainty from './Certainty';
import Meaningful from './Meaningful';

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
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*an6USLkxir4AAAAAAAAAAABkARQnAQ',
    title: 'AntV',
    description: 'app.home.product-antv-slogan',
    href: 'https://antv.vision',
  },
  {
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*L5CSQayF2FEAAAAAAAAAAABkARQnAQ',
    title: 'Ant Design Pro',
    description: 'app.home.product-pro-slogan',
    href: 'https://pro.ant.design/',
  },
  {
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*TwTMSbN9H40AAAAAAAAAAABkARQnAQ',
    title: 'Ant Design Mobile',
    description: 'app.home.product-mobile-slogan',
    href: 'https://mobile.ant.design/',
  },
  {
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*2CrPS5YSep0AAAAAAAAAAABkARQnAQ',
    title: <FormattedMessage id="app.home.product-hitu" />,
    description: 'app.home.product-hitu-slogan',
  },
  {
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*U_IWSLxXmNgAAAAAAAAAAABkARQnAQ',
    title: 'Kitchen',
    description: 'app.home.product-kitchen-slogan',
    href: 'https://kitchen.alipay.com/',
  },
  {
    img: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*6Yy1RYXPIDIAAAAAAAAAAABkARQnAQ',
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
    <Card hoverable cover={<img alt={typeof title === 'string' ? title : 'Hitu'} src={img} />}>
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
    <div style={{ marginBottom: -36 }}>
      {/* ***************************** Group 1 ***************************** */}
      <Row gutter={[40, 72]}>
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
                    <img
                      alt="growth"
                      src="https://gw.alipayobjects.com/zos/basement_prod/5668216e-c543-4fc7-a4a3-bb5785250106.svg"
                    />
                    <h4>
                      <FormattedMessage id="app.home.growth" />
                    </h4>
                  </Col>
                  <Col span={6}>
                    <img
                      alt="natural"
                      src="https://gw.alipayobjects.com/zos/basement_prod/bf7b9fce-cb1c-4264-9596-0438b252c07e.svg"
                    />
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
                    <Link to={getLocalizedPathname('/docs/spec/values', isZhCN)}>
                      <FormattedMessage id="app.home.values" />
                      <RightOutlined />
                    </Link>
                  </li>
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
                  style={{ maxHeight: 300, maxWidth: '100%' }}
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
                  style={{ maxHeight: 300, maxWidth: '100%' }}
                  src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*8VDFTbQn4UAAAAAAAAAAAABkARQnAQ"
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* ***************************** Group 2 ***************************** */}
      <Row gutter={[40, 72]}>
        {MINI_LIST.map(panel => (
          <MiniPanel key={panel.description} {...panel} isZhCN={isZhCN} />
        ))}
      </Row>
    </div>
  );
}
