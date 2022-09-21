import * as React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import type { DrawerProps as RCDrawerProps } from 'rc-drawer';
import classNames from 'classnames';

export interface DrawerPanelProps {
  prefixCls: string;

  title?: React.ReactNode;
  footer?: React.ReactNode;
  extra?: React.ReactNode;

  closable?: boolean;
  closeIcon?: React.ReactNode;
  onClose?: RCDrawerProps['onClose'];

  /** Wrapper dom node style of header and body */
  drawerStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function DrawerPanel(props: DrawerPanelProps) {
  const {
    prefixCls,

    title,
    footer,
    extra,

    closable = true,
    closeIcon = <CloseOutlined />,
    onClose,

    headerStyle,
    drawerStyle,
    bodyStyle,
    footerStyle,
    children,
  } = props;

  const closeIconNode = closable && (
    <button type="button" onClick={onClose} aria-label="Close" className={`${prefixCls}-close`}>
      {closeIcon}
    </button>
  );

  function renderHeader() {
    if (!title && !closable) {
      return null;
    }

    return (
      <div
        className={classNames(`${prefixCls}-header`, {
          [`${prefixCls}-header-close-only`]: closable && !title && !extra,
        })}
        style={headerStyle}
      >
        <div className={`${prefixCls}-header-title`}>
          {closeIconNode}
          {title && <div className={`${prefixCls}-title`}>{title}</div>}
        </div>
        {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
      </div>
    );
  }

  function renderFooter() {
    if (!footer) {
      return null;
    }

    const footerClassName = `${prefixCls}-footer`;
    return (
      <div className={footerClassName} style={footerStyle}>
        {footer}
      </div>
    );
  }

  return (
    <div className={`${prefixCls}-wrapper-body`} style={{ ...drawerStyle }}>
      {renderHeader()}
      <div className={`${prefixCls}-body`} style={bodyStyle}>
        {children}
      </div>
      {renderFooter()}
    </div>
  );
}
