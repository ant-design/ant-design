import * as React from 'react';
import { clsx } from 'clsx';

import type { PresetColorType } from '../_util/colors';
import { cloneElement, isFragment } from '../_util/reactNode';
import type { TooltipPlacement } from '../tooltip';
import type { LiteralUnion } from '../_util/type';
import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useStyle from './style';
import { extractStyleVars, parseColor } from './util';

type SupportedTrigger = 'hover' | 'focus';

export interface TextTooltipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'title'> {
  title?: string;
  color?: LiteralUnion<PresetColorType>;
  placement?: TooltipPlacement;
  arrow?: boolean;
  trigger?: SupportedTrigger | SupportedTrigger[];
  defaultOpen?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  zIndex?: number;
  maxWidth?: number | string;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  overlayInnerStyle?: React.CSSProperties;
  children?: React.ReactNode;

  // Unsupported in TextTooltip by design.
  align?: never;
  autoAdjustOverflow?: never;
  fresh?: never;
  getPopupContainer?: never;
  onOpenChange?: never;
  open?: never;
  destroyOnHidden?: never;
  destroyTooltipOnHide?: never;
}

const UNSUPPORTED_PROPS = [
  'align',
  'autoAdjustOverflow',
  'destroyOnHidden',
  'destroyTooltipOnHide',
  'fresh',
  'getPopupContainer',
  'onOpenChange',
  'open',
] as const;

const ALL_PLACEMENTS: TooltipPlacement[] = [
  'top',
  'left',
  'right',
  'bottom',
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
  'leftTop',
  'leftBottom',
  'rightTop',
  'rightBottom',
];

const TextTooltip = React.forwardRef<HTMLSpanElement, TextTooltipProps>((props, ref) => {
  const {
    title,
    color,
    placement = 'top',
    arrow = true,
    trigger = 'hover',
    defaultOpen = false,
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    zIndex,
    maxWidth,
    className,
    style,
    overlayClassName,
    overlayStyle,
    overlayInnerStyle,
    children,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...restProps
  } = props;

  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('text-tooltip');
  const rootPrefixCls = getPrefixCls();
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const describedById = React.useId();

  const validateProps = () => {
    if (title !== undefined && typeof title !== 'string') {
      throw new Error('TextTooltip only supports string `title`.');
    }

    if (!ALL_PLACEMENTS.includes(placement)) {
      throw new Error(`TextTooltip does not support placement \`${placement}\`.`);
    }

    UNSUPPORTED_PROPS.forEach((propName) => {
      if (propName in props && props[propName] !== undefined) {
        throw new Error(`TextTooltip does not support \`${propName}\`.`);
      }
    });
    const triggers = Array.isArray(trigger) ? trigger : [trigger];
    const invalidTrigger = triggers.find((item) => item !== 'hover' && item !== 'focus');
    if (invalidTrigger) {
      throw new Error(`TextTooltip does not support trigger \`${invalidTrigger}\`.`);
    }
  };

  validateProps();

  const [open, setOpen] = React.useState(defaultOpen);
  const delayRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoveredRef = React.useRef(false);
  const focusedRef = React.useRef(false);
  const supportedTriggers = React.useMemo(
    () => new Set(Array.isArray(trigger) ? trigger : [trigger]),
    [trigger],
  );

  const hasTitle = !!title;

  const clearDelay = () => {
    if (delayRef.current !== null) {
      clearTimeout(delayRef.current);
      delayRef.current = null;
    }
  };

  const syncOpen = (nextOpen: boolean, delay: number) => {
    clearDelay();
    delayRef.current = setTimeout(() => {
      setOpen(nextOpen);
      delayRef.current = null;
    }, delay * 1000);
  };

  const updateVisibleState = (source: 'hover' | 'focus', visible: boolean) => {
    if (source === 'hover') {
      hoveredRef.current = visible;
    } else {
      focusedRef.current = visible;
    }

    const nextOpen =
      (supportedTriggers.has('hover') && hoveredRef.current) ||
      (supportedTriggers.has('focus') && focusedRef.current);

    syncOpen(nextOpen, nextOpen ? mouseEnterDelay : mouseLeaveDelay);
  };

  React.useEffect(
    () => () => {
      clearDelay();
    },
    [],
  );

  const colorInfo = parseColor(rootPrefixCls, prefixCls, color);
  const mergedRootStyle = extractStyleVars(rootPrefixCls, {
    ...overlayStyle,
    ...overlayInnerStyle,
    ...colorInfo.style,
    ...(maxWidth !== undefined ? { maxWidth } : {}),
    ...(zIndex !== undefined ? { zIndex } : {}),
  });

  const mergedClassName = clsx(
    prefixCls,
    `${prefixCls}-placement-${placement}`,
    {
      [`${prefixCls}-open`]: hasTitle && open,
      [`${prefixCls}-no-arrow`]: !arrow,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    rootCls,
    hashId,
    cssVarCls,
    colorInfo.className,
    className,
    overlayClassName,
  );

  const hiddenDescriptionStyle: React.CSSProperties = {
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
  };

  const childNode =
    React.isValidElement(children) && !isFragment(children) && hasTitle
      ? cloneElement(children, (originProps: Record<string, string | undefined>) => {
          const mergedDescribedBy = [originProps['aria-describedby'], describedById]
            .filter(Boolean)
            .join(' ');

          return {
            'aria-describedby': mergedDescribedBy || undefined,
            'aria-description': originProps['aria-description'] ?? title,
          };
        })
      : children;

  return (
    <span
      {...restProps}
      className={mergedClassName}
      data-text-tooltip={hasTitle ? title : undefined}
      onBlur={(event) => {
        onBlur?.(event);
        if (hasTitle && supportedTriggers.has('focus')) {
          updateVisibleState('focus', false);
        }
      }}
      onFocus={(event) => {
        onFocus?.(event);
        if (hasTitle && supportedTriggers.has('focus')) {
          updateVisibleState('focus', true);
        }
      }}
      onMouseEnter={(event) => {
        onMouseEnter?.(event);
        if (hasTitle && supportedTriggers.has('hover')) {
          updateVisibleState('hover', true);
        }
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event);
        if (hasTitle && supportedTriggers.has('hover')) {
          updateVisibleState('hover', false);
        }
      }}
      ref={ref}
      style={{
        ...style,
        ...mergedRootStyle,
      }}
    >
      {childNode}
      {hasTitle ? (
        <span id={describedById} style={hiddenDescriptionStyle}>
          {title}
        </span>
      ) : null}
    </span>
  );
});

if (process.env.NODE_ENV !== 'production') {
  TextTooltip.displayName = 'TextTooltip';
}

export default TextTooltip;
