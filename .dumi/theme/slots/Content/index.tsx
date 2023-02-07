import { CalendarOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import ContributorsList from '@qixian.cs/github-contributors-list';
import { Affix, Anchor, Avatar, Col, Skeleton, Space, Tooltip, Typography } from 'antd';
import classNames from 'classnames';
import DayJS from 'dayjs';
import { FormattedMessage, useIntl, useRouteMeta } from 'dumi';
import type { ReactNode } from 'react';
import React, { useContext, useLayoutEffect, useMemo, useState } from 'react';
import useLocation from '../../../hooks/useLocation';
import useSiteToken from '../../../hooks/useSiteToken';
import EditButton from '../../common/EditButton';
import PrevAndNext from '../../common/PrevAndNext';
import type { DemoContextProps } from '../DemoContext';
import DemoContext from '../DemoContext';
import Footer from '../Footer';
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
        transition: all ${token.motionDurationSlow};
        margin-inline-end: -8px;
      }
      &:hover {
        a,
        ${antCls}-avatar {
          margin-inline-end: 0;
        }
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
        max-height: calc(100vh - 40px) !important;
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
        &,
        &.rtl {
          padding: 0 48px;
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

const Content: React.FC<{ children: ReactNode }> = ({ children }) => {
  const meta = useRouteMeta();
  const { pathname, hash } = useLocation();
  const { formatMessage } = useIntl();
  const styles = useStyle();
  const { token } = useSiteToken();
  const { direction } = useContext(SiteContext);

  const [showDebug, setShowDebug] = useState(false);
  const debugDemos = useMemo(
    () => meta.toc?.filter((item) => item._debug_demo).map((item) => item.id) || [],
    [meta],
  );

  const isDebugDemo = debugDemos.includes(hash.slice(1));

  useLayoutEffect(() => {
    setShowDebug(process.env.NODE_ENV === 'development' || isDebugDemo);
  }, []);

  const contextValue = useMemo<DemoContextProps>(
    () => ({ showDebug, setShowDebug }),
    [showDebug, debugDemos],
  );

  const anchorItems = useMemo(
    () =>
      meta.toc.reduce<AnchorItem[]>((result, item) => {
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
      }, []),
    [meta.toc],
  );

  const isRTL = direction === 'rtl';

  const avatarPlaceholder = (
    <>
      <Skeleton.Avatar size="small" active />
      <Skeleton.Avatar size="small" active style={{ marginLeft: -8 }} />
      <Skeleton.Avatar size="small" active style={{ marginLeft: -8 }} />
    </>
  );

  return (
    <DemoContext.Provider value={contextValue}>
      <Col xxl={20} xl={19} lg={18} md={18} sm={24} xs={24}>
        <Affix>
          <section css={styles.tocWrapper} className={classNames({ rtl: isRTL })}>
            <Anchor
              css={styles.toc}
              affix={false}
              targetOffset={token.marginXXL}
              showInkInFixed
              items={anchorItems.map((item) => ({
                href: `#${item.id}`,
                title: item.title,
                key: item.id,
                children: item.children
                  ?.filter((child) => showDebug || !debugDemos.includes(child.id))
                  .map((child) => ({
                    key: child.id,
                    href: `#${child.id}`,
                    title: (
                      <span className={classNames(debugDemos.includes(child.id) && 'toc-debug')}>
                        {child?.title}
                      </span>
                    ),
                  })),
              }))}
            />
          </section>
        </Affix>
        <article css={styles.articleWrapper} className={classNames({ rtl: isRTL })}>
          {meta.frontmatter?.title && meta.frontmatter.subtitle ? (
            <Typography.Title style={{ fontSize: 30 }}>
              {meta.frontmatter?.title}
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
          ) : null}
          {/* 添加作者、时间等信息 */}
          {meta.frontmatter.date || meta.frontmatter.author ? (
            <Typography.Paragraph style={{ opacity: 0.65 }}>
              <Space>
                {meta.frontmatter.date && (
                  <span>
                    <CalendarOutlined /> {DayJS(meta.frontmatter.date).format('YYYY-MM-DD')}
                  </span>
                )}
                {meta.frontmatter.author &&
                  (meta.frontmatter.author as string)?.split(',')?.map((author) => (
                    <Typography.Link href={`https://github.com/${author}`} key={author}>
                      @{author}
                    </Typography.Link>
                  ))}
              </Space>
            </Typography.Paragraph>
          ) : null}
          {children}
          {meta.frontmatter.filename && (
            <ContributorsList
              repo="ant-design"
              owner="ant-design"
              css={styles.contributorsList}
              fileName={meta.frontmatter.filename}
              renderItem={(item, loading) =>
                loading || !item ? (
                  avatarPlaceholder
                ) : (
                  <Tooltip
                    mouseEnterDelay={0.3}
                    title={`${formatMessage({ id: 'app.content.contributors' })}: ${item.username}`}
                    key={item.username}
                  >
                    <a
                      href={`https://github.com/${item.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Avatar size="small" src={item.url}>
                        {item.username}
                      </Avatar>
                    </a>
                  </Tooltip>
                )
              }
            />
          )}
        </article>
        <PrevAndNext />
        <Footer />
      </Col>
    </DemoContext.Provider>
  );
};

export default Content;
