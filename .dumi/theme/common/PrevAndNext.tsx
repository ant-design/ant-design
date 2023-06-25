import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import type { MenuProps } from 'antd';
import type { MenuItemType } from 'antd/es/menu/hooks/useItems';
import type { ReactElement } from 'react';
import React, { useMemo } from 'react';
import useMenu from '../../hooks/useMenu';
import useSiteToken from '../../hooks/useSiteToken';

const useStyle = () => {
  const { token } = useSiteToken();
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
        color: #999;
        font-size: ${fontSizeIcon}px;
        transition: all 0.3s;
      }

      .chinese {
        margin-inline-start: 4px;
      }
    `,
    prevNav: css`
      text-align: start;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .footer-nav-icon-after {
        display: none;
      }

      .footer-nav-icon-before {
        position: relative;
        line-height: 0;
        vertical-align: middle;
        transition: inset-inline-end 0.3s;
        margin-inline-end: 1em;
        inset-inline-end: 0;
      }

      &:hover .footer-nav-icon-before {
        inset-inline-end: 0.2em;
      }
    `,
    nextNav: css`
      text-align: end;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .footer-nav-icon-before {
        display: none;
      }

      .footer-nav-icon-after {
        position: relative;
        margin-bottom: 1px;
        line-height: 0;
        vertical-align: middle;
        transition: inset-inline-start 0.3s;
        margin-inline-start: 1em;
        inset-inline-start: 0;
      }

      &:hover .footer-nav-icon-after {
        inset-inline-start: 0.2em;
      }
    `,
  };
};

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

const PrevAndNext: React.FC<{ rtl?: boolean }> = ({ rtl }) => {
  const styles = useStyle();
  const beforeProps = { className: 'footer-nav-icon-before' };
  const afterProps = { className: 'footer-nav-icon-after' };

  const before = rtl ? <RightOutlined {...beforeProps} /> : <LeftOutlined {...beforeProps} />;
  const after = rtl ? <LeftOutlined {...afterProps} /> : <RightOutlined {...afterProps} />;

  const [menuItems, selectedKey] = useMenu({ before, after });

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
    <section css={styles.prevNextNav}>
      {prev &&
        React.cloneElement(prev.label as ReactElement, {
          css: [styles.pageNav, styles.prevNav],
        })}
      {next &&
        React.cloneElement(next.label as ReactElement, {
          css: [styles.pageNav, styles.nextNav],
        })}
    </section>
  );
};

export default PrevAndNext;
