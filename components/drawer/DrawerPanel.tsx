import CloseOutlined from '@ant-design/icons/CloseOutlined';
import classNames from 'classnames';
import type { DrawerProps as RCDrawerProps } from 'rc-drawer';
import * as React from 'react';

export interface DrawerPanelProps {
  prefixCls: string;

  title?: React.ReactNode;
  footer?: React.ReactNode;
  extra?: React.ReactNode;
  /**
   * advised to use closeIcon instead
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

  const mergedClosable = React.useMemo(() => {
    if (typeof closable === 'boolean') {
      return closable;
    }

    return closeIcon !== null && closeIcon !== false;
  }, [closable, closeIcon]);

  const mergedCloseIcon = React.useMemo(() => {
    if (!mergedClosable) {
      return null;
    }
    if (closeIcon === undefined || closeIcon === true) {
      return <CloseOutlined />;
    }
    return closeIcon;
  }, [closeIcon, mergedClosable]);

  const closeIconNode = mergedClosable && (
    <button type="button" onClick={onClose} aria-label="Close" className={`${prefixCls}-close`}>
      {mergedCloseIcon}
    </button>
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
          {closeIconNode}
          {title && <div className={`${prefixCls}-title`}>{title}</div>}
        </div>
        {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
      </div>
    );
  }, [mergedClosable, closeIconNode, extra, headerStyle, prefixCls, title]);

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
