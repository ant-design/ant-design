import React from 'react';
import Animate from 'rc-animate';
import ScrollNumber from './ScrollNumber';

class AntBadge extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { count, prefixCls } = this.props;
    const dot = this.props.dot;

    count = count >= 100 ? '99+' : count;

    // dot mode don't need count
    if (dot) {
      count = '';
    }

    // null undefined "" "0" 0
    const hidden = (!count || count === '0') && !dot;
    const className = prefixCls + (dot ? '-dot' : '-count');

    return (
      <span className={prefixCls} title={count} {...this.props}>
        {this.props.children}
        <Animate component=""
          showProp="data-show"
          transitionName={prefixCls + '-zoom'}
          transitionAppear>
          {
            hidden ? null :
            <ScrollNumber data-show={!hidden} className={className} count={count} />
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
};

AntBadge.propTypes = {
  count: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  dot: React.PropTypes.bool,
};

export default AntBadge;
