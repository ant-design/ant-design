import React from 'react';
import classNames from 'classnames';

const prefix = 'ant-btn-group-';

export default class ButtonGroup extends React.Component {
  static propTypes = {
    size: React.PropTypes.oneOf(['large', 'small']),
  }

  render() {
    const { size, className, ...others } = this.props;

    // large => lg
    // small => sm
    const sizeCls = ({
      large: 'lg',
      small: 'sm',
    })[size] || '';

    const classes = classNames({
      'ant-btn-group': true,
      [prefix + sizeCls]: sizeCls,
      [className]: className
    });

    return <div {...others} className={classes} />;
  }
}
