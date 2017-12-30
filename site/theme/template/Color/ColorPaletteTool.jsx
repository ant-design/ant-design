import React, { Component } from 'react';
import Color from 'color-standalone';
import { FormattedMessage } from 'react-intl';
import ColorBlock from './ColorBlock';
import ColorPicker from './ColorPicker';

const hueStep = 2; // 色相阶梯
const saturationStep = 16; // 饱和度阶梯，浅色部分
const saturationStep2 = 5; // 饱和度阶梯，深色部分
const brightnessStep1 = 5; // 亮度阶梯，浅色部分
const brightnessStep2 = 15; // 亮度阶梯，深色部分
const lightColorCount = 5; // 浅色数量，主色上
const darkColorCount = 4; // 深色数量，主色下

// eslint-disable-next-line
export default class ColorPaletteTool extends Component {
  state = {
    primaryColor: '#1890ff',
  };
  handleChangeColor = (e) => {
    const value = e.target ? e.target.value : e;
    this.setState({
      primaryColor: value,
    });
  }
  // eslint-disable-next-line
  getHue(hsv, i, light) {
    let hue;
    // 根据色相不同，色相转向不同
    if (hsv.h >= 60 && hsv.h <= 240) {
      hue = light ? hsv.h - (hueStep * i) : hsv.h + (hueStep * i);
    } else {
      hue = light ? hsv.h + (hueStep * i) : hsv.h - (hueStep * i);
    }
    if (hue < 0) {
      hue += 360;
    } else if (hue >= 360) {
      hue -= 360;
    }
    return hue;
  }
  // eslint-disable-next-line
  getSaturation(hsv, i, light) {
    let saturation;
    if (light) {
      saturation = hsv.s - (saturationStep * i);
    } else if (i === darkColorCount) {
      saturation = hsv.s + (saturationStep);
    } else {
      saturation = hsv.s + (saturationStep2 * i);
    }
    // 边界值修正
    if (saturation > 100) {
      saturation = 100;
    }
    // 第一格的 s 限制在 6-10 之间
    if (light && i === lightColorCount && saturation > 10) {
      saturation = 10;
    }
    if (saturation < 6) {
      saturation = 6;
    }
    return saturation;
  }
  // eslint-disable-next-line
  getValue(hsv, i, light) {
    if (light) {
      return hsv.v + (brightnessStep1 * i);
    }
    return hsv.v - (brightnessStep2 * i);
  }
  renderColorPatterns() {
    const patterns = [];
    const pColor = Color(this.state.primaryColor);
    let index = 0;
    for (let i = lightColorCount; i > 0; i -= 1) {
      const hsv = pColor.clone().hsv();
      const colorString = Color({
        h: this.getHue(hsv, i, true),
        s: this.getSaturation(hsv, i, true),
        v: this.getValue(hsv, i, true),
      }).hexString();
      index += 1;
      patterns.push(
        <ColorBlock color={colorString} index={index} key={index} />
      );
    }
    index += 1;
    patterns.push(
      <ColorBlock color={pColor.hexString()} index={index} key={index} />
    );
    for (let i = 1; i <= darkColorCount; i += 1) {
      const hsv = pColor.clone().hsv();
      const colorString = Color({
        h: this.getHue(hsv, i),
        s: this.getSaturation(hsv, i),
        v: this.getValue(hsv, i),
      }).hexString();
      index += 1;
      patterns.push(
        <ColorBlock color={colorString} index={index} key={index} />
      );
    }
    return patterns;
  }
  render() {
    return (
      <div style={{ margin: '0 auto', textAlign: 'center' }}>
        <div className="color-palette">
          <div className="color-palette-pick">
            <FormattedMessage id="app.docs.color.pick-primary" />
            <div className="color-palette-picker">
              <span style={{ display: 'inline-block' }}>
                <ColorPicker type="chrome" color={this.state.primaryColor} onChange={this.handleChangeColor} />
              </span>
              <div className="color-palette-picker-value">
                {this.state.primaryColor}
              </div>
            </div>
          </div>
          <div className="main-color">
            {this.renderColorPatterns()}
          </div>
        </div>
      </div>
    );
  }
}
