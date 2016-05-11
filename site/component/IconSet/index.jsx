import React from 'react';
import classNames from 'classnames';
import CopyableIcon from './CopyableIcon';

export default class IconSet extends React.Component {
  static defaultProps = {
    icons: [],
  }

  render() {
    const className = this.props.className;
    const listClassName = classNames({
      'anticons-list': true,
      clearfix: true,
      [className]: !!className,
    });
    return (
      <ul className={listClassName}>
        {this.props.icons.map((type, i) => <CopyableIcon key={i} type={type} />)}
      </ul>
    );
  }
}
