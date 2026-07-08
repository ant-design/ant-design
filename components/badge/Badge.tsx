import * as React from 'react';
import { useMemo, useRef } from 'react';
import CSSMotion from '@rc-component/motion';
import { clsx } from 'clsx';

import type { PresetStatusColorType } from '../_util/colors';
import { isPresetColor } from '../_util/colors';
import { useMergeSemantic, useSemanticRootStyle } from '../_util/hooks/useMergeSemantic';
import type { GenerateSemantic } from '../_util/hooks/useMergeSemantic/semanticType';
import { isNonNullable, isNumber, isPlainObject, isReactRenderable, isString } from '../_util/is';
import { cloneElement } from '../_util/reactNode';
import type { LiteralUnion } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import type { SizeType } from '../config-provider/SizeContext';
import type { PresetColorKey } from '../theme/internal';
import ScrollNumber from './ScrollNumber';
import useStyle from './style';

export type BadgeSemanticType = {
  classNames?: {
    root?: string;
    indicator?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    indicator?: React.CSSProperties;
  };
};

export type BadgeSemanticAllType = GenerateSemantic<BadgeSemanticType, BadgeProps>;

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'title'> {
  /** Number to show in badge */
  count?: React.ReactNode;
  showZero?: boolean;
  /** Max count to show */
  overflowCount?: number;
  /** Whether to show red dot without number */
  dot?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  scrollNumberPrefixCls?: string;
  className?: string;
  rootClassName?: string;
  status?: PresetStatusColorType;
  color?: LiteralUnion<PresetColorKey>;
  text?: React.ReactNode;
  /**
   * Note: `default` is deprecated and will be removed in v7, please use `medium` instead.
   */
  size?: Exclude<SizeType, 'large'> | 'default';
  offset?: [number | string, number | string];
  title?: string | null | false;
  children?: React.ReactNode;
  classNames?: BadgeSemanticAllType['classNamesAndFn'];
  styles?: BadgeSemanticAllType['stylesAndFn'];
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    scrollNumberPrefixCls: customizeScrollNumberPrefixCls,
    children,
    status,
    text,
    color,
    count = null,
    overflowCount = 99,
    dot = false,
    size = 'medium',
    title,
    offset,
    style,
    className,
    rootClassName,
    classNames,
    styles,
    showZero = false,
    ...restProps
  } = props;
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('badge');

  const prefixCls = getPrefixCls('badge', customizePrefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls);

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Badge');
    warning.deprecated(size !== 'default', 'size="default"', 'size="medium"');
  }

  // =========== Merged Props for Semantic ===========
  const mergedProps: BadgeProps = {
    ...props,
    overflowCount,
    size,
    dot,
    showZero,
  };

  // ================================ Misc ================================
  const numberedDisplayCount = (
    (count as number) > (overflowCount as number) ? `${overflowCount}+` : count
  ) as string | number | null;

  const isZero =
    numberedDisplayCount === '0' || numberedDisplayCount === 0 || text === '0' || text === 0;

  const ignoreCount = count === null || (isZero && !showZero);

  const hasStatus = (isNonNullable(status) || isNonNullable(color)) && ignoreCount;

  const hasStatusValue = isNonNullable(status) || !isZero;

  const isStatusBadge = Boolean(!children && hasStatus && (text || hasStatusValue || !ignoreCount));

  // =============================== Styles ===============================
  const offsetStyle = useMemo<React.CSSProperties | undefined>(() => {
    if (!offset) {
      return undefined;
    }

    const horizontalOffset = Number.parseInt(offset[0] as string, 10);

    return {
      marginTop: offset[1],
      insetInlineEnd: -horizontalOffset,
    };
  }, [offset]);

  const mergedStyle = useMemo<React.CSSProperties>(
    () => ({ ...offsetStyle, ...contextStyle, ...style }),
    [offsetStyle, style, contextStyle],
  );

  const legacyStyleKey = isStatusBadge ? 'root' : 'indicator';
  const contextLegacyStyle = useSemanticRootStyle(contextStyle, legacyStyleKey);
  const componentLegacyStyle = useSemanticRootStyle(style, legacyStyleKey);

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    BadgeSemanticAllType['classNames'],
    BadgeSemanticAllType['styles'],
    BadgeProps
  >(
    [contextClassNames, classNames],
    [contextStyles, contextLegacyStyle, styles, componentLegacyStyle],
    {
      props: mergedProps,
    },
  );

  const showAsDot = dot && !isZero;

  const mergedCount = showAsDot ? '' : numberedDisplayCount;

  const isHidden = useMemo(() => {
    const isEmpty = !isReactRenderable(mergedCount) && !isReactRenderable(text);
    return (isEmpty || (isZero && !showZero)) && !showAsDot;
  }, [mergedCount, isZero, showZero, showAsDot, text]);

  // Count should be cache in case hidden change it
  const countRef = useRef(count);
  if (!isHidden) {
    countRef.current = count;
  }
  const livingCount = countRef.current;

  // We need cache count since remove motion should not change count display
  const displayCountRef = useRef(mergedCount);
  if (!isHidden) {
    displayCountRef.current = mergedCount;
  }
  const displayCount = displayCountRef.current;

  // We will cache the dot status to avoid shaking on leaved motion
  const isDotRef = useRef(showAsDot);
  if (!isHidden) {
    isDotRef.current = showAsDot;
  }

  // =============================== Render ===============================
  // >>> Title
  const fallbackTitleNode =
    isString(livingCount) || isNumber(livingCount) ? livingCount : undefined;
  const titleNode = title === null || title === false ? undefined : (title ?? fallbackTitleNode);

  // >>> Status Text
  const showStatusTextNode = !isHidden && (text === 0 ? showZero : !!text && text !== true);
  const statusTextNode = !showStatusTextNode ? null : (
    <span className={`${prefixCls}-status-text`}>{text}</span>
  );

  // >>> Display Component
  const displayNode = isPlainObject(livingCount)
    ? cloneElement(livingCount, (oriProps) => ({
        style: { ...mergedStyle, ...oriProps.style },
      }))
    : undefined;

  // InternalColor
  const isInternalColor = isPresetColor(color, false);

  // Shared styles
  const statusCls = clsx(mergedClassNames.indicator, {
    [`${prefixCls}-status-dot`]: hasStatus,
    [`${prefixCls}-status-${status}`]: !!status,
    [`${prefixCls}-color-${color}`]: isInternalColor,
  });

  const statusStyle: React.CSSProperties = {};
  if (color && !isInternalColor) {
    statusStyle.color = color;
    statusStyle.background = color;
  }

  const badgeClassName = clsx(
    prefixCls,
    {
      [`${prefixCls}-status`]: hasStatus,
      [`${prefixCls}-not-a-wrapper`]: !children,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    rootClassName,
    contextClassName,
    mergedClassNames.root,
    hashId,
    cssVarCls,
  );

  // <Badge status="success" />
  if (isStatusBadge) {
    const statusTextColor = mergedStyles.root?.color;
    return (
      <span
        ref={ref}
        {...restProps}
        className={badgeClassName}
        style={{ ...offsetStyle, ...mergedStyles.root }}
      >
        <span className={statusCls} style={{ ...mergedStyles.indicator, ...statusStyle }} />
        {showStatusTextNode && (
          <span style={{ color: statusTextColor }} className={`${prefixCls}-status-text`}>
            {text}
          </span>
        )}
      </span>
    );
  }

  return (
    <span ref={ref} {...restProps} className={badgeClassName} style={mergedStyles.root}>
      {children}
      <CSSMotion
        visible={!isHidden}
        motionName={`${prefixCls}-zoom`}
        motionAppear={false}
        motionDeadline={1000}
      >
        {({ className: motionClassName }) => {
          const scrollNumberPrefixCls = getPrefixCls(
            'scroll-number',
            customizeScrollNumberPrefixCls,
          );

          const isDot = isDotRef.current;

          const scrollNumberCls = clsx(mergedClassNames.indicator, {
            [`${prefixCls}-dot`]: isDot,
            [`${prefixCls}-count`]: !isDot,
            [`${prefixCls}-count-sm`]: size === 'small',
            [`${prefixCls}-multiple-words`]:
              !isDot && displayCount && displayCount.toString().length > 1,
            [`${prefixCls}-status-${status}`]: !!status,
            [`${prefixCls}-color-${color}`]: isInternalColor,
          });

          let scrollNumberStyle: React.CSSProperties = {
            ...offsetStyle,
            ...mergedStyles.indicator,
          };

          if (color && !isInternalColor) {
            scrollNumberStyle = scrollNumberStyle || {};
            scrollNumberStyle.background = color;
          }

          return (
            <ScrollNumber
              prefixCls={scrollNumberPrefixCls}
              show={!isHidden}
              motionClassName={motionClassName}
              className={scrollNumberCls}
              count={displayCount}
              title={titleNode}
              style={scrollNumberStyle}
              key="scrollNumber"
            >
              {displayNode}
            </ScrollNumber>
          );
        }}
      </CSSMotion>
      {statusTextNode}
    </span>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Badge.displayName = 'Badge';
}

export default Badge;
