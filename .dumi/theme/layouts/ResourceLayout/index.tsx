import type { PropsWithChildren } from 'react';
import React from 'react';
import { ConfigProvider, Layout, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { FormattedMessage, useRouteMeta } from 'dumi';

import useDark from '../../../hooks/useDark';
import CommonHelmet from '../../common/CommonHelmet';
import EditButton from '../../common/EditButton';
import Footer from '../../slots/Footer';
import AffixTabs from './AffixTabs';

export type ResourceLayoutProps = PropsWithChildren<{}>;

const resourcePadding = 40;
const articleMaxWidth = 1208;
const resourcePaddingXS = 24;

const useStyle = () => {
  const isRootDark = useDark();

  return createStyles((config) => {
    const { token, css } = config;
    const { antCls } = token;

    return {
      resourcePage: css`
        footer {
          margin-top: 176px;

          .rc-footer-container {
            max-width: ${articleMaxWidth}px;
            margin: 0 auto;
            padding-right: 0;
            padding-left: 0;
          }
        }
      `,
      resourceContent: css`
        padding: 0 ${resourcePadding}px;
        max-width: ${articleMaxWidth}px;
        margin: 0 auto;
        box-sizing: content-box;
        min-height: 100vh;

        @media only screen and (max-width: 767.99px) {
          & {
            article {
              padding: 0 ${resourcePaddingXS}px;
            }

            ${antCls}-col {
              padding-top: 16px !important;
              padding-bottom: 16px !important;
            }
          }
        }
      `,
      banner: css`
        padding: 0 ${resourcePadding}px;
        overflow: hidden;
        ${
          isRootDark
            ? ``
            : `background: url('https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*y_r7RogIG1wAAAAAAAAAAABkARQnAQ');`
        }
        background-size: cover;

        h1 {
          box-sizing: content-box;
          max-width: ${articleMaxWidth}px;
          margin: 56px auto 16px;
        }

        section {
          max-width: ${articleMaxWidth}px;
          margin: 0 auto 56px;
          font-weight: 200;
          font-size: 16px;
          line-height: 24px;
        }

        @media only screen and (max-width: 767.99px) {
          & {
            margin: 0 -${resourcePaddingXS}px;
            padding: 0 ${resourcePaddingXS}px;
          }
        }
      `,
    };
  })();
};

const ResourceLayout: React.FC<ResourceLayoutProps> = ({ children }) => {
  const { styles } = useStyle();
  const meta = useRouteMeta();
  const isRootDark = useDark();

  const node = (
    <Layout>
      <CommonHelmet />
      <div id="resources-page" className={styles.resourcePage}>
        <AffixTabs />
        <div className={styles.banner}>
          <Typography.Title style={{ fontSize: 30 }}>
            {meta.frontmatter?.title}
            <EditButton
              title={<FormattedMessage id="app.content.edit-page" />}
              filename={meta.frontmatter.filename}
            />
          </Typography.Title>
          <section>{meta.frontmatter.description}</section>
        </div>
        <div className={styles.resourceContent}>{children}</div>
        <Footer />
      </div>
    </Layout>
  );

  if (!isRootDark) {
    return <ConfigProvider theme={{ token: { colorBgLayout: '#fff' } }}>{node}</ConfigProvider>;
  }

  return node;
};

export default ResourceLayout;
