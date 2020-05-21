import * as React from 'react';
import Animate from 'rc-animate';
import omit from 'omit.js';
import classNames from 'classnames';
import ScrollNumber from './ScrollNumber';
import { PresetColorTypes, PresetColorType, PresetStatusColorType } from '../_util/colors';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { LiteralUnion } from '../_util/type';
import { cloneElement } from '../_util/reactNode';

export { ScrollNumberProps } from './ScrollNumber';

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
  offset?: [number | string, number | string];
  title?: string;
}

function isPresetColor(color?: string): boolean {
  return (PresetColorTypes as any[]).indexOf(color) !== -1;
}

const Badge: React.FC<BadgeProps> = props => {
  const getNumberedDisplayCount = () => {
    const { count, overflowCount } = props;
    const displayCount =
      (count as number) > (overflowCount as number) ? `${overflowCount}+` : count;
    return displayCount as string | number | null;
  };

  const hasStatus = (): boolean => {
    const { status, color } = props;
    return !!status || !!color;
  };

  const isZero = () => {
    const numberedDisplayCount = getNumberedDisplayCount();
    return numberedDisplayCount === '0' || numberedDisplayCount === 0;
  };

  const isDot = () => {
    const { dot } = props;
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
    const { title, count } = props;
    if (title) {
      return title;
    }
    return typeof count === 'string' || typeof count === 'number' ? count : undefined;
  };

  const getStyleWithOffset = () => {
    const { offset, style } = props;
    return offset
      ? {
          right: -parseInt(offset[0] as string, 10),
          marginTop: offset[1],
          ...style,
        }
      : style;
  };

  const getBadgeClassName = (prefixCls: string, direction: string = 'ltr') => {
    const { className, children } = props;
    return classNames(className, prefixCls, {
      [`${prefixCls}-status`]: hasStatus(),
      [`${prefixCls}-not-a-wrapper`]: !children,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    }) as string;
  };

  const isHidden = () => {
    const { showZero } = props;
    const displayCount = getDisplayCount();
    const isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
    return (isEmpty || (isZero() && !showZero)) && !isDot();
  };

  const renderStatusText = (prefixCls: string) => {
    const { text } = props;
    const hidden = isHidden();
    return hidden || !text ? null : <span className={`${prefixCls}-status-text`}>{text}</span>;
  };

  const renderDisplayComponent = () => {
    const { count } = props;
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

  const renderBadgeNumber = (prefixCls: string, scrollNumberPrefixCls: string) => {
    const { status, count, color } = props;

    const displayCount = getDisplayCount();
    const dot = isDot();
    const hidden = isHidden();

    const scrollNumberCls = classNames({
      [`${prefixCls}-dot`]: dot,
      [`${prefixCls}-count`]: !dot,
      [`${prefixCls}-multiple-words`]:
        !dot && count && count.toString && count.toString().length > 1,
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

  const renderBadge = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      scrollNumberPrefixCls: customizeScrollNumberPrefixCls,
      children,
      status,
      text,
      color,
      ...restProps
    } = props;
    const omitArr = [
      'count',
      'showZero',
      'overflowCount',
      'className',
      'style',
      'dot',
      'offset',
      'title',
    ];

    const prefixCls = getPrefixCls('badge', customizePrefixCls);
    const scrollNumberPrefixCls = getPrefixCls('scroll-number', customizeScrollNumberPrefixCls);

    const scrollNumber = renderBadgeNumber(prefixCls, scrollNumberPrefixCls);
    const statusText = renderStatusText(prefixCls);

    const statusCls = classNames({
      [`${prefixCls}-status-dot`]: hasStatus(),
      [`${prefixCls}-status-${status}`]: !!status,
      [`${prefixCls}-status-${color}`]: isPresetColor(color),
    });
    const statusStyle: React.CSSProperties = {};
    if (color && !isPresetColor(color)) {
      statusStyle.background = color;
    }

    // <Badge status="success" />
    if (!children && hasStatus()) {
      const styleWithOffset = getStyleWithOffset();
      const statusTextColor = styleWithOffset && styleWithOffset.color;
      return (
        <span
          {...omit(restProps, omitArr)}
          className={getBadgeClassName(prefixCls, direction)}
          style={styleWithOffset}
        >
          <span className={statusCls} style={statusStyle} />
          <span style={{ color: statusTextColor }} className={`${prefixCls}-status-text`}>
            {text}
          </span>
        </span>
      );
    }

    return (
      <span {...omit(restProps, omitArr)} className={getBadgeClassName(prefixCls, direction)}>
        {children}
        <Animate
          component=""
          showProp="data-show"
          transitionName={children ? `${prefixCls}-zoom` : ''}
          transitionAppear
        >
          {scrollNumber}
        </Animate>
        {statusText}
      </span>
    );
  };

  return <ConfigConsumer>{renderBadge}</ConfigConsumer>;
};

Badge.defaultProps = {
  count: null,
  showZero: false,
  dot: false,
  overflowCount: 99,
};

export default Badge;
