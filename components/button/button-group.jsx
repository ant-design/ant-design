import React from 'react';
import rcUtil from 'rc-util';

const prefix = 'ant-btn-group-';

export default class ButtonGroup extends React.Component {
  render() {
    const {size, className, ...others} = this.props;

    // large => lg
    // small => sm
    const sizeCls = ({
      'large': 'lg',
      'small': 'sm'
    })[size] || '';

    const classes = rcUtil.classSet({
      'ant-btn-group': true,
      [prefix + sizeCls]: sizeCls,
      [className]: className
    });

    return <div {...others} className={classes} />;
  }
}
ButtonGroup.propTypes = {
  size: React.PropTypes.string,
};
