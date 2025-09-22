import React from 'react';
import { Anchor } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import type { AnchorLinkItemProps } from 'antd/es/anchor/Anchor';
import classNames from 'classnames';
import { useRouteMeta, useTabMeta } from 'dumi';

export const useStyle = createStyles(({ cssVar, token, css }) => {
  const { antCls } = token;
  return {
    anchorToc: css`
      scrollbar-width: thin;
      scrollbar-gutter: stable;
      ${antCls}-anchor {
        ${antCls}-anchor-link-title {
          font-size: ${cssVar.fontSizeSM};
        }
      }
    `,
    tocWrapper: css`
      position: fixed;
      top: calc(${token.headerHeight}px + ${cssVar.marginXL} - 4px);
      inset-inline-end: 0;
      width: 148px;
      padding: 0;
      border-radius: ${cssVar.borderRadius};
      box-sizing: border-box;
      margin-inline-end: calc(8px - 100vw + 100%);
      z-index: 10;
      .toc-debug {
        color: ${cssVar.purple6};
        &:hover {
          color: ${cssVar.purple5};
        }
      }
      > div {
        box-sizing: border-box;
        width: 100%;
        max-height: calc(100vh - ${token.headerHeight}px - ${cssVar.marginXL} - 24px) !important;
        margin: auto;
        overflow: auto;
        padding: ${cssVar.paddingXXS};
        backdrop-filter: blur(8px);
      }

      @media only screen and (max-width: ${cssVar.screenLG}) {
        display: none;
      }
    `,
    articleWrapper: css`
      padding-inline: 48px 164px;
      padding-block: 0 32px;

      @media only screen and (max-width: ${cssVar.screenLG}) {
        & {
          padding: 0 calc(${cssVar.paddingLG} * 2);
        }
      }
    `,
  };
});

interface DocAnchorProps {
  showDebug?: boolean;
  debugDemos?: string[];
}

interface AnchorItem {
  id: string;
  title: string;
  children?: AnchorItem[];
}

const DocAnchor: React.FC<DocAnchorProps> = ({ showDebug, debugDemos = [] }) => {
  const { styles } = useStyle();
  const token = useTheme();
  const meta = useRouteMeta();
  const tab = useTabMeta();

  const renderAnchorItem = (item: AnchorItem): AnchorLinkItemProps => ({
    href: `#${item.id}`,
    title: item.title,
    key: item.id,
    children: item.children
      ?.filter((child) => showDebug || !debugDemos.includes(child.id))
      .map<AnchorLinkItemProps>((child) => ({
        key: child.id,
        href: `#${child.id}`,
        title: (
          <span className={classNames({ 'toc-debug': debugDemos.includes(child.id) })}>
            {child?.title}
          </span>
        ),
      })),
  });

  const anchorItems = React.useMemo<AnchorItem[]>(
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
        affix={false}
        className={styles.anchorToc}
        targetOffset={token.anchorTop}
        showInkInFixed
        items={anchorItems.map<AnchorLinkItemProps>(renderAnchorItem)}
      />
    </section>
  );
};

export default DocAnchor;
