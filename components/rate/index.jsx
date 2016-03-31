import React, { PropTypes } from 'react';
import RcRate from 'rc-rate';

export default class Rate extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
  };
  static defaultProps = {
    prefixCls: 'ant-rate',
  };
  render() {
    return <RcRate {...this.props} />;
  }
}
