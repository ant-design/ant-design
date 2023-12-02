import { CalendarOutlined } from '@ant-design/icons';
import { createStyles, useTheme } from 'antd-style';
import ContributorsList from '@qixian.cs/github-contributors-list';
import classNames from 'classnames';
import DayJS from 'dayjs';
import { FormattedMessage, useIntl, useRouteMeta, useTabMeta } from 'dumi';
import type { ReactNode } from 'react';
import React, { useContext, useLayoutEffect, useMemo, useState } from 'react';
import { Anchor, Avatar, Col, Skeleton, Space, Tooltip, Typography } from 'antd';
import useLayoutState from '../../../hooks/useLayoutState';
import useLocation from '../../../hooks/useLocation';
import EditButton from '../../common/EditButton';
import PrevAndNext from '../../common/PrevAndNext';
import ComponentChangelog from '../../common/ComponentChangelog';
import type { DemoContextProps } from '../DemoContext';
import DemoContext from '../DemoContext';
import Footer from '../Footer';
import SiteContext from '../SiteContext';
import ColumnCard from './ColumnCard';

const useStyle = createStyles(({ token, css }) => {
  const { antCls } = token;

  return {
    contributorsList: css`
      display: flex;
      flex-wrap: wrap;
      margin-top: 120px !important;
      clear: both;

      li {
        height: 24px;
      }

      li,
      ${antCls}-avatar + ${antCls}-avatar {
        transition: all ${token.motionDurationSlow};
        margin-inline-end: -8px;
      }
      &:hover {
        li,
        ${antCls}-avatar {
          margin-inline-end: 0;
        }
      }
    `,
    listMobile: css`
      margin: 1em 0 !important;
    `,
    toc: css`
      ${antCls}-anchor {
        ${antCls}-anchor-link-title {
          font-size: 12px;
        }
      }
    `,
    tocWrapper: css`
      position: fixed;
      top: ${token.headerHeight + token.contentMarginTop}px;
      inset-inline-end: 0;
      width: 160px;
      margin: 0 0 12px 0;
      padding: 8px 0;
      padding-inline: 4px 8px;
      backdrop-filter: blur(8px);
      border-radius: ${token.borderRadius}px;
      box-sizing: border-box;
      z-index: 1000;

      .toc-debug {
        color: ${token.purple6};

        &:hover {
          color: ${token.purple5};
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
});

type AnchorItem = {
  id: string;
  title: string;
  children?: AnchorItem[];
};

const AvatarPlaceholder: React.FC<{ num?: number }> = ({ num = 3 }) => (
  <li>
    {Array.from({ length: num }).map((_, i) => (
      <Skeleton.Avatar size="small" active key={i} style={{ marginLeft: i === 0 ? 0 : -8 }} />
    ))}
  </li>
);

const AuthorAvatar: React.FC<{ name: string; avatar: string }> = ({ name, avatar }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useLayoutEffect(() => {
    const img = new Image();
    img.src = avatar;
    img.onload = () => setLoading(false);
    img.onerror = () => setError(true);
  }, []);
  if (error) {
    return null;
  }
  if (loading) {
    return <Skeleton.Avatar size="small" active />;
  }
  return (
    <Avatar size="small" src={avatar} alt={name}>
      {name}
    </Avatar>
  );
};

const Content: React.FC<{ children: ReactNode }> = ({ children }) => {
  const meta = useRouteMeta();
  const tab = useTabMeta();
  const { pathname, hash } = useLocation();
  const { formatMessage } = useIntl();
  const { styles } = useStyle();
  const token = useTheme();
  const { direction, isMobile } = useContext(SiteContext);

  const [showDebug, setShowDebug] = useLayoutState(false);
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
      (tab?.toc || meta.toc).reduce<AnchorItem[]>((result, item) => {
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
    [tab?.toc, meta.toc],
  );

  const isRTL = direction === 'rtl';

  const mergedAuthorInfos = useMemo(() => {
    const { author } = meta.frontmatter;
    if (!author) {
      return [];
    }
    if (typeof author === 'string') {
      return author.split(',').map((item) => ({
        name: item,
        avatar: `https://github.com/${item}.png`,
      }));
    }
    if (Array.isArray(author)) {
      return author;
    }
    return [];
  }, [meta.frontmatter.author]);

  return (
    <DemoContext.Provider value={contextValue}>
      <Col xxl={20} xl={19} lg={18} md={18} sm={24} xs={24}>
        {!!meta.frontmatter.toc && (
          <section className={styles.tocWrapper}>
            <Anchor
              className={styles.toc}
              affix={false}
              targetOffset={token.anchorTop}
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
        )}
        <article className={classNames(styles.articleWrapper, { rtl: isRTL })}>
          {meta.frontmatter?.title ? (
            <Typography.Title style={{ fontSize: 30, position: 'relative' }}>
              <Space size="small">
                {meta.frontmatter?.title}
                {meta.frontmatter?.subtitle}

                {!pathname.startsWith('/components/overview') && (
                  <EditButton
                    title={<FormattedMessage id="app.content.edit-page" />}
                    filename={meta.frontmatter.filename}
                  />
                )}
              </Space>
              {pathname.startsWith('/components/') && <ComponentChangelog pathname={pathname} />}
            </Typography.Title>
          ) : null}
          {/* 添加作者、时间等信息 */}
          {meta.frontmatter.date || meta.frontmatter.author ? (
            <Typography.Paragraph>
              <Space>
                {meta.frontmatter.date && (
                  <span style={{ opacity: 0.65 }}>
                    <CalendarOutlined /> {DayJS(meta.frontmatter.date).format('YYYY-MM-DD')}
                  </span>
                )}
                {mergedAuthorInfos.map((info) => (
                  <a
                    href={`https://github.com/${info.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={info.name}
                  >
                    <Space size={3}>
                      <AuthorAvatar name={info.name} avatar={info.avatar} />
                      <span style={{ opacity: 0.65 }}>@{info.name}</span>
                    </Space>
                  </a>
                ))}
              </Space>
            </Typography.Paragraph>
          ) : null}
          {!meta.frontmatter.__autoDescription && meta.frontmatter.description}
          <div style={{ minHeight: 'calc(100vh - 64px)' }}>{children}</div>
          {(meta.frontmatter?.zhihu_url ||
            meta.frontmatter?.yuque_url ||
            meta.frontmatter?.juejin_url) && (
            <ColumnCard
              zhihuLink={meta.frontmatter.zhihu_url}
              yuqueLink={meta.frontmatter.yuque_url}
              juejinLink={meta.frontmatter.juejin_url}
            />
          )}
          {meta.frontmatter.filename && (
            <ContributorsList
              cache
              repo="ant-design"
              owner="ant-design"
              className={classNames(styles.contributorsList, { [styles.listMobile]: isMobile })}
              fileName={meta.frontmatter.filename}
              renderItem={(item, loading) => {
                if (!item || loading) {
                  return <AvatarPlaceholder />;
                }
                if (item.username?.includes('github-actions')) {
                  return null;
                }
                return (
                  <Tooltip
                    mouseEnterDelay={0.3}
                    title={`${formatMessage({ id: 'app.content.contributors' })}: ${item.username}`}
                    key={item.username}
                  >
                    <li>
                      <a
                        href={`https://github.com/${item.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Avatar size="small" src={item.url} alt={item.username}>
                          {item.username}
                        </Avatar>
                      </a>
                    </li>
                  </Tooltip>
                );
              }}
            />
          )}
        </article>
        <PrevAndNext rtl={isRTL} />
        <Footer />
      </Col>
    </DemoContext.Provider>
  );
};

export default Content;
