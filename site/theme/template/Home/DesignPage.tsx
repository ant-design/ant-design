import * as React from 'react';
import { Row, Col, Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'bisheng/router';
import { getLocalizedPathname } from '../utils';
import './DesignPage.less';

const { Title } = Typography;

export default function DesignPage() {
  const { locale } = useIntl();
  const isZhCN = locale === 'zh-CN';

  return (
    <Row gutter={[40, 72]}>
      {/* Design Values */}
      <Col span={24}>
        <div className="design-card" style={{ background: '#F9FCFE' }}>
          <Title level={3}>
            <FormattedMessage id="app.home.design-values" />
          </Title>
          <Row>
            <Col xs={24} sm={9}>
              <FormattedMessage id="app.home.design-values-description" />
            </Col>
            <Col xs={24} sm={15}>
              <Row className="design-values">
                <Col span={6}>
                  <h4>
                    <FormattedMessage id="app.home.certainty" />
                  </h4>
                </Col>
                <Col span={6}>
                  <h4>
                    <FormattedMessage id="app.home.meaningful" />
                  </h4>
                </Col>
                <Col span={6}>
                  <h4>
                    <FormattedMessage id="app.home.growth" />
                  </h4>
                </Col>
                <Col span={6}>
                  <h4>
                    <FormattedMessage id="app.home.natural" />
                  </h4>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Col>

      {/* Design Guide */}
      <Col xs={24} sm={12}>
        <div className="design-card sub-card" style={{ background: '#E6F1FF' }}>
          <Row>
            <Col xs={24} sm={10} className="card-info">
              <Title level={3}>
                <FormattedMessage id="app.home.design-guide" />
              </Title>

              <ul>
                <li>
                  <Link to={getLocalizedPathname('/docs/react/introduce', isZhCN)}>
                    <FormattedMessage id="app.home.values" />
                    <RightOutlined />
                  </Link>
                </li>
                <li>
                  <Link to={getLocalizedPathname('/docs/react/introduce', isZhCN)}>
                    <FormattedMessage id="app.home.global-style" />
                    <RightOutlined />
                  </Link>
                </li>
                <li>
                  <Link to={getLocalizedPathname('/docs/react/introduce', isZhCN)}>
                    <FormattedMessage id="app.home.design-patterns" />
                    <RightOutlined />
                  </Link>
                </li>
              </ul>
            </Col>
            <Col xs={24} sm={14} style={{ alignSelf: 'flex-end' }}>
              <div style={{ height: 300, background: 'green' }} />
            </Col>
          </Row>
        </div>
      </Col>

      {/* Components */}
      <Col xs={24} sm={12}>
        <div className="design-card sub-card" style={{ background: '#DEF6FF' }}>
          <Row>
            <Col xs={24} sm={10} className="card-info">
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
                  <Link to={getLocalizedPathname('/docs/react/introduce', isZhCN)}>
                    Ant Design of Angular
                    <RightOutlined />
                  </Link>
                </li>
                <li>
                  <Link to={getLocalizedPathname('/docs/react/introduce', isZhCN)}>
                    Ant Design of Vue
                    <RightOutlined />
                  </Link>
                </li>
              </ul>
            </Col>
            <Col xs={24} sm={14} style={{ alignSelf: 'flex-end' }}>
              <div style={{ height: 300, background: 'green' }} />
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
}
