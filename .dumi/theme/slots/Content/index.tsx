import React, { Suspense, useLayoutEffect, useMemo, useState } from 'react';
import { Col, Flex, FloatButton, Skeleton, Space, Typography } from 'antd';
import classNames from 'classnames';
import { FormattedMessage, useRouteMeta } from 'dumi';

import useLayoutState from '../../../hooks/useLayoutState';
import useLocation from '../../../hooks/useLocation';
import ComponentMeta from '../../builtins/ComponentMeta';
import type { DemoContextProps } from '../DemoContext';
import DemoContext from '../DemoContext';
import SiteContext from '../SiteContext';
import DocAnchor, { useStyle } from './DocAnchor';
import Contributors from './Contributors';
import ColumnCard from './ColumnCard';
import DocMeta from './DocMeta';
import Footer from '../Footer';
import PrevAndNext from '../../common/PrevAndNext';
import EditButton from '../../common/EditButton';

const AvatarPlaceholder: React.FC<{ num?: number }> = ({ num = 6 }) =>
  Array.from({ length: num }).map<React.ReactNode>((_, i) => (
    <Skeleton.Avatar size="small" active key={i} style={{ marginInlineStart: i === 0 ? 0 : -8 }} />
  ));

const Content: React.FC<React.PropsWithChildren> = ({ children }) => {
  const meta = useRouteMeta();
  const { pathname, hash } = useLocation();
  const { direction } = React.use(SiteContext);
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
    <DemoContext value={contextValue}>
      <Col xxl={20} xl={19} lg={18} md={18} sm={24} xs={24}>
        <DocAnchor showDebug={showDebug} debugDemos={debugDemos} />
        <article className={classNames(styles.articleWrapper, { rtl: isRTL })}>
          {meta.frontmatter?.title ? (
            <Flex justify="space-between">
              <Typography.Title style={{ fontSize: 32, position: 'relative' }}>
                <Space>
                  <span>{meta.frontmatter?.title}</span>
                  <span>{meta.frontmatter?.subtitle}</span>
                  {!pathname.startsWith('/components/overview') && (
                    <EditButton
                      title={<FormattedMessage id="app.content.edit-page" />}
                      filename={meta.frontmatter.filename}
                    />
                  )}
                </Space>
              </Typography.Title>
            </Flex>
          ) : null}
          <DocMeta />
          {!meta.frontmatter.__autoDescription && meta.frontmatter.description}

          {/* Import Info */}
          {meta.frontmatter.category === 'Components' &&
            String(meta.frontmatter.showImport) !== 'false' && (
              <ComponentMeta
                source
                component={meta.frontmatter.title}
                filename={meta.frontmatter.filename}
                version={meta.frontmatter.tag}
                designUrl={meta.frontmatter.designUrl}
              />
            )}
          <div style={{ minHeight: 'calc(100vh - 64px)' }}>
            {children}
            <FloatButton.BackTop />
          </div>
          <ColumnCard
            zhihuLink={meta.frontmatter.zhihu_url}
            yuqueLink={meta.frontmatter.yuque_url}
            juejinLink={meta.frontmatter.juejin_url}
          />
          <div style={{ marginTop: 120 }}>
            <Suspense fallback={<AvatarPlaceholder />}>
              <Contributors filename={meta.frontmatter.filename} />
            </Suspense>
          </div>
        </article>
        <PrevAndNext rtl={isRTL} />
        <Footer />
      </Col>
    </DemoContext>
  );
};

export default Content;
