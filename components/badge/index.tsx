import * as React from 'react';
import PropTypes from 'prop-types';
import Animate from 'rc-animate';
import ScrollNumber from './ScrollNumber';
import classNames from 'classnames';

export { ScrollNumberProps } from './ScrollNumber';

export interface BadgeProps {
  /** Number to show in badge */
  count?: number | string;
  showZero?: boolean;
  /** Max count to show */
  overflowCount?: number;
  /** whether to show red dot without number */
  dot?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  scrollNumberPrefixCls?: string;
  className?: string;
  status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
  text?: string;
  offset?: [number | string, number | string];
}

export default class Badge extends React.Component<BadgeProps, any> {
  static defaultProps = {
    prefixCls: 'ant-badge',
    scrollNumberPrefixCls: 'ant-scroll-number',
    count: null,
    showZero: false,
    dot: false,
    overflowCount: 99,
  };

  static propTypes = {
    count: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    showZero: PropTypes.bool,
    dot: PropTypes.bool,
    overflowCount: PropTypes.number,
  };

  render() {
    const {
      count,
      showZero,
      prefixCls,
      scrollNumberPrefixCls,
      overflowCount,
      className,
      style,
      children,
      dot,
      status,
      text,
      offset,
      ...restProps,
    } = this.props;
    let displayCount = (count as number) > (overflowCount as number) ? `${overflowCount}+` : count;
    const isZero = displayCount === '0' || displayCount === 0;
    const isDot = (dot && !isZero) || status;
    // dot mode don't need count
    if (isDot) {
      displayCount = '';
    }
    const isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
    const hidden = (isEmpty || (isZero && !showZero)) && !isDot;
    const statusCls = classNames({
      [`${prefixCls}-status-dot`]: !!status,
      [`${prefixCls}-status-${status}`]: !!status,
    });
    const scrollNumberCls = classNames({
      [`${prefixCls}-dot`]: isDot,
      [`${prefixCls}-count`]: !isDot,
      [`${prefixCls}-multiple-words`]: !isDot && count && count.toString && count.toString().length > 1,
      [`${prefixCls}-status-${status}`]: !!status,
    });
    const badgeCls = classNames(className, prefixCls, {
      [`${prefixCls}-status`]: !!status,
      [`${prefixCls}-not-a-wrapper`]: !children,
    });
    const styleWithOffset = offset ? {
      marginTop: offset[0],
      marginLeft: offset[1],
      ...style,
    } : style;
    // <Badge status="success" />
    if (!children && status) {
      return (
        <span className={badgeCls} style={styleWithOffset}>
          <span className={statusCls} />
          <span className={`${prefixCls}-status-text`}>{text}</span>
        </span>
      );
    }

    const scrollNumber = hidden ? null : (
      <ScrollNumber
        prefixCls={scrollNumberPrefixCls}
        data-show={!hidden}
        className={scrollNumberCls}
        count={displayCount}
        title={count}
        style={styleWithOffset}
      />
    );

    const statusText = (hidden || !text) ? null : (
      <span className={`${prefixCls}-status-text`}>{text}</span>
    );

    return (
      <span {...restProps} className={badgeCls}>
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
  }
}
