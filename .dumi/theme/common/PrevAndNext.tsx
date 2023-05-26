import type { ReactElement } from 'react';
import React, { useMemo } from 'react';
import type { MenuProps } from 'antd';
import type { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { createStyles, css } from 'antd-style';
import classNames from 'classnames';
import useMenu from '../../hooks/useMenu';

const useStyle = createStyles(({ token }) => {
  const { colorSplit, iconCls, fontSizeIcon } = token;

  return {
    prevNextNav: css`
      width: calc(100% - 234px);
      margin-inline-end: 170px;
      margin-inline-start: 64px;
      overflow: hidden;
      font-size: 14px;
      border-top: 1px solid ${colorSplit};
      display: flex;
    `,
    pageNav: css`
      flex: 1;
      height: 72px;
      line-height: 72px;
      text-decoration: none;

      ${iconCls} {
        font-size: ${fontSizeIcon}px;
        transition: all 0.3s;
      }

      .chinese {
        margin-inline-start: 4px;
      }
    `,
    prevNav: css`
      text-align: start;

      .footer-nav-icon-after {
        display: none;
      }

      .footer-nav-icon-before {
        position: relative;
        margin-inline-end: 1em;
        vertical-align: middle;
        line-height: 0;
        right: 0;
        transition: right 0.3s;
      }

      &:hover .footer-nav-icon-before {
        right: 0.2em;
      }
    `,
    nextNav: css`
      text-align: end;

      .footer-nav-icon-before {
        display: none;
      }

      .footer-nav-icon-after {
        position: relative;
        margin-inline-start: 1em;
        margin-bottom: 1px;
        vertical-align: middle;
        line-height: 0;
        left: 0;
        transition: left 0.3s;
      }

      &:hover .footer-nav-icon-after {
        left: 0.2em;
      }
    `,
  };
});

const flattenMenu = (menuItems: MenuProps['items']): MenuProps['items'] | null => {
  if (Array.isArray(menuItems)) {
    return menuItems.reduce<Exclude<MenuProps['items'], undefined>>((acc, item) => {
      if (!item) {
        return acc;
      }
      if ('children' in item && item.children) {
        return acc.concat(flattenMenu(item.children) ?? []);
      }
      return acc.concat(item);
    }, []);
  }
  return null;
};

const PrevAndNext: React.FC = () => {
  const { styles } = useStyle();

  const [menuItems, selectedKey] = useMenu({
    before: <LeftOutlined className="footer-nav-icon-before" />,
    after: <RightOutlined className="footer-nav-icon-after" />,
  });

  const [prev, next] = useMemo(() => {
    const flatMenu = flattenMenu(menuItems);
    if (!flatMenu) {
      return [null, null];
    }
    let activeMenuItemIndex = -1;
    flatMenu.forEach((menuItem, i) => {
      if (menuItem && menuItem.key === selectedKey) {
        activeMenuItemIndex = i;
      }
    });
    return [
      flatMenu[activeMenuItemIndex - 1] as MenuItemType,
      flatMenu[activeMenuItemIndex + 1] as MenuItemType,
    ];
  }, [menuItems, selectedKey]);

  return (
    <section className={styles.prevNextNav}>
      {prev &&
        React.cloneElement(prev.label as ReactElement, {
          className: classNames(styles.pageNav, styles.prevNav),
        })}
      {next &&
        React.cloneElement(next.label as ReactElement, {
          className: classNames(styles.pageNav, styles.nextNav),
        })}
    </section>
  );
};

export default PrevAndNext;
