import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { message } from 'antd';

export default class ColorBlock extends Component {
  getTextStyle() {
    const { color, index } = this.props;
    return {
      background: color,
      color: index > 5 ? '#fff' : 'unset',
      fontWeight: index === 6 ? 'bold' : 'normal',
    };
  }

  onCopied = () => {
    const { color } = this.props;
    message.success(`Copied: ${color}`);
  };

  render() {
    const { color, index } = this.props;
    return (
      <CopyToClipboard text={color} onCopy={this.onCopied} title="click to copy color">
        <div className="main-color-item" style={this.getTextStyle()}>
          color-{index}
          <span className="main-color-value">{color.toLowerCase()}</span>
        </div>
      </CopyToClipboard>
    );
  }
}
