import React, { ReactNode, type FC, useMemo } from 'react';
import { useIntl, useRouteMeta } from 'dumi';
import Footer from 'dumi/theme/slots/Footer';
import { Col, Typography, Avatar, Tooltip, Affix, Anchor } from 'antd';
import EditButton from '../../common/EditButton';
import { FormattedMessage } from 'react-intl';
import useLocation from '../../../hooks/useLocation';
import ContributorsList from '@qixian.cs/github-contributors-list';
import useSiteToken from '../../../hooks/useSiteToken';
import { css } from '@emotion/react';
import PrevAndNext from '../../common/PrevAndNext';

const useStyle = () => {
  const { token } = useSiteToken();

  const { antCls } = token;

  return {
    contributorsList: css`
      display: flex;
      flex-wrap: wrap;
      margin-top: 120px !important;

      a,
      ${antCls}-avatar + ${antCls}-avatar {
        margin-bottom: 8px;
        margin-inline-end: 8px;
      }
    `,
    toc: css`
      position: absolute;
      top: 8px;
      right: 20px;
      margin-block: 20px;
      width: 120px;

      ${antCls}-anchor-link-title {
        font-size: 12px;
      }
    `,
  };
};

type AnchorItem = {
  id: string;
  title: string;
  children?: AnchorItem[];
};

const Content: FC<{ children: ReactNode }> = ({ children }) => {
  // TODO: implement content
  // from: https://github.com/ant-design/ant-design/blob/2a754bd5cad7fd4892a065a8e044fb402f51f426/site/theme/template/Content/MainContent.jsx
  //  1. Title & edit link --- Need filename
  //  2. TOC --- Done
  //  3. Contributors list --- Need filename
  //  4. Prev & next page --- Done

  console.log('route meta', useRouteMeta());
  const meta = useRouteMeta();
  const { pathname } = useLocation();
  const { formatMessage } = useIntl();
  const styles = useStyle();

  const anchorItems = useMemo(() => {
    return meta.toc.reduce<AnchorItem[]>((result, item) => {
      if (item.depth === 2) {
        result.push({ ...item });
      } else if (item.depth === 3) {
        const parent = result[result.length - 1];
        console.log(parent);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push({ ...item });
        }
      }
      return result;
    }, []);
  }, [meta.toc]);

  return (
    <Col xxl={20} xl={19} lg={18} md={18} sm={24} xs={24}>
      <Anchor css={styles.toc}>
        {anchorItems.map(item => (
          <Anchor.Link href={`#${item.id}`} title={item.title} key={item.id}>
            {item.children?.map(child => (
              <Anchor.Link href={`#${child.id}`} title={child.title} key={child.id} />
            ))}
          </Anchor.Link>
        ))}
      </Anchor>
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
        <ContributorsList
          css={styles.contributorsList}
          fileName="components/button/index.zh-CN.md"
          renderItem={(item, loading) =>
            loading ? (
              <Avatar style={{ opacity: 0.3 }} />
            ) : (
              item && (
                <Tooltip
                  title={`${formatMessage({ id: 'app.content.contributors' })}: ${item.username}`}
                  key={item.username}
                >
                  <a
                    href={`https://github.com/${item.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Avatar src={item.url}>{item.username}</Avatar>
                  </a>
                </Tooltip>
              )
            )
          }
          repo="ant-design"
          owner="ant-design"
        />
      </div>
      <PrevAndNext />
      <Footer />
    </Col>
  );
};

export default Content;
