import React, { useMemo } from 'react';
import { MenuProps, Tag } from 'antd';
import { useFullSidebarData, useSidebarData } from 'dumi';
import Link from '../theme/common/Link';
import useLocation from './useLocation';

interface MenuItem {
  label: React.ReactNode;
  key: string;
}

interface UseMenuOptions {
  before?: React.ReactNode;
  after?: React.ReactNode;
}

const ItemTag: React.FC<{ tag?: string; show?: boolean }> = ({ tag, show = true }) => {
  if (!show || !tag) {
    return null;
  }
  return (
    <Tag
      bordered={false}
      color={tag === 'New' ? 'success' : 'processing'}
      style={{ marginInlineStart: 'auto', marginInlineEnd: 0, marginTop: -2 }}
    >
      {tag.replace('VERSION', 'version')}
    </Tag>
  );
};

const useMenu = (options: UseMenuOptions = {}): [MenuProps['items'], string] => {
  const { before, after } = options;
  const { pathname, search } = useLocation();
  const fullData = useFullSidebarData();
  const sidebarData = useSidebarData();

  const processMenuItem = (item: any): MenuItem => ({
    label: (
      <Link to={`${item.link}${search}`} style={{ display: 'flex', alignItems: 'center' }}>
        {before}
        {item?.title}
        {after}
      </Link>
    ),
    key: item.link.replace(/(-cn$)/g, ''),
  });

  const processGroup = (group: any): MenuItem => ({
    label: group?.title,
    key: group?.title,
    children: group.children?.map(processMenuItem),
  });

  const menuItems = useMemo(() => {
    let items: MenuItem[] = [];

    if (pathname.startsWith('/docs/spec')) {
      const notGrouped = sidebarData?.shift();
      if (notGrouped) {
        sidebarData?.push(notGrouped);
      }
    }

    if (pathname.startsWith('/docs/react')) {
      const changelogData = Object.entries(fullData).find(([key]) => key.startsWith('/changelog'))?.[1];
      if (changelogData) {
        sidebarData?.splice(1, 0, changelogData[0]);
      }
    }

    if (pathname.startsWith('/changelog')) {
      const reactDocData = Object.entries(fullData).find(([key]) => key.startsWith('/docs/react'))?.[1];
      if (reactDocData) {
        sidebarData?.unshift(reactDocData[0]);
        sidebarData?.push(...reactDocData.slice(1));
      }
    }

    items = (sidebarData ?? []).map(processGroup);

    return items;
  }, [sidebarData, fullData, pathname, search, before, after]);

  return [menuItems, pathname];
};

export default useMenu;
