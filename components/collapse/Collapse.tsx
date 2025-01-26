import * as React from 'react';
import RightOutlined from '@ant-design/icons/RightOutlined';
import type { CollapseProps as RcCollapseProps } from '@rc-component/collapse';
import RcCollapse from '@rc-component/collapse';
import toArray from '@rc-component/util/lib/Children/toArray';
import omit from '@rc-component/util/lib/omit';
import classNames from 'classnames';
import type { CSSMotionProps } from 'rc-motion';

import initCollapseMotion from '../_util/motion';
import { cloneElement } from '../_util/reactNode';
import { useComponentConfig } from '../config-provider/context';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import type { CollapsibleType } from './CollapsePanel';
import CollapsePanel from './CollapsePanel';
import useStyle from './style';

export type ExpandIconPosition = 'start' | 'end' | undefined;
export type SemanticName = 'root' | 'header' | 'title' | 'body' | 'icon';
export interface CollapseProps extends Pick<RcCollapseProps, 'items'> {
  activeKey?: Array<string | number> | string | number;
  defaultActiveKey?: Array<string | number> | string | number;
  /** 手风琴效果 */
  accordion?: boolean;
  destroyInactivePanel?: boolean;
  onChange?: (key: string[]) => void;
  style?: React.CSSProperties;
  className?: string;
  rootClassName?: string;
  bordered?: boolean;
  prefixCls?: string;
  expandIcon?: (panelProps: PanelProps) => React.ReactNode;
  expandIconPosition?: ExpandIconPosition;
  ghost?: boolean;
  size?: SizeType;
  collapsible?: CollapsibleType;
  /**
   * @deprecated use `items` instead
   */
  children?: React.ReactNode;
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
}

interface PanelProps {
  isActive?: boolean;
  header?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  showArrow?: boolean;
  forceRender?: boolean;
  extra?: React.ReactNode;
  collapsible?: CollapsibleType;
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
}

const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>((props, ref) => {
  const {
    getPrefixCls,
    direction,
    expandIcon: contextExpandIcon,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('collapse');

  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    bordered = true,
    ghost,
    size: customizeSize,
    expandIconPosition = 'start',
    children,
    expandIcon,
    classNames: collapseClassNames,
    styles,
  } = props;

  const mergedSize = useSize((ctx) => customizeSize ?? ctx ?? 'middle');
  const prefixCls = getPrefixCls('collapse', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const mergedExpandIcon = expandIcon ?? contextExpandIcon;

  const renderExpandIcon = React.useCallback(
    (panelProps: PanelProps = {}) => {
      const icon =
        typeof mergedExpandIcon === 'function' ? (
          mergedExpandIcon(panelProps)
        ) : (
          <RightOutlined
            rotate={panelProps.isActive ? (direction === 'rtl' ? -90 : 90) : undefined}
            aria-label={panelProps.isActive ? 'expanded' : 'collapsed'}
          />
        );
      return cloneElement(icon, () => ({
        className: classNames(
          (
            icon as React.ReactElement<{
              className?: string;
            }>
          )?.props?.className,
          contextClassNames.icon,
          collapseClassNames?.icon,
          `${prefixCls}-arrow`,
        ),
        style: {
          ...contextStyles.icon,
          ...styles?.icon,
        },
      }));
    },
    [mergedExpandIcon, prefixCls],
  );

  const collapseClassName = classNames(
    `${prefixCls}-icon-position-${expandIconPosition}`,
    {
      [`${prefixCls}-borderless`]: !bordered,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-ghost`]: !!ghost,
      [`${prefixCls}-${mergedSize}`]: mergedSize !== 'middle',
    },
    contextClassName,
    className,
    rootClassName,
    hashId,
    cssVarCls,
    contextClassNames.root,
    collapseClassNames?.root,
  );
  const openMotion: CSSMotionProps = {
    ...initCollapseMotion(rootPrefixCls),
    motionAppear: false,
    leavedClassName: `${prefixCls}-panel-hidden`,
  };
  const items = React.useMemo<React.ReactNode[] | null>(() => {
    if (children) {
      return toArray(children).map((child) => child);
    }
    return null;
  }, [children]);

  return wrapCSSVar(
    // @ts-ignore
    <RcCollapse
      ref={ref}
      openMotion={openMotion}
      {...omit(props, ['rootClassName'])}
      expandIcon={renderExpandIcon}
      prefixCls={prefixCls}
      className={collapseClassName}
      style={{ ...contextStyles.root, ...contextStyle, ...styles?.root, ...style }}
      classNames={{
        header: classNames(contextClassNames.header, collapseClassNames?.header),
        title: classNames(contextClassNames.title, collapseClassNames?.title),
        body: classNames(contextClassNames.body, collapseClassNames?.body),
        icon: classNames(contextClassNames.icon, collapseClassNames?.icon),
      }}
      styles={{
        header: { ...contextStyles.header, ...styles?.header },
        title: { ...contextStyles.title, ...styles?.title },
        body: { ...contextStyles.body, ...styles?.body },
        icon: { ...contextStyles.icon, ...styles?.icon },
      }}
    >
      {items}
    </RcCollapse>,
  );
});

if (process.env.NODE_ENV !== 'production') {
  Collapse.displayName = 'Collapse';
}

export default Object.assign(Collapse, { Panel: CollapsePanel });
