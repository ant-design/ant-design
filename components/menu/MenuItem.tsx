import classNames from 'classnames';
import type { MenuItemProps as RcMenuItemProps } from 'rc-menu';
import { Item } from 'rc-menu';
import toArray from 'rc-util/lib/Children/toArray';
import * as React from 'react';
import { SiderContext } from '../layout/Sider';
import Tooltip from '../tooltip';
import { cloneElement, isValidElement } from '../_util/reactNode';
import MenuContext from './MenuContext';

export interface MenuItemProps extends Omit<RcMenuItemProps, 'title'> {
  icon?: React.ReactNode;
  danger?: boolean;
  title?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({
  className,
  children,
  title,
  icon,
  danger,
  ...rest
}) => {
  const { prefixCls, firstLevel, inlineCollapsed, direction, disableMenuItemTitleTooltip } =
    React.useContext(MenuContext);
  const { siderCollapsed } = React.useContext(SiderContext);

  const tooltipTitle = React.useMemo(() => {
    if (title === undefined) {
      return firstLevel ? children : '';
    }

    if (title === false) {
      return '';
    }

    return title;
  }, [title, firstLevel, children]);

  const tooltipProps = React.useMemo(
    () =>
      !siderCollapsed && !inlineCollapsed
        ? {
            title: null,
            // Reset `open` to fix control mode tooltip display not correct
            // ref: https://github.com/ant-design/ant-design/issues/16742
            open: false,
          }
        : {
            title: tooltipTitle,
          },
    [siderCollapsed, inlineCollapsed, tooltipTitle],
  );

  const childrenLength = React.useMemo(() => toArray(children).length, [children]);

  const returnNode = (
    <Item
      {...rest}
      className={classNames(
        {
          [`${prefixCls}-item-danger`]: danger,
          [`${prefixCls}-item-only-child`]: (icon ? childrenLength + 1 : childrenLength) === 1,
        },
        className,
      )}
      title={typeof title === 'string' ? title : undefined}
    >
      {cloneElement(icon, {
        className: classNames(
          isValidElement(icon) ? icon.props?.className : '',
          `${prefixCls}-item-icon`,
        ),
      })}
      {
        // inline-collapsed.md demo 依赖 span 来隐藏文字,有 icon 属性，则内部包裹一个 span
        // ref: https://github.com/ant-design/ant-design/pull/23456
        (!icon || (isValidElement(children) && children.type === 'span')) &&
        children &&
        inlineCollapsed &&
        firstLevel &&
        typeof children === 'string' ? (
          <div className={`${prefixCls}-inline-collapsed-noicon`}>{children.charAt(0)}</div>
        ) : (
          <span className={`${prefixCls}-title-content`}>{children}</span>
        )
      }
    </Item>
  );

  if (!disableMenuItemTitleTooltip) {
    return (
      <Tooltip
        {...tooltipProps}
        placement={direction === 'rtl' ? 'left' : 'right'}
        overlayClassName={`${prefixCls}-inline-collapsed-tooltip`}
      >
        {returnNode}
      </Tooltip>
    );
  }

  return returnNode;
};

export default MenuItem;
