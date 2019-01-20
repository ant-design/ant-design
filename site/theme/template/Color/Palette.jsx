import React from 'react';
import { message } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';

const rgbToHex = rgbString => {
  const rgb = rgbString.match(/\d+/g);
  let r = parseInt(rgb[0], 10).toString(16);
  let g = parseInt(rgb[1], 10).toString(16);
  let b = parseInt(rgb[2], 10).toString(16);
  r = r.length === 1 ? `0${r}` : r;
  g = g.length === 1 ? `0${g}` : g;
  b = b.length === 1 ? `0${b}` : b;
  return `#${r}${g}${b}`;
};

export default class Palette extends React.Component {
  componentDidMount() {
    this.hexColors = {};
    Object.keys(this.colorNodes).forEach(key => {
      const computedColor = getComputedStyle(this.colorNodes[key])['background-color'];
      if (computedColor.indexOf('rgba') >= 0) {
        this.hexColors[key] = computedColor;
      } else {
        this.hexColors[key] = rgbToHex(computedColor);
      }
    });
    this.forceUpdate();
  }

  render() {
    this.colorNodes = this.colorNodes || {};
    const {
      showTitle,
      direction,
      color: { name, description, english, chinese },
    } = this.props;
    const className = direction === 'horizontal' ? 'color-palette-horizontal' : 'color-palette';
    const colors = [];
    const colorName = `${english} / ${chinese}`;
    for (let i = 1; i <= 10; i += 1) {
      const colorText = `${name}-${i}`;
      colors.push(
        <CopyToClipboard
          text={this.hexColors ? this.hexColors[colorText] : ''}
          onCopy={() => message.success(`@${colorText} copied: ${this.hexColors[colorText]}`)}
          key={colorText}
        >
          <div
            key={i}
            ref={node => {
              this.colorNodes[`${name}-${i}`] = node;
            }}
            className={`main-color-item palette-${name}-${i}`}
            style={{
              color: (name === 'yellow' ? i > 6 : i > 5) ? '#fff' : 'unset',
              fontWeight: i === 6 ? 'bold' : 'normal',
            }}
            title="click to copy color"
          >
            <span className="main-color-text">{colorText}</span>
            {this.hexColors ? (
              <span className="main-color-value">{this.hexColors[colorText]}</span>
            ) : null}
          </div>
        </CopyToClipboard>,
      );
    }
    return (
      <div className={className}>
        {showTitle && (
          <div className="color-title">
            {colorName}
            <span className="color-description">{description}</span>
          </div>
        )}
        <div className="main-color">{colors}</div>
      </div>
    );
  }
}
