import React from 'react';
import PropTypes from 'prop-types';
import Animate from 'rc-animate';
import ScrollNumber from './ScrollNumber';
import classNames from 'classnames';
import warning from '../_util/warning';

export interface BadgeProps {
  /** Number to show in badge */
  count: number | string;
  showZero?: boolean;
  /** Max count to show */
  overflowCount?: number;
  /** whether to show red dot without number */
  dot?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
  text?: string;
}

export default class Badge extends React.Component<BadgeProps, any> {
  static defaultProps = {
    prefixCls: 'ant-badge',
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
      overflowCount,
      className,
      style,
      children,
      dot,
      status,
      text,
      ...restProps,
    } = this.props;
    const isDot = dot || status;
    let displayCount = count > (overflowCount as number) ? `${overflowCount}+` : count;
    // dot mode don't need count
    if (isDot) {
      displayCount = '';
    }

    const isZero = displayCount === '0' || displayCount === 0;
    const isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
    const hidden = (isEmpty || (isZero && !showZero)) && !isDot;
    const scrollNumberCls = classNames({
      [`${prefixCls}-dot`]: isDot,
      [`${prefixCls}-count`]: !isDot,
    });
    const badgeCls = classNames(className, prefixCls, {
      [`${prefixCls}-status`]: !!status,
      [`${prefixCls}-not-a-wrapper`]: !children,
    });

    warning(
      !(children && status),
      '`Badge[children]` and `Badge[status]` cannot be used at the same time.',
    );
    // <Badge status="success" />
    if (!children && status) {
      const statusCls = classNames({
        [`${prefixCls}-status-dot`]: !!status,
        [`${prefixCls}-status-${status}`]: true,
      });
      return (
        <span className={badgeCls}>
          <span className={statusCls} />
          <span className={`${prefixCls}-status-text`}>{text}</span>
        </span>
      );
    }

    const scrollNumber = hidden ? null : (
      <ScrollNumber
        data-show={!hidden}
        className={scrollNumberCls}
        count={displayCount}
        style={style}
      />
    );

    const statusText = (hidden || !text) ? null : (
      <span className={`${prefixCls}-status-text`}>{text}</span>
    );

    return (
      <span {...restProps} className={badgeCls} title={count as string}>
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
