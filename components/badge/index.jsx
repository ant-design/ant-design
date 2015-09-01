import React, { cloneElement } from 'react';
const prefixCls = 'ant-badge';

class AntBadge extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: props.count
    };
  }

  render() {
    if (this.props.dot) {
      return <span className={prefixCls} {...this.props}>
        {this.props.children}
        <sup className={prefixCls + '-dot'}></sup>
      </span>;
    }
    let count = this.state.count;
    if (!count) {
      return cloneElement(this.props.children);
    } else {
      count = count >= 100 ? '99+' : count;
      return (
        <span className={prefixCls} title={this.state.count} {...this.props}>
          {this.props.children}
          <sup className={prefixCls + '-count'}>{count}</sup>
        </span>
      );
    }
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
