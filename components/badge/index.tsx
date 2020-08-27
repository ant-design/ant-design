import * as React from 'react';
import Animate from 'rc-animate';
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

  const getNumberedDisplayCount = () => {
    const displayCount =
      (count as number) > (overflowCount as number) ? `${overflowCount}+` : count;
    return displayCount as string | number | null;
  };

  const hasStatus = (): boolean => (status !== null && status !== undefined) || (color !== null && color !== undefined);

  const isZero = () => {
    const numberedDisplayCount = getNumberedDisplayCount();
    return numberedDisplayCount === '0' || numberedDisplayCount === 0;
  };

  const isDot = () => {
    return (dot && !isZero()) || hasStatus();
  };

  const getDisplayCount = () => {
    // dot mode don't need count
    if (isDot()) {
      return '';
    }
    return getNumberedDisplayCount();
  };

  const getScrollNumberTitle = () => {
    if (title) {
      return title;
    }
    return typeof count === 'string' || typeof count === 'number' ? count : undefined;
  };

  const getStyleWithOffset = () => {
    if (direction === 'rtl') {
      return offset
        ? {
            left: parseInt(offset[0] as string, 10),
            marginTop: offset[1],
            ...style,
          }
        : style;
    }
    return offset
      ? {
          right: -parseInt(offset[0] as string, 10),
          marginTop: offset[1],
          ...style,
        }
      : style;
  };

  const isHidden = () => {
    const displayCount = getDisplayCount();
    const isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
    return (isEmpty || (isZero() && !showZero)) && !isDot();
  };

  const renderStatusText = () => {
    const hidden = isHidden();
    return hidden || !text ? null : <span className={`${prefixCls}-status-text`}>{text}</span>;
  };

  const renderDisplayComponent = () => {
    const customNode = count as React.ReactElement<any>;
    if (!customNode || typeof customNode !== 'object') {
      return undefined;
    }
    return cloneElement(customNode, {
      style: {
        ...getStyleWithOffset(),
        ...(customNode.props && customNode.props.style),
      },
    });
  };

  const renderBadgeNumber = () => {
    const scrollNumberPrefixCls = getPrefixCls('scroll-number', customizeScrollNumberPrefixCls);
    const displayCount = getDisplayCount();
    const bDot = isDot();
    const hidden = isHidden();

    const scrollNumberCls = classNames({
      [`${prefixCls}-dot`]: bDot,
      [`${prefixCls}-count`]: !bDot,
      [`${prefixCls}-count-sm`]: size === 'small',
      [`${prefixCls}-multiple-words`]:
        !bDot && count && count.toString && count.toString().length > 1,
      [`${prefixCls}-status-${status}`]: !!status,
      [`${prefixCls}-status-${color}`]: isPresetColor(color),
    });

    let statusStyle: React.CSSProperties | undefined = getStyleWithOffset();
    if (color && !isPresetColor(color)) {
      statusStyle = statusStyle || {};
      statusStyle.background = color;
    }

    return hidden ? null : (
      <ScrollNumber
        prefixCls={scrollNumberPrefixCls}
        data-show={!hidden}
        className={scrollNumberCls}
        count={displayCount}
        displayComponent={renderDisplayComponent()} // <Badge status="success" count={<Icon type="xxx" />}></Badge>
        title={getScrollNumberTitle()}
        style={statusStyle}
        key="scrollNumber"
      />
    );
  };

  const statusCls = classNames({
    [`${prefixCls}-status-dot`]: hasStatus(),
    [`${prefixCls}-status-${status}`]: !!status,
    [`${prefixCls}-status-${color}`]: isPresetColor(color),
  });
  const statusStyle: React.CSSProperties = {};
  if (color && !isPresetColor(color)) {
    statusStyle.background = color;
  }

  const badgeClassName = classNames(className, prefixCls, {
    [`${prefixCls}-status`]: hasStatus(),
    [`${prefixCls}-not-a-wrapper`]: !children,
    [`${prefixCls}-rtl`]: direction === 'rtl',
  });

  // <Badge status="success" />
  if (!children && hasStatus()) {
    const styleWithOffset = getStyleWithOffset();
    const statusTextColor = styleWithOffset && styleWithOffset.color;
    return (
      <span {...restProps} className={badgeClassName} style={styleWithOffset}>
        <span className={statusCls} style={statusStyle} />
        <span style={{ color: statusTextColor }} className={`${prefixCls}-status-text`}>
          {text}
        </span>
      </span>
    );
  }

  return (
    <span {...restProps} className={badgeClassName}>
      {children}
      <Animate
        component=""
        showProp="data-show"
        transitionName={children ? `${prefixCls}-zoom` : ''}
        transitionAppear
      >
        {renderBadgeNumber()}
      </Animate>
      {renderStatusText()}
    </span>
  );
};

Badge.Ribbon = Ribbon;

export default Badge;
