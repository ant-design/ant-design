import React, { useContext, useLayoutEffect, useMemo, useState } from 'react';
import { Col, Flex, Space, Typography, Skeleton } from 'antd';
import classNames from 'classnames';
import { FormattedMessage, useRouteMeta } from 'dumi';

import useLayoutState from '../../../hooks/useLayoutState';
import useLocation from '../../../hooks/useLocation';
import ComponentMeta from '../../builtins/ComponentMeta';
import type { DemoContextProps } from '../DemoContext';
import DemoContext from '../DemoContext';
import SiteContext from '../SiteContext';
import InViewSuspense from './InViewSuspense';
import { useStyle } from './DocAnchor';

const Contributors = React.lazy(() => import('./Contributors'));
const ColumnCard = React.lazy(() => import('./ColumnCard'));
const DocAnchor = React.lazy(() => import('./DocAnchor'));
const DocMeta = React.lazy(() => import('./DocMeta'));
const Footer = React.lazy(() => import('../Footer'));
const PrevAndNext = React.lazy(() => import('../../common/PrevAndNext'));
const EditButton = React.lazy(() => import('../../common/EditButton'));

const AvatarPlaceholder: React.FC<{ num?: number }> = ({ num = 6 }) =>
  Array.from({ length: num }).map<React.ReactNode>((_, i) => (
    <Skeleton.Avatar size="small" active key={i} style={{ marginInlineStart: i === 0 ? 0 : -8 }} />
  ));

const Content: React.FC<React.PropsWithChildren> = ({ children }) => {
  const meta = useRouteMeta();
  const { pathname, hash } = useLocation();
  const { direction } = useContext(SiteContext);
  const { styles } = useStyle();

  const [showDebug, setShowDebug] = useLayoutState(false);
  const [codeType, setCodeType] = useState('tsx');
  const debugDemos = useMemo(
    () => meta.toc?.filter((item) => item._debug_demo).map((item) => item.id) || [],
    [meta],
  );

  const isDebugDemo = debugDemos.includes(hash.slice(1));

  useLayoutEffect(() => {
    setShowDebug(process.env.NODE_ENV === 'development' || isDebugDemo);
  }, []);

  const contextValue = useMemo<DemoContextProps>(
    () => ({ showDebug, setShowDebug, codeType, setCodeType }),
    [showDebug, codeType, debugDemos],
  );

  const isRTL = direction === 'rtl';

  return (
    <DemoContext.Provider value={contextValue}>
      <Col xxl={20} xl={19} lg={18} md={18} sm={24} xs={24}>
        <InViewSuspense fallback={null}>
          <DocAnchor showDebug={showDebug} debugDemos={debugDemos} />
        </InViewSuspense>
        <article className={classNames(styles.articleWrapper, { rtl: isRTL })}>
          {meta.frontmatter?.title ? (
            <Flex justify="space-between">
              <Typography.Title style={{ fontSize: 32, position: 'relative' }}>
                <Space>
                  <span>{meta.frontmatter?.title}</span>
                  <span>{meta.frontmatter?.subtitle}</span>
                  {!pathname.startsWith('/components/overview') && (
                    <InViewSuspense fallback={null}>
                      <EditButton
                        title={<FormattedMessage id="app.content.edit-page" />}
                        filename={meta.frontmatter.filename}
                      />
                    </InViewSuspense>
                  )}
                </Space>
              </Typography.Title>
            </Flex>
          ) : null}
          <InViewSuspense fallback={null}>
            <DocMeta />
          </InViewSuspense>
          {!meta.frontmatter.__autoDescription && meta.frontmatter.description}

          {/* Import Info */}
          {meta.frontmatter.category === 'Components' &&
            String(meta.frontmatter.showImport) !== 'false' && (
              <ComponentMeta
                source
                component={meta.frontmatter.title}
                filename={meta.frontmatter.filename}
                version={meta.frontmatter.tag}
              />
            )}
          <div style={{ minHeight: 'calc(100vh - 64px)' }}>{children}</div>
          <InViewSuspense fallback={null}>
            <ColumnCard
              zhihuLink={meta.frontmatter.zhihu_url}
              yuqueLink={meta.frontmatter.yuque_url}
              juejinLink={meta.frontmatter.juejin_url}
            />
          </InViewSuspense>
          <div style={{ marginTop: 120 }}>
            <InViewSuspense fallback={<AvatarPlaceholder />}>
              <Contributors filename={meta.frontmatter.filename} />
            </InViewSuspense>
          </div>
        </article>
        <InViewSuspense fallback={null}>
          <PrevAndNext rtl={isRTL} />
        </InViewSuspense>
        <Footer />
      </Col>
    </DemoContext.Provider>
  );
};

export default Content;
