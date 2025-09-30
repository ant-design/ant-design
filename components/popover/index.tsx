import * as React from 'react';
import { isValidElement } from 'react';
import { useControlledState } from '@rc-component/util';
import KeyCode from '@rc-component/util/lib/KeyCode';
import cls from 'classnames';

import type { RenderFunction } from '../_util/getRenderPropValue';
import { getRenderPropValue } from '../_util/getRenderPropValue';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks/useMergeSemantic';
import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import { getTransitionName } from '../_util/motion';
import { cloneElement } from '../_util/reactNode';
import { useComponentConfig } from '../config-provider/context';
import type {
  AbstractTooltipProps,
  TooltipRef,
  SemanticName as TooltipSemanticName,
} from '../tooltip';
import Tooltip from '../tooltip';
import useMergedArrow from '../tooltip/hook/useMergedArrow';
import PurePanel, { Overlay } from './PurePanel';
// CSSINJS
import useStyle from './style';

export type PopoverSemanticName = TooltipSemanticName | 'title' | 'content';

export type PopoverClassNamesType = SemanticClassNamesType<PopoverProps, PopoverSemanticName>;

export type PopoverStylesType = SemanticStylesType<PopoverProps, PopoverSemanticName>;

export interface PopoverProps extends AbstractTooltipProps {
  title?: React.ReactNode | RenderFunction;
  content?: React.ReactNode | RenderFunction;
  onOpenChange?: (
    open: boolean,
    e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => void;
  classNames?: PopoverClassNamesType;
  styles?: PopoverStylesType;
}

const InternalPopover = React.forwardRef<TooltipRef, PopoverProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    title,
    content,
    overlayClassName,
    placement = 'top',
    trigger = 'hover',
    children,
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    onOpenChange,
    overlayStyle = {},
    styles,
    classNames,
    motion,
    arrow: popoverArrow,
    ...restProps
  } = props;
  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
    arrow: contextArrow,
  } = useComponentConfig('popover');

  const prefixCls = getPrefixCls('popover', customizePrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);
  const rootPrefixCls = getPrefixCls();
  const mergedArrow = useMergedArrow(popoverArrow, contextArrow);

  // ============================= Styles =============================
  const mergedProps: PopoverProps = {
    ...props,
    placement,
    trigger,
    mouseEnterDelay,
    mouseLeaveDelay,
    overlayStyle,
    styles,
    classNames,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    PopoverClassNamesType,
    PopoverStylesType,
    PopoverProps
  >([contextClassNames, classNames], [contextStyles, styles], undefined, {
    props: mergedProps,
  });

  const rootClassNames = cls(
    overlayClassName,
    hashId,
    cssVarCls,
    contextClassName,
    mergedClassNames.root,
  );

  const [open, setOpen] = useControlledState(props.defaultOpen ?? false, props.open);

  const settingOpen = (
    value: boolean,
    e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    setOpen(value);
    onOpenChange?.(value, e);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === KeyCode.ESC) {
      settingOpen(false, e);
    }
  };

  const onInternalOpenChange = (value: boolean) => {
    settingOpen(value);
  };

  const titleNode = getRenderPropValue(title);
  const contentNode = getRenderPropValue(content);

  return (
    <Tooltip
      unique={false}
      arrow={mergedArrow}
      placement={placement}
      trigger={trigger}
      mouseEnterDelay={mouseEnterDelay}
      mouseLeaveDelay={mouseLeaveDelay}
      {...restProps}
      prefixCls={prefixCls}
      classNames={{
        root: rootClassNames,
        container: mergedClassNames.container,
        arrow: mergedClassNames.arrow,
      }}
      styles={{
        root: { ...mergedStyles.root, ...contextStyle, ...overlayStyle },
        container: mergedStyles.container,
        arrow: mergedStyles.arrow,
      }}
      ref={ref}
      open={open}
      onOpenChange={onInternalOpenChange}
      overlay={
        titleNode || contentNode ? (
          <Overlay
            prefixCls={prefixCls}
            title={titleNode}
            content={contentNode}
            classNames={mergedClassNames}
            styles={mergedStyles}
          />
        ) : null
      }
      motion={{
        motionName: getTransitionName(
          rootPrefixCls,
          'zoom-big',
          typeof motion?.motionName === 'string' ? motion?.motionName : undefined,
        ),
      }}
      data-popover-inject
    >
      {cloneElement(children, {
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (
            isValidElement<{ onKeyDown?: React.KeyboardEventHandler<HTMLDivElement> }>(children)
          ) {
            children?.props.onKeyDown?.(e);
          }
          onKeyDown(e);
        },
      })}
    </Tooltip>
  );
});

type CompoundedComponent = typeof InternalPopover & {
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};

const Popover = InternalPopover as CompoundedComponent;

Popover._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

if (process.env.NODE_ENV !== 'production') {
  Popover.displayName = 'Popover';
}

export default Popover;
