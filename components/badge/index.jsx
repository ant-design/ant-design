import React from 'react';
import Animate from 'rc-animate';
const prefixCls = 'ant-badge';

class AntBadge extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let count = this.props.count;
    const dot = this.props.dot;
    // null undefined "" "0" 0
    const closed = !count || count === '0';
    const countIsNull = count === null ? true : false;
    count = count >= 100 ? '99+' : count;
    return (
      <span className={prefixCls} title={!countIsNull ? count : ''} {...this.props}>
          {this.props.children}
        <Animate component=""
          showProp="data-show"
          transitionName="zoom-badge"
          transitionAppear={true}
        >
        {closed && !dot ? null : <sup data-show={countIsNull ? dot : !closed} className={prefixCls + (!countIsNull ? '-count' : '-dot')}>{!countIsNull ? count : ''}</sup>}
        </Animate>
      </span>
    );
  }
}

AntBadge.defaultProps = {
  prefixCls: prefixCls,
  count: null,
  dot: false
};

AntBadge.propTypes = {
  count: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  dot: React.PropTypes.bool
};

export default AntBadge;
