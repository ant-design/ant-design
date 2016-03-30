import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import classNames from 'classnames';
import { Icon } from '../../../';

class CopyableIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      justCopied: false
    };
  }

  onCopied = () => {
    this.setState({ justCopied: true }, () => {
      setTimeout(() => {
        this.setState({ justCopied: false });
      }, 1000);
    });
  }

  render() {
    const text = `<Icon type="${this.props.type}" />`;
    return (
      <CopyToClipboard text={text} onCopy={this.onCopied}>
        <li className={this.state.justCopied ? 'copied' : ''}>
          <Icon type={this.props.type} />
          <span className="anticon-class">{this.props.type}</span>
        </li>
      </CopyToClipboard>
    );
  }
}

export default class IconSet extends React.Component {
  static defaultProps = {
    icons: []
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
