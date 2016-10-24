import React from 'react';
import Animate from 'rc-animate';
import ScrollNumber from './ScrollNumber';
import classNames from 'classnames';
import warning from 'warning';
import splitObject from '../_util/splitObject';

export interface BadgeProps {
  /** Number to show in badge */
  count: number | string;
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
    dot: false,
    overflowCount: 99,
  };

  static propTypes = {
    count: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    dot: React.PropTypes.bool,
    overflowCount: React.PropTypes.number,
  };

  render() {
    let [{
      count, prefixCls, overflowCount, className, style, children, dot, status, text,
    }, restProps] = splitObject(
      this.props,
      ['count', 'prefixCls', 'overflowCount', 'className', 'style', 'children', 'dot', 'status', 'text']
    );
    const isDot = dot || status;

    count = count > overflowCount ? `${overflowCount}+` : count;

    // dot mode don't need count
    if (isDot) {
      count = '';
    }

    // null undefined "" "0" 0
    const hidden = (!count || count === '0') && !isDot;
    const scrollNumberCls = classNames({
      [`${prefixCls}-dot`]: isDot,
      [`${prefixCls}-count`]: !isDot,
    });
    const badgeCls = classNames({
      [className]: !!className,
      [prefixCls]: true,
      [`${prefixCls}-status`]: !!status,
      [`${prefixCls}-not-a-wrapper`]: !children,
    });

    warning(
      !(children && status),
      '`Badge[children]` and `Badge[status]` cannot be used at the same time.'
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

    return (
      <span {...restProps} className={badgeCls} title={count}>
        {children}
        <Animate
          component=""
          showProp="data-show"
          transitionName={`${prefixCls}-zoom`}
          transitionAppear
        >
          {
            hidden ? null :
              <ScrollNumber
                data-show={!hidden}
                className={scrollNumberCls}
                count={count}
                style={style}
              />
          }
        </Animate>
        {
          hidden || !text ? null :
            <span className={`${prefixCls}-status-text`}>{text}</span>
        }
      </span>
    );
  }
}
