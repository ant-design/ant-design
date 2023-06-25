import classNames from 'classnames';
import type { DrawerProps as RCDrawerProps } from 'rc-drawer';
import * as React from 'react';
import useClosable from '../_util/hooks/useClosable';

export interface DrawerPanelProps {
  prefixCls: string;

  title?: React.ReactNode;
  footer?: React.ReactNode;
  extra?: React.ReactNode;
  /**
   * Recommend to use closeIcon instead
   *
   * e.g.
   *
   * `<Drawer closeIcon={false} />`
   */
  closable?: boolean;
  closeIcon?: boolean | React.ReactNode;
  onClose?: RCDrawerProps['onClose'];

  /** Wrapper dom node style of header and body */
  drawerStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

const DrawerPanel: React.FC<DrawerPanelProps> = (props) => {
  const {
    prefixCls,
    title,
    footer,
    extra,
    closeIcon,
    closable,
    onClose,
    headerStyle,
    drawerStyle,
    bodyStyle,
    footerStyle,
    children,
  } = props;

  const customCloseIconRender = React.useCallback(
    (icon: React.ReactNode) => (
      <button type="button" onClick={onClose} aria-label="Close" className={`${prefixCls}-close`}>
        {icon}
      </button>
    ),
    [onClose],
  );
  const [mergedClosable, mergedCloseIcon] = useClosable(
    closable,
    closeIcon,
    customCloseIconRender,
    undefined,
    true,
  );

  const headerNode = React.useMemo<React.ReactNode>(() => {
    if (!title && !mergedClosable) {
      return null;
    }
    return (
      <div
        style={headerStyle}
        className={classNames(`${prefixCls}-header`, {
          [`${prefixCls}-header-close-only`]: mergedClosable && !title && !extra,
        })}
      >
        <div className={`${prefixCls}-header-title`}>
          {mergedCloseIcon}
          {title && <div className={`${prefixCls}-title`}>{title}</div>}
        </div>
        {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
      </div>
    );
  }, [mergedClosable, mergedCloseIcon, extra, headerStyle, prefixCls, title]);

  const footerNode = React.useMemo<React.ReactNode>(() => {
    if (!footer) {
      return null;
    }
    const footerClassName = `${prefixCls}-footer`;
    return (
      <div className={footerClassName} style={footerStyle}>
        {footer}
      </div>
    );
  }, [footer, footerStyle, prefixCls]);

  return (
    <div className={`${prefixCls}-wrapper-body`} style={drawerStyle}>
      {headerNode}
      <div className={`${prefixCls}-body`} style={bodyStyle}>
        {children}
      </div>
      {footerNode}
    </div>
  );
};

export default DrawerPanel;
