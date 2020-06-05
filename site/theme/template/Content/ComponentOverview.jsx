import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'bisheng/router';
import { useIntl } from 'react-intl';
import { Divider, Row, Col, Card, Typography, Tag, Space } from 'antd';
import { getChildren } from 'jsonml.js/lib/utils';
import { getMetaDescription, getLocalizedPathname, getThemeConfig, getMenuItems } from '../utils';
import './ComponentOverview.less';

const onClickCard = href => {
  window.gtag('event', '点击', {
    event_category: '组件总览卡片',
    event_label: href,
  });
};

const { Title } = Typography;
const ComponentOverview = ({
  componentsData = [],
  doc: {
    meta: { title },
    content,
  },
  utils: { toReactComponent },
}) => {
  const { locale } = useIntl();
  const documentTitle = `${title} - Ant Design`;
  const contentChild = getMetaDescription(getChildren(content));
  const themeConfig = getThemeConfig();
  const menuItems = getMenuItems(
    componentsData,
    locale,
    themeConfig.categoryOrder,
    themeConfig.typeOrder,
  );

  return (
    <section className="markdown">
      <Helmet encodeSpecialCharacters={false}>
        <title>{documentTitle}</title>
        <meta property="og:title" content={documentTitle} />
        {contentChild && <meta name="description" content={contentChild} />}
      </Helmet>
      <h1>{title}</h1>
      {toReactComponent(['section', { className: 'markdown' }].concat(getChildren(content)))}
      <Divider />
      {menuItems
        .filter(i => i.order > -1)
        .map(group => (
          <div key={group.title} className="components-overview">
            <Title level={2} className="components-overview-group-title">
              <Space align="center">
                {group.title}
                <Tag style={{ display: 'block' }}>{group.children.length}</Tag>
              </Space>
            </Title>
            <Row gutter={[24, 24]}>
              {group.children
                .sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
                .map(component => {
                  const url = `${component.filename
                    .replace(/(\/index)?((\.zh-cn)|(\.en-us))?\.md$/i, '')
                    .toLowerCase()}/`;
                  const href = getLocalizedPathname(url, locale === 'zh-CN');
                  return (
                    <Col xs={24} sm={12} lg={8} xl={6} key={component.title}>
                      <Link to={href} onClick={() => onClickCard(href)}>
                        <Card
                          size="small"
                          className="components-overview-card"
                          title={
                            <div className="components-overview-title">
                              {component.title} {component.subtitle}
                            </div>
                          }
                        >
                          <div className="components-overview-img">
                            <img src={component.cover} alt={component.title} />
                          </div>
                        </Card>
                      </Link>
                    </Col>
                  );
                })}
            </Row>
          </div>
        ))}
    </section>
  );
};

export default ComponentOverview;
