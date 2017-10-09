import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { message } from 'antd';

const rgbToHex = (rgbString) => {
  const rgb = rgbString.match(/\d+/g);
  let r = parseInt(rgb[0], 10).toString(16);
  let g = parseInt(rgb[1], 10).toString(16);
  let b = parseInt(rgb[2], 10).toString(16);
  r = r.length === 1 ? `0${r}` : r;
  g = g.length === 1 ? `0${g}` : g;
  b = b.length === 1 ? `0${b}` : b;
  return `#${r}${g}${b}`;
};

class Palette extends Component {
  componentDidMount() {
    this.hexColors = {};
    Object.keys(this.colorNodes).forEach((key) => {
      this.hexColors[key] = rgbToHex(getComputedStyle(this.colorNodes[key])['background-color']);
    });
    this.forceUpdate();
  }
  render() {
    this.colorNodes = this.colorNodes || {};
    const { name, description, english, chinese } = this.props.color;
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
            ref={(node) => { this.colorNodes[`${name}-${i}`] = node; }}
            className={`main-color-item palatte-${name}-${i}`}
            style={{
              color: i > 5 ? '#fff' : 'unset',
              fontWeight: i === 6 ? 'bold' : 'normal',
            }}
            title="click to copy color"
          >
            <span className="main-color-text">{colorText}</span>
            {this.hexColors
              ? <span className="main-color-value">{this.hexColors[colorText]}</span>
              : null}
          </div>
        </CopyToClipboard>
      );
    }
    return (
      <div className="color-palette">
        <div className="color-title">
          {colorName}
          <span className="color-description">{description}</span>
        </div>
        <div className="main-color">{colors}</div>
      </div>
    );
  }
}

const ColorPalettes = () => {
  const colors = [
    {
      name: 'red',
      english: 'Dust Red',
      chinese: '薄暮',
      description: '斗志、奔放',
    },
    {
      name: 'volcano',
      english: 'Volcano',
      chinese: '火山',
      description: '醒目、澎湃',
    },
    {
      name: 'orange',
      english: 'Sunset Orange',
      chinese: '日暮',
      description: '温暖、欢快',
    },
    {
      name: 'gold',
      english: 'Calendula Gold',
      chinese: '金盏花',
      description: '活力、积极',
    },
    {
      name: 'yellow',
      english: 'Sunrise Yellow',
      chinese: '日出',
      description: '出生、阳光',
    },
    {
      name: 'lime',
      english: 'Lime Green',
      chinese: '青柠',
      description: '自然、生机',
    },
    {
      name: 'green',
      english: 'Polar Green',
      chinese: '极光绿',
      description: '健康、创新',
    },
    {
      name: 'cyan',
      english: 'Cyan',
      chinese: '明青',
      description: '希望、坚强',
    },
    {
      name: 'blue',
      english: 'Daybreak Blue',
      chinese: '拂晓蓝',
      description: '包容、科技、普惠',
    },
    {
      name: 'geekblue',
      english: 'Geek Blue',
      chinese: '极客蓝',
      description: '探索、钻研',
    },
    {
      name: 'purple',
      english: 'Golden Purple',
      chinese: '酱紫',
      description: '优雅、浪漫',
    },
    {
      name: 'magenta',
      english: 'Magenta',
      chinese: '法式洋红',
      description: '明快、感性',
    },
    {
      name: 'grey',
      english: 'Grey',
      chinese: '灰',
      description: '平稳、中性',
    },
  ];
  return (
    <div>
      {colors.map(color => <Palette key={color.name} color={color} />)}
    </div>
  );
};

export default ColorPalettes;
