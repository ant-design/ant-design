import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'bisheng/router';
import { useIntl } from 'react-intl';
import { groupBy } from 'lodash';
import { Divider, Row, Col, Card, Typography } from 'antd';
import { getChildren } from 'jsonml.js/lib/utils';
import { getMetaDescription, getLocalizedPathname, getThemeConfig } from '../utils';
import * as utils from '../utils';

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
  const menuItems = utils.getMenuItems(
    componentsData,
    locale,
    themeConfig.categoryOrder,
    themeConfig.typeOrder,
  );
  // const group = groupBy(componentsData, 'type');
  const componentGroups = menuItems.filter(i => i.order > -1);
  console.log(componentGroups);
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
      {componentGroups.map((group, index) => {
        return (
          <div key={index}>
            <Title level={2} className="group-title">
              {group.title}
            </Title>
            <Row gutter={[24, 24]} className="components-overview">
              {group.children.map(component => {
                const url =
                  component.filename
                    .replace(/(\/index)?((\.zh-cn)|(\.en-us))?\.md$/i, '')
                    .toLowerCase() + '/';
                return (
                  <Col
                    xs={24}
                    sm={12}
                    lg={8}
                    xl={6}
                    xxl={4}
                    className="container"
                    key={component.title}
                  >
                    <a href={getLocalizedPathname(url, locale === 'zh-CN')} target="_blank">
                      <Card
                        size="small"
                        className="card"
                        title={
                          <div className="title">
                            {component.title} {component.subtitle}
                          </div>
                        }
                      >
                        <div className="img">
                          <img src={component.cover} alt={component.title} />
                        </div>
                        {/*{meta.type}*/}
                      </Card>
                    </a>
                  </Col>
                );
              })}
            </Row>
          </div>
        );
      })}
    </section>
  );
};

export default ComponentOverview;
