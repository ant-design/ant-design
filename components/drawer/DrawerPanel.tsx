import * as React from 'react';
import classNames from 'classnames';
import type { DrawerProps as RCDrawerProps } from 'rc-drawer';

import { pickClosable, useClosable } from '../_util/hooks';
import type { ClosableType } from '../_util/hooks';
import { useComponentConfig } from '../config-provider/context';
import Skeleton from '../skeleton';

export interface DrawerClassNames extends NonNullable<RCDrawerProps['classNames']> {
  header?: string;
  body?: string;
  footer?: string;
}

export interface DrawerStyles extends NonNullable<RCDrawerProps['styles']> {
  header?: React.CSSProperties;
  body?: React.CSSProperties;
  footer?: React.CSSProperties;
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
  closable?: ClosableType;
  closeIcon?: React.ReactNode;
  onClose?: RCDrawerProps['onClose'];

  children?: React.ReactNode;
  classNames?: DrawerClassNames;
  styles?: DrawerStyles;
  loading?: boolean;

  /** @deprecated Please use `styles.header` instead */
  headerStyle?: React.CSSProperties;
  /** @deprecated Please use `styles.body` instead */
  bodyStyle?: React.CSSProperties;
  /** @deprecated Please use `styles.footer` instead */
  footerStyle?: React.CSSProperties;
  /** @deprecated Please use `styles.wrapper` instead */
  contentWrapperStyle?: React.CSSProperties;
  /** @deprecated Please use `styles.mask` instead */
  maskStyle?: React.CSSProperties;
  /** @deprecated Please use `styles.content` instead */
  drawerStyle?: React.CSSProperties;
}

const DrawerPanel: React.FC<DrawerPanelProps> = (props) => {
  const {
    prefixCls,
    title,
    footer,
    extra,
    loading,
    onClose,
    headerStyle,
    bodyStyle,
    footerStyle,
    children,
    classNames: drawerClassNames,
    styles: drawerStyles,
  } = props;
  const drawerContext = useComponentConfig('drawer');

  const customCloseIconRender = React.useCallback(
    (icon: React.ReactNode) => (
      <button type="button" onClick={onClose} className={`${prefixCls}-close`}>
        {icon}
      </button>
    ),
    [onClose, prefixCls],
  );

  const [mergedClosable, mergedCloseIcon] = useClosable(
    pickClosable(props),
    pickClosable(drawerContext),
    {
      closable: true,
      closeIconRender: customCloseIconRender,
    },
  );

  const renderHeader = () => {
    if (!title && !mergedClosable) {
      return null;
    }
    return (
      <div
        style={{ ...drawerContext.styles?.header, ...headerStyle, ...drawerStyles?.header }}
        className={classNames(
          `${prefixCls}-header`,
          {
            [`${prefixCls}-header-close-only`]: mergedClosable && !title && !extra,
          },
          drawerContext.classNames?.header,
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
  };

  const renderFooter = () => {
    if (!footer) {
      return null;
    }
    const footerClassName = `${prefixCls}-footer`;
    return (
      <div
        className={classNames(
          footerClassName,
          drawerContext.classNames?.footer,
          drawerClassNames?.footer,
        )}
        style={{ ...drawerContext.styles?.footer, ...footerStyle, ...drawerStyles?.footer }}
      >
        {footer}
      </div>
    );
  };

  return (
    <>
      {renderHeader()}
      <div
        className={classNames(
          `${prefixCls}-body`,
          drawerClassNames?.body,
          drawerContext.classNames?.body,
        )}
        style={{ ...drawerContext.styles?.body, ...bodyStyle, ...drawerStyles?.body }}
      >
        {loading ? (
          <Skeleton
            active
            title={false}
            paragraph={{ rows: 5 }}
            className={`${prefixCls}-body-skeleton`}
          />
        ) : (
          children
        )}
      </div>
      {renderFooter()}
    </>
  );
};

export default DrawerPanel;
