import React from 'react';

const prefix = 'ant-btn-group-';

export default class ButtonGroup extends React.Component {
  render() {
    const {size, className, ...others} = this.props;

    let classSet = ['ant-btn-group'];
    if (size) {
      classSet.push(prefix + size);
    }
    if (className) {
      classSet.push(className);
    }

    return <div {...others} className={classSet.join(' ')} />;
  }
}
ButtonGroup.propTypes = {
  size: React.PropTypes.string,
};
