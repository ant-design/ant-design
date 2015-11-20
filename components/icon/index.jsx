import React from 'react';

class Icon extends React.Component {

  render() {
    let {type, className = '', ...other} = this.props;
    className += ` anticon anticon-${type}`;
    return <i className={className} {...other}></i>;
  }

}

export default Icon;
