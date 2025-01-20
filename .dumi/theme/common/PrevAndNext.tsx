import type { ReactElement } from 'react';
import React, { useContext, useMemo } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { GetProp, MenuProps } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';

import useMenu from '../../hooks/useMenu';
import SiteContext from '../slots/SiteContext';
import type { SiteContextProps } from '../slots/SiteContext';

type MenuItemType = Extract<GetProp<MenuProps, 'items'>[number], { type?: 'item' }>;

const useStyle = createStyles(({ token, css }) => {
  const { colorSplit, iconCls, fontSizeIcon } = token;

  return {
    prevNextNav: css`
      width: calc(100% - 234px);
      margin-inline-end: 170px;
      margin-inline-start: 64px;
      overflow: hidden;
      font-size: ${token.fontSize}px;
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
        transition: all ${token.motionDurationSlow};
      }

      .chinese {
        margin-inline-start: ${token.marginXXS}px;
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
        transition: inset-inline-end ${token.motionDurationSlow};
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
        transition: inset-inline-start ${token.motionDurationSlow};
        margin-inline-start: 1em;
        inset-inline-start: 0;
      }

      &:hover .footer-nav-icon-after {
        inset-inline-start: 0.2em;
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

const PrevAndNext: React.FC<{ rtl?: boolean }> = ({ rtl }) => {
  const { styles } = useStyle();
  const beforeProps = { className: 'footer-nav-icon-before' };
  const afterProps = { className: 'footer-nav-icon-after' };

  const before = rtl ? <RightOutlined {...beforeProps} /> : <LeftOutlined {...beforeProps} />;
  const after = rtl ? <LeftOutlined {...afterProps} /> : <RightOutlined {...afterProps} />;

  const [menuItems, selectedKey] = useMenu({ before, after });

  const { isMobile } = useContext<SiteContextProps>(SiteContext);

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

  if (isMobile) {
    return null;
  }

  return (
    <section className={styles.prevNextNav}>
      {prev &&
        React.cloneElement(
          prev.label as ReactElement<{
            className: string;
          }>,
          {
            className: classNames(styles.pageNav, styles.prevNav, prev.className),
          },
        )}
      {next &&
        React.cloneElement(
          next.label as ReactElement<{
            className: string;
          }>,
          {
            className: classNames(styles.pageNav, styles.nextNav, next.className),
          },
        )}
    </section>
  );
};

export default PrevAndNext;
