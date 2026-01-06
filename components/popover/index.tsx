import * as React from 'react';
import { useControlledState } from '@rc-component/util';
import { clsx } from 'clsx';

import type { RenderFunction } from '../_util/getRenderPropValue';
import { getRenderPropValue } from '../_util/getRenderPropValue';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';
import { useMergeSemantic } from '../_util/hooks';
import { getTransitionName } from '../_util/motion';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import type {
  AbstractTooltipProps,
  TooltipRef,
  TooltipSemanticClassNames,
  TooltipSemanticStyles,
} from '../tooltip';
import Tooltip from '../tooltip';
import useMergedArrow from '../tooltip/hook/useMergedArrow';
import PurePanel, { Overlay } from './PurePanel';
// CSSINJS
import useStyle from './style';

export type PopoverSemanticName = keyof PopoverSemanticClassNames & keyof PopoverSemanticStyles;

export type PopoverSemanticClassNames = TooltipSemanticClassNames & {
  title?: string;
  content?: string;
};

export type PopoverSemanticStyles = TooltipSemanticStyles & {
  title?: React.CSSProperties;
  content?: React.CSSProperties;
};

export type PopoverClassNamesType = SemanticClassNamesType<PopoverProps, PopoverSemanticClassNames>;

export type PopoverStylesType = SemanticStylesType<PopoverProps, PopoverSemanticStyles>;

export interface PopoverProps extends AbstractTooltipProps {
  title?: React.ReactNode | RenderFunction;
  content?: React.ReactNode | RenderFunction;
  onOpenChange?: (open: boolean) => void;
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
    trigger,
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
    trigger: contextTrigger,
  } = useComponentConfig('popover');

  const prefixCls = getPrefixCls('popover', customizePrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);
  const rootPrefixCls = getPrefixCls();
  const mergedArrow = useMergedArrow(popoverArrow, contextArrow);
  const mergedTrigger = trigger || contextTrigger || 'hover';

  // ========================== Warning ===========================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Popover');

    warning(
      !onOpenChange || onOpenChange.length <= 1,
      'usage',
      '`onOpenChange` only accept `open` argument. The second event argument is internal usage and not support.',
    );
  }

  // ============================= Styles =============================
  const mergedProps: PopoverProps = {
    ...props,
    placement,
    trigger: mergedTrigger,
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
  >([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps,
  });

  const rootClassNames = clsx(
    overlayClassName,
    hashId,
    cssVarCls,
    contextClassName,
    mergedClassNames.root,
  );

  const [open, setOpen] = useControlledState(props.defaultOpen ?? false, props.open);

  const settingOpen = (value: boolean) => {
    setOpen(value);
    onOpenChange?.(value);
  };

  const titleNode = getRenderPropValue(title);
  const contentNode = getRenderPropValue(content);

  return (
    <Tooltip
      unique={false}
      arrow={mergedArrow}
      placement={placement}
      trigger={mergedTrigger}
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
      onOpenChange={settingOpen}
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
      {children}
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
