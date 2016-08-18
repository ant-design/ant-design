import * as React from 'react';
import Animate from 'rc-animate';
import ScrollNumber from './ScrollNumber';
import classNames from 'classnames';

interface BadgeProps {
  /** Number to show in badge */
  count: number | string;
  /** Max count to show */
  overflowCount?: number;
  /** whether to show red dot without number */
  dot?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
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
    let { count, prefixCls, overflowCount, className, style, children, dot } = this.props;

    count = count > overflowCount ? `${overflowCount}+` : count;

    // dot mode don't need count
    if (dot) {
      count = '';
    }

    // null undefined "" "0" 0
    const hidden = (!count || count === '0') && !dot;
    const scrollNumberCls = prefixCls + (dot ? '-dot' : '-count');
    const badgeCls = classNames({
      [className]: !!className,
      [prefixCls]: true,
      [`${prefixCls}-not-a-wrapper`]: !children,
    });

    return (
      <span className={badgeCls} title={count} style={null}>
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
      </span>
    );
  }
}
