import * as React from 'react';
import type { DrawerProps as RCDrawerProps } from '@rc-component/drawer';
import { clsx } from 'clsx';

import type { DrawerProps } from '.';
import { pickClosable, useClosable, useMergeSemantic } from '../_util/hooks';
import type { ClosableType, SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';
import { useComponentConfig } from '../config-provider/context';
import Skeleton from '../skeleton';

export type SemanticName =
  | 'root'
  | 'mask'
  | 'header'
  | 'title'
  | 'extra'
  | 'section'
  | 'body'
  | 'footer'
  | 'wrapper'
  | 'dragger'
  | 'close';

export type DrawerClassNamesType = SemanticClassNamesType<DrawerProps, SemanticName>;

export type DrawerStylesType = SemanticStylesType<DrawerProps, SemanticName>;

export interface DrawerPanelProps {
  prefixCls: string;
  ariaId?: string;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  extra?: React.ReactNode;
  size?: DrawerProps['size'];
  /**
   * Recommend to use closeIcon instead
   *
   * e.g.
   *
   * `<Drawer closeIcon={false} />`
   */
  closable?: boolean | (Extract<ClosableType, object> & { placement?: 'start' | 'end' });
  closeIcon?: React.ReactNode;
  onClose?: RCDrawerProps['onClose'];

  children?: React.ReactNode;
  classNames?: DrawerClassNamesType;
  styles?: DrawerStylesType;
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
    ariaId,
    title,
    footer,
    extra,
    closable,
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

  const { classNames: contextClassNames, styles: contextStyles } = drawerContext;

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    DrawerClassNamesType,
    DrawerStylesType,
    DrawerPanelProps
  >([contextClassNames, drawerClassNames], [contextStyles, drawerStyles], {
    props,
  });

  let closablePlacement: string | undefined;
  if (closable === false) {
    closablePlacement = undefined;
  } else if (closable === undefined || closable === true) {
    closablePlacement = 'start';
  } else {
    closablePlacement = closable?.placement === 'end' ? 'end' : 'start';
  }

  const customCloseIconRender = React.useCallback(
    (icon: React.ReactNode) => (
      <button
        type="button"
        onClick={onClose}
        className={clsx(
          `${prefixCls}-close`,
          {
            [`${prefixCls}-close-${closablePlacement}`]: closablePlacement === 'end',
          },
          mergedClassNames.close,
        )}
        style={mergedStyles.close}
      >
        {icon}
      </button>
    ),
    [onClose, prefixCls, closablePlacement, mergedClassNames.close, mergedStyles.close],
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
        style={{ ...mergedStyles.header, ...headerStyle }}
        className={clsx(`${prefixCls}-header`, mergedClassNames.header, {
          [`${prefixCls}-header-close-only`]: mergedClosable && !title && !extra,
        })}
      >
        <div className={`${prefixCls}-header-title`}>
          {closablePlacement === 'start' && mergedCloseIcon}
          {title && (
            <div
              className={clsx(`${prefixCls}-title`, mergedClassNames.title)}
              style={mergedStyles.title}
              id={ariaId}
            >
              {title}
            </div>
          )}
        </div>
        {extra && (
          <div
            className={clsx(`${prefixCls}-extra`, mergedClassNames.extra)}
            style={mergedStyles.extra}
          >
            {extra}
          </div>
        )}
        {closablePlacement === 'end' && mergedCloseIcon}
      </div>
    );
  };

  const renderFooter = () => {
    if (!footer) {
      return null;
    }
    return (
      <div
        className={clsx(`${prefixCls}-footer`, mergedClassNames.footer)}
        style={{ ...mergedStyles.footer, ...footerStyle }}
      >
        {footer}
      </div>
    );
  };

  return (
    <>
      {renderHeader()}
      <div
        className={clsx(`${prefixCls}-body`, mergedClassNames.body)}
        style={{ ...mergedStyles.body, ...bodyStyle }}
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
