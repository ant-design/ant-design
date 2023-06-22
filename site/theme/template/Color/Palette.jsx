import React from 'react';
import { message } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';
import { presetDarkPalettes } from '@ant-design/colors';

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
      dark,
      color: { name, description, english, chinese, count = 10 },
    } = this.props;
    const className = direction === 'horizontal' ? 'color-palette-horizontal' : 'color-palette';
    const colors = [];
    const colorName = `${english} / ${chinese}`;
    const colorPaletteMap = {
      dark: ['#fff', 'unset'],
      default: ['rgba(0,0,0,0.85)', '#fff'],
    };
    const [lastColor, firstColor] = dark ? colorPaletteMap.dark : colorPaletteMap.default;
    for (let i = 1; i <= count; i += 1) {
      const colorText = `${name}-${i}`;
      const defaultBgStyle = dark ? presetDarkPalettes[name][i - 1] : '';
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
              color: (name === 'yellow' ? i > 6 : i > 5) ? firstColor : lastColor,
              fontWeight: i === 6 ? 'bold' : 'normal',
              backgroundColor: defaultBgStyle,
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
