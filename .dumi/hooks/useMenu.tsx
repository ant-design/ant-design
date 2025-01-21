import React, { useMemo } from 'react';
import type { MenuProps } from 'antd';
import { Space, Tag, version } from 'antd';
import { createStyles } from 'antd-style';
import classnames from 'classnames';
import { useFullSidebarData, useSidebarData } from 'dumi';

import Link from '../theme/common/Link';
import useLocation from './useLocation';

function isVersionNumber(value?: string) {
  return value && /^\d+\.\d+\.\d+$/.test(value);
}

const useStyle = createStyles(({ css, token }) => ({
  link: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  tag: css`
    margin-inline-end: 0;
  `,
  subtitle: css`
    font-weight: normal;
    font-size: ${token.fontSizeSM}px;
    opacity: 0.8;
  `,
}));

interface MenuItemLabelProps {
  before?: React.ReactNode;
  after?: React.ReactNode;
  link: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  search?: string;
  tag?: string;
  className?: string;
}

const MenuItemLabelWithTag: React.FC<MenuItemLabelProps> = (props) => {
  const { styles } = useStyle();
  const { before, after, link, title, subtitle, search, tag, className } = props;
  if (!before && !after) {
    return (
      <Link to={`${link}${search}`} className={classnames(className, { [styles.link]: tag })}>
        <Space>
          <span>{title}</span>
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </Space>
        {tag && (
          <Tag
            bordered={false}
            className={classnames(styles.tag)}
            color={isVersionNumber(tag) || tag === 'New' ? 'success' : 'processing'}
          >
            {tag.replace('VERSION', version)}
          </Tag>
        )}
      </Link>
    );
  }
  return (
    <Link to={`${link}${search}`} className={className}>
      {before}
      {title}
      {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      {after}
    </Link>
  );
};

export interface UseMenuOptions {
  before?: React.ReactNode;
  after?: React.ReactNode;
}

const useMenu = (options: UseMenuOptions = {}): readonly [MenuProps['items'], string] => {
  const fullData = useFullSidebarData();
  const { pathname, search } = useLocation();
  const sidebarData = useSidebarData();
  const { before, after } = options;

  const menuItems = useMemo<MenuProps['items']>(() => {
    const sidebarItems = [...(sidebarData ?? [])];

    // 将设计文档未分类的放在最后
    if (pathname.startsWith('/docs/spec')) {
      const notGrouped = sidebarItems.splice(0, 1);
      sidebarItems.push(...notGrouped);
    }

    // 把 /changelog 拼到开发文档中
    if (pathname.startsWith('/docs/react')) {
      const changelogData = Object.entries(fullData).find(([key]) =>
        key.startsWith('/changelog'),
      )?.[1];
      if (changelogData) {
        sidebarItems.splice(1, 0, changelogData[0]);
      }
    }
    if (pathname.startsWith('/changelog')) {
      const reactDocData = Object.entries(fullData).find(([key]) =>
        key.startsWith('/docs/react'),
      )?.[1];
      if (reactDocData) {
        sidebarItems.unshift(reactDocData[0]);
        sidebarItems.push(...reactDocData.slice(1));
      }
    }

    return (
      sidebarItems?.reduce<Exclude<MenuProps['items'], undefined>>((result, group) => {
        if (group?.title) {
          // 设计文档特殊处理二级分组
          if (pathname.startsWith('/docs/spec')) {
            const childrenGroup = group.children.reduce<
              Record<string, ReturnType<typeof useSidebarData>[number]['children']>
            >((childrenResult, child) => {
              const type = child.frontmatter?.type ?? 'default';
              if (!childrenResult[type]) {
                childrenResult[type] = [];
              }
              childrenResult[type].push(child);
              return childrenResult;
            }, {});
            const childItems = [];
            childItems.push(
              ...(childrenGroup.default?.map((item) => ({
                label: (
                  <Link to={`${item.link}${search}`}>
                    {before}
                    {item?.title}
                    {after}
                  </Link>
                ),
                key: item.link.replace(/(-cn$)/g, ''),
              })) ?? []),
            );
            Object.entries(childrenGroup).forEach(([type, children]) => {
              if (type !== 'default') {
                childItems.push({
                  type: 'group',
                  label: type,
                  key: type,
                  children: children?.map((item) => ({
                    label: (
                      <Link to={`${item.link}${search}`}>
                        {before}
                        {item?.title}
                        {after}
                      </Link>
                    ),
                    key: item.link.replace(/(-cn$)/g, ''),
                  })),
                });
              }
            });
            result.push({
              label: group?.title,
              key: group?.title,
              children: childItems,
            });
          } else {
            result.push({
              type: 'group',
              label: group?.title,
              key: group?.title,
              children: group.children?.map((item) => ({
                label: (
                  <MenuItemLabelWithTag
                    before={before}
                    after={after}
                    link={item.link}
                    title={item?.title}
                    subtitle={item.frontmatter?.subtitle}
                    search={search}
                    tag={item.frontmatter?.tag}
                  />
                ),
                key: item.link.replace(/(-cn$)/g, ''),
              })),
            });
          }
        } else {
          const list = group.children || [];
          // 如果有 date 字段，我们就对其进行排序
          if (list.every((info) => info?.frontmatter?.date)) {
            list.sort((a, b) => (a.frontmatter?.date > b.frontmatter?.date ? -1 : 1));
          }
          result.push(
            ...list.map((item) => ({
              label: (
                <MenuItemLabelWithTag
                  before={before}
                  after={after}
                  link={item.link}
                  title={item?.title}
                  search={search}
                  tag={item.frontmatter?.tag}
                />
              ),
              key: item.link.replace(/(-cn$)/g, ''),
            })),
          );
        }
        return result;
      }, []) ?? []
    );
  }, [sidebarData, fullData, pathname, search, options]);

  return [menuItems, pathname] as const;
};

export default useMenu;
