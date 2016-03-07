import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import classNames from 'classnames';
import { Icon } from '../../../';

const CopyableIcon = React.createClass({
  getInitialState() {
    return {
      justCopied: false
    };
  },
  onCopied(e) {
    this.setState({ justCopied: true }, () => {
      setTimeout(() => {
        this.setState({ justCopied: false });
      }, 1000);
    });
  },
  render() {
    const text = '<Icon type="' + this.props.type + '" />';
    return (
      <CopyToClipboard text={text} onCopy={this.onCopied}>
        <li className={this.state.justCopied ? 'copied' : ''}>
          <Icon type={this.props.type} />
          <span className="anticon-class">{this.props.type}</span>
        </li>
      </CopyToClipboard>
    );
  }
});

const IconSet = React.createClass({
  getDefaultProps() {
    return {
      icons: []
    };
  },
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
});

export default IconSet;
