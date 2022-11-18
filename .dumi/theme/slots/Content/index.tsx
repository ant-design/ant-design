import React, { ReactNode, type FC, useMemo, useState, useLayoutEffect, useContext } from 'react';
import { useIntl, useRouteMeta } from 'dumi';
import Footer from 'dumi/theme/slots/Footer';
import { Col, Typography, Avatar, Tooltip, Affix, Anchor } from 'antd';
import EditButton from '../../common/EditButton';
import { FormattedMessage } from 'dumi';
import useLocation from '../../../hooks/useLocation';
import ContributorsList from '@qixian.cs/github-contributors-list';
import useSiteToken from '../../../hooks/useSiteToken';
import { css } from '@emotion/react';
import PrevAndNext from '../../common/PrevAndNext';
import DemoContext, { DemoContextProps } from '../DemoContext';
import classNames from 'classnames';
import SiteContext from '../SiteContext';

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
      ${antCls}-anchor {
        ${antCls}-anchor-link-title {
          font-size: 12px;
        }
      }
    `,
    tocWrapper: css`
      position: absolute;
      top: 8px;
      right: 0;
      width: 160px;
      margin: 12px 0;
      padding: 8px 8px 8px 4px;
      backdrop-filter: blur(8px);
      border-radius: ${token.borderRadius}px;
      box-sizing: border-box;

      .toc-debug {
        color: ${token['purple-6']};

        &:hover {
          color: ${token['purple-5']};
        }
      }

      > div {
        box-sizing: border-box;
        width: 100%;
        max-height: calc(100vh - 40px);
        margin: 0 auto;
        overflow: auto;
        padding-inline: 4px;
      }

      &.rtl {
        right: auto;
        left: 20px;
      }

      @media only screen and (max-width: ${token.screenLG}px) {
        display: none;
      }
    `,
    articleWrapper: css`
      padding: 0 170px 32px 64px;

      &.rtl {
        padding: 0 64px 144px 170px;
      }

      @media only screen and (max-width: ${token.screenLG}px) {
        &, &.rtl {
          padding-right: 48px;
          padding-left: 48px;
        }
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
  const meta = useRouteMeta();
  const { pathname } = useLocation();
  const { formatMessage } = useIntl();
  const styles = useStyle();
  const { direction } = useContext(SiteContext);

  const [showDebug, setShowDebug] = useState(false);
  const debugDemos = useMemo(
    () => meta.toc?.filter((item) => item._debug_demo).map((item) => item.id) || [],
    [meta],
  );

  useLayoutEffect(() => {
    setShowDebug(process.env.NODE_ENV === 'development');
  }, []);

  const contextValue = useMemo<DemoContextProps>(
    () => ({ showDebug, setShowDebug }),
    [showDebug, debugDemos],
  );

  const anchorItems = useMemo(() => {
    return meta.toc.reduce<AnchorItem[]>((result, item) => {
      if (item.depth === 2) {
        result.push({ ...item });
      } else if (item.depth === 3) {
        const parent = result[result.length - 1];
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push({ ...item });
        }
      }
      return result;
    }, []);
  }, [meta.toc]);

  const isRTL = direction === 'rtl';

  return (
    <DemoContext.Provider value={contextValue}>
      <Col xxl={20} xl={19} lg={18} md={18} sm={24} xs={24}>
        <Affix>
          <section css={styles.tocWrapper} className={classNames({ rtl: isRTL })}>
            <Anchor css={styles.toc} affix={false} showInkInFixed>
              {anchorItems.map((item) => (
                <Anchor.Link href={`#${item.id}`} title={item.title} key={item.id}>
                  {item.children
                    ?.filter((child) => showDebug || !debugDemos.includes(child.id))
                    .map((child) => (
                      <Anchor.Link
                        href={`#${child.id}`}
                        title={
                          <span
                            className={classNames(debugDemos.includes(child.id) && 'toc-debug')}
                          >
                            {child.title}
                          </span>
                        }
                        key={child.id}
                      />
                    ))}
                </Anchor.Link>
              ))}
            </Anchor>
          </section>
        </Affix>
        <article css={styles.articleWrapper} className={classNames({ rtl: isRTL })}>
          <Typography.Title style={{ fontSize: 30 }}>
            {meta.frontmatter.title}
            {meta.frontmatter.subtitle && (
              <span style={{ marginLeft: 12 }}>{meta.frontmatter.subtitle}</span>
            )}
            {!pathname.startsWith('/components/overview') && (
              <EditButton
                title={<FormattedMessage id="app.content.edit-page" />}
                filename={meta.frontmatter.filename}
              />
            )}
          </Typography.Title>
          {children}
          <ContributorsList
            css={styles.contributorsList}
            fileName={meta.frontmatter.filename ?? ''}
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
        </article>
        <PrevAndNext />
        <Footer />
      </Col>
    </DemoContext.Provider>
  );
};

export default Content;
