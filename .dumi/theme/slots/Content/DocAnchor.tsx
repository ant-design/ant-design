import React, { useMemo } from 'react';
import { Anchor } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import classNames from 'classnames';
import { useRouteMeta, useTabMeta } from 'dumi';

const useStyle = createStyles(({ token, css }) => {
  const { antCls } = token;

  return {
    toc: css`
      ${antCls}-anchor {
        ${antCls}-anchor-link-title {
          font-size: 12px;
        }
      }
    `,
    tocWrapper: css`
      position: fixed;
      top: ${token.headerHeight + token.contentMarginTop - 8}px;
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
        max-height: calc(100vh - ${token.headerHeight + token.contentMarginTop + 24}px) !important;
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

interface DocAnchorProps {
  showDebug?: boolean;
  debugDemos?: string[];
}

type AnchorItem = {
  id: string;
  title: string;
  children?: AnchorItem[];
};

const DocAnchor: React.FC<DocAnchorProps> = ({ showDebug, debugDemos = [] }) => {
  const { styles } = useStyle();
  const token = useTheme();
  const meta = useRouteMeta();
  const tab = useTabMeta();

  const renderAnchorItem = (item: AnchorItem) => ({
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
  });

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

  if (!meta.frontmatter.toc) {
    return null;
  }

  return (
    <section className={styles.tocWrapper}>
      <Anchor
        className={styles.toc}
        affix={false}
        targetOffset={token.anchorTop}
        showInkInFixed
        items={anchorItems.map(renderAnchorItem)}
      />
    </section>
  );
};

export default DocAnchor;
