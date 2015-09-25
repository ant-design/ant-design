import React from 'react';

export default class ButtonGroup extends React.Component {
  render() {
    const {size, className, ...others} = this.props;
    const prefix = ' ant-btn-group-';

    let classSet = 'ant-btn-group';
    if (size) {
      classSet += prefix + size;
    }
    if (className) {
      classSet += ' ' + className;
    }

    return <div {...others} className={classSet} />;
  }
}
ButtonGroup.propTypes = {
  size: React.PropTypes.string,
};
