import React, { ReactNode, type FC } from 'react';
import { useRouteMeta } from 'dumi';
import Footer from 'dumi/theme/slots/Footer';
import { Col, Typography } from 'antd';
import EditButton from '../../common/EditButton';
import { FormattedMessage } from 'react-intl';
import useLocation from '../../../hooks/useLocation';

const Content: FC<{ children: ReactNode }> = ({ children }) => {
  // TODO: implement content
  // from: https://github.com/ant-design/ant-design/blob/2a754bd5cad7fd4892a065a8e044fb402f51f426/site/theme/template/Content/MainContent.jsx
  //  1. Title & edit link --- Done
  //  2. TOC
  //  3. Contributors list
  //  4. Prev & next page

  console.log('route meta', useRouteMeta());
  const meta = useRouteMeta();
  const { pathname } = useLocation();

  return (
    <Col xxl={20} xl={19} lg={18} md={18} sm={24} xs={24}>
      <div style={{ padding: '0 170px 32px 64px' }}>
        <Typography.Title level={2}>
          {meta.frontmatter.title}
          {meta.frontmatter.subtitle && (
            <span style={{ marginLeft: 12 }}>{meta.frontmatter.subtitle}</span>
          )}
          {!pathname.startsWith('/components/overview') && (
            <EditButton
              title={<FormattedMessage id="app.content.edit-page" />}
              // filename={filename}
            />
          )}
        </Typography.Title>
        {children}
      </div>
      <Footer />
    </Col>
  );
};

export default Content;
