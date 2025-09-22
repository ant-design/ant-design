import * as React from 'react';
import type { DrawerProps as RCDrawerProps } from '@rc-component/drawer';
import classNames from 'classnames';

import type { DrawerProps } from '.';
import useClosable, { pickClosable } from '../_util/hooks/useClosable';
import type { ClosableType } from '../_util/hooks/useClosable';
import useMergeSemantic, {
  SemanticClassNamesType,
  SemanticStylesType,
} from '../_util/hooks/useMergeSemantic';
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
  | 'dragger';

export type DrawerClassNamesType = SemanticClassNamesType<DrawerProps, SemanticName>;

export type DrawerStylesType = SemanticStylesType<DrawerProps, SemanticName>;

export interface DrawerPanelProps {
  prefixCls: string;

  title?: React.ReactNode;
  footer?: React.ReactNode;
  extra?: React.ReactNode;
  size?: string | number;
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
  >([contextClassNames, drawerClassNames], [contextStyles, drawerStyles], undefined, {
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
        className={classNames(`${prefixCls}-close`, {
          [`${prefixCls}-close-${closablePlacement}`]: closablePlacement === 'end',
        })}
      >
        {icon}
      </button>
    ),
    [onClose, prefixCls, closablePlacement],
  );

  const [mergedClosable, mergedCloseIcon] = useClosable(
    pickClosable(props),
    pickClosable(drawerContext),
    {
      closable: true,
      closeIconRender: customCloseIconRender,
    },
  );

  let headerNode: React.ReactNode = null;
  if (title || mergedClosable) {
    headerNode = (
      <div
        style={{ ...mergedStyles.header, ...headerStyle }}
        className={classNames(`${prefixCls}-header`, mergedClassNames.header, {
          [`${prefixCls}-header-close-only`]: mergedClosable && !title && !extra,
        })}
      >
        <div className={`${prefixCls}-header-title`}>
          {closablePlacement === 'start' && mergedCloseIcon}
          {title && (
            <div
              className={classNames(`${prefixCls}-title`, mergedClassNames.title)}
              style={mergedStyles.title}
            >
              {title}
            </div>
          )}
        </div>
        {extra && (
          <div
            className={classNames(`${prefixCls}-extra`, mergedClassNames.extra)}
            style={mergedStyles.extra}
          >
            {extra}
          </div>
        )}
        {closablePlacement === 'end' && mergedCloseIcon}
      </div>
    );
  }

  const footerNode = React.useMemo<React.ReactNode>(() => {
    if (!footer) {
      return null;
    }
    return (
      <div
        className={classNames(`${prefixCls}-footer`, mergedClassNames.footer)}
        style={{ ...mergedStyles.footer, ...footerStyle }}
      >
        {footer}
      </div>
    );
  }, [footer, footerStyle, prefixCls, mergedClassNames.footer, mergedStyles.footer]);

  return (
    <>
      {headerNode}
      <div
        className={classNames(`${prefixCls}-body`, mergedClassNames.body)}
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
      {footerNode}
    </>
  );
};

export default DrawerPanel;
