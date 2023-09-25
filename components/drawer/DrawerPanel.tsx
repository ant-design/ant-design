import classNames from 'classnames';
import type { DrawerProps as RCDrawerProps } from 'rc-drawer';
import * as React from 'react';
import useClosable from '../_util/hooks/useClosable';
import { ConfigContext } from '../config-provider';

export interface DrawerClassNames {
  header?: string;
  body?: string;
  footer?: string;
  mask?: string;
  content?: string;
}

export interface DrawerStyles {
  header?: React.CSSProperties;
  body?: React.CSSProperties;
  footer?: React.CSSProperties;
  mask?: React.CSSProperties;
  content?: React.CSSProperties;
}

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
  /** @deprecated Please use `styles.header` instead */
  headerStyle?: React.CSSProperties;
  /** @deprecated Please use `styles.body` instead */
  bodyStyle?: React.CSSProperties;
  /** @deprecated Please use `styles.footer` instead */
  footerStyle?: React.CSSProperties;
  children?: React.ReactNode;
  classNames?: DrawerClassNames;
  styles?: DrawerStyles;
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
    classNames: drawerClassNames,
    styles: drawerStyles,
  } = props;
  const { drawer: drawerContext } = React.useContext(ConfigContext);

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
        style={{
          ...drawerContext?.styles?.header,
          ...headerStyle,
          ...drawerStyles?.header,
        }}
        className={classNames(
          `${prefixCls}-header`,
          {
            [`${prefixCls}-header-close-only`]: mergedClosable && !title && !extra,
          },
          drawerContext?.classNames?.header,
          drawerClassNames?.header,
        )}
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
      <div
        className={classNames(
          footerClassName,
          drawerContext?.classNames?.footer,
          drawerClassNames?.footer,
        )}
        style={{
          ...drawerContext?.styles?.footer,
          ...footerStyle,
          ...drawerStyles?.footer,
        }}
      >
        {footer}
      </div>
    );
  }, [footer, footerStyle, prefixCls]);

  return (
    <div className={`${prefixCls}-wrapper-body`} style={drawerStyle}>
      {headerNode}
      <div
        className={classNames(
          `${prefixCls}-body`,
          drawerClassNames?.body,
          drawerContext?.classNames?.body,
        )}
        style={{
          ...drawerContext?.styles?.body,
          ...bodyStyle,
          ...drawerStyles?.body,
        }}
      >
        {children}
      </div>
      {footerNode}
    </div>
  );
};

export default DrawerPanel;
