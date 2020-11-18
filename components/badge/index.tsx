import * as React from 'react';
import CSSMotion from 'rc-motion';
import classNames from 'classnames';
import ScrollNumber from './ScrollNumber';
import Ribbon from './Ribbon';
import { PresetColorType, PresetStatusColorType } from '../_util/colors';
import { ConfigContext } from '../config-provider';
import { LiteralUnion } from '../_util/type';
import { cloneElement } from '../_util/reactNode';
import { isPresetColor } from './utils';

export { ScrollNumberProps } from './ScrollNumber';

interface CompoundedComponent extends React.FC<BadgeProps> {
  Ribbon: typeof Ribbon;
}

export interface BadgeProps {
  /** Number to show in badge */
  count?: React.ReactNode;
  showZero?: boolean;
  /** Max count to show */
  overflowCount?: number;
  /** whether to show red dot without number */
  dot?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  scrollNumberPrefixCls?: string;
  className?: string;
  status?: PresetStatusColorType;
  color?: LiteralUnion<PresetColorType, string>;
  text?: React.ReactNode;
  size?: 'default' | 'small';
  offset?: [number | string, number | string];
  title?: string;
}

const Badge: CompoundedComponent = ({
  prefixCls: customizePrefixCls,
  scrollNumberPrefixCls: customizeScrollNumberPrefixCls,
  children,
  status,
  text,
  color,
  count = null,
  overflowCount = 99,
  dot = false,
  size = 'default',
  title,
  offset,
  style,
  className,
  showZero = false,
  ...restProps
}) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('badge', customizePrefixCls);

  // ================================ Misc ================================
  const numberedDisplayCount = ((count as number) > (overflowCount as number)
    ? `${overflowCount}+`
    : count) as string | number | null;

  const hasStatus =
    (status !== null && status !== undefined) || (color !== null && color !== undefined);

  const isZero = numberedDisplayCount === '0' || numberedDisplayCount === 0;

  const showAsDot = (dot && !isZero) || hasStatus;

  const displayCount = showAsDot ? '' : numberedDisplayCount;

  const isHidden = React.useMemo(() => {
    const isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
    return (isEmpty || (isZero && !showZero)) && !showAsDot;
  }, [displayCount, isZero, showZero, showAsDot]);

  // We will cache the dot status to avoid shaking on leaved motion
  const isDotRef = React.useRef(showAsDot);
  if (!isHidden) {
    isDotRef.current = showAsDot;
  }

  // =============================== Styles ===============================
  const mergedStyle = React.useMemo<React.CSSProperties>(() => {
    if (!offset) {
      return { ...style };
    }

    const offsetStyle: React.CSSProperties = { marginTop: offset[1] };
    if (direction === 'rtl') {
      offsetStyle.left = parseInt(offset[0] as string, 10);
    } else {
      offsetStyle.right = -parseInt(offset[0] as string, 10);
    }

    return {
      ...offsetStyle,
      ...style,
    };
  }, [direction, offset, style]);

  // =============================== Render ===============================
  // >>> Title
  const titleNode =
    title ?? (typeof count === 'string' || typeof count === 'number' ? count : undefined);

  // >>> Status Text
  const statusTextNode =
    isHidden || !text ? null : <span className={`${prefixCls}-status-text`}>{text}</span>;

  // >>> Display Component
  const displayNode =
    !count || typeof count !== 'object'
      ? undefined
      : cloneElement(count, oriProps => ({
          style: {
            ...mergedStyle,
            ...oriProps.style,
          },
        }));

  // Shared styles
  const statusCls = classNames({
    [`${prefixCls}-status-dot`]: hasStatus,
    [`${prefixCls}-status-${status}`]: !!status,
    [`${prefixCls}-status-${color}`]: isPresetColor(color),
  });

  const statusStyle: React.CSSProperties = {};
  if (color && !isPresetColor(color)) {
    statusStyle.background = color;
  }

  const badgeClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-status`]: hasStatus,
      [`${prefixCls}-not-a-wrapper`]: !children,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  // <Badge status="success" />
  if (!children && hasStatus) {
    const statusTextColor = mergedStyle.color;
    return (
      <span {...restProps} className={badgeClassName} style={mergedStyle}>
        <span className={statusCls} style={statusStyle} />
        <span style={{ color: statusTextColor }} className={`${prefixCls}-status-text`}>
          {text}
        </span>
      </span>
    );
  }

  // <Badge status="success" count={<Icon type="xxx" />}></Badge>
  return (
    <span {...restProps} className={badgeClassName}>
      {children}
      <CSSMotion visible={!isHidden} motionName={`${prefixCls}-zoom`} motionAppear>
        {({ className: motionClassName }) => {
          const scrollNumberPrefixCls = getPrefixCls(
            'scroll-number',
            customizeScrollNumberPrefixCls,
          );

          const isDot = isDotRef.current;

          const scrollNumberCls = classNames({
            [`${prefixCls}-dot`]: isDot,
            [`${prefixCls}-count`]: !isDot,
            [`${prefixCls}-count-sm`]: size === 'small',
            [`${prefixCls}-multiple-words`]:
              !isDot && count && count.toString && count.toString().length > 1,
            [`${prefixCls}-status-${status}`]: !!status,
            [`${prefixCls}-status-${color}`]: isPresetColor(color),
          });

          let scrollNumberStyle: React.CSSProperties = { ...mergedStyle };
          if (color && !isPresetColor(color)) {
            scrollNumberStyle = scrollNumberStyle || {};
            scrollNumberStyle.background = color;
          }

          return (
            <ScrollNumber
              prefixCls={scrollNumberPrefixCls}
              show={!isHidden}
              className={classNames(motionClassName, scrollNumberCls)}
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
};

Badge.Ribbon = Ribbon;

export default Badge;
