import React from 'react';
import Animate from 'rc-animate';
import ScrollNumber from './ScrollNumber';
import classNames from 'classnames';

class AntBadge extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { count, prefixCls, overflowCount, className, style, children } = this.props;
    const dot = this.props.dot;

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
      <span className={badgeCls} title={count} {...this.props} style={null}>
        {children}
        <Animate component=""
          showProp="data-show"
          transitionName={prefixCls + '-zoom'}
          transitionAppear>
          {
            hidden ? null :
              <ScrollNumber data-show={!hidden} className={scrollNumberCls}
                count={count} style={style} />
          }
        </Animate>
      </span>
    );
  }
}

AntBadge.defaultProps = {
  prefixCls: 'ant-badge',
  count: null,
  dot: false,
  overflowCount: 99,
};

AntBadge.propTypes = {
  count: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  dot: React.PropTypes.bool,
  overflowCount: React.PropTypes.number,
};

export default AntBadge;
