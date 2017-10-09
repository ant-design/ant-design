import React, { Component } from 'react';
import Color from 'color-standalone';
import BezierEasing from 'bezier-easing/dist/bezier-easing';
import ColorBlock from './ColorBlock';
import ColorPicker from './ColorPicker';

const easing = BezierEasing.apply(null, [0.26, 0.09, 0.37, 0.18]); // 色彩分布曲线
const warmDark = 0.5; // 暖色深度
const warmRotate = -26; // 暖色角度
const coldDark = 0.55; // 冷色深度
const coldRotate = 10; // 冷色角度

// eslint-disable-next-line
export default class ColorPaletteTool extends Component {
  state = {
    primaryColor: '#108ee9',
  };
  handleChangeColor = (e) => {
    const value = e.target ? e.target.value : e;
    this.setState({
      primaryColor: value,
    });
  }
  getShadeColor() {
    const color = Color(this.state.primaryColor);
    let rotate;
    let dark;
    if (color.red() > color.blue()) {
      rotate = warmRotate;
      dark = warmDark;
    } else {
      rotate = coldRotate;
      dark = coldDark;
    }
    return color.darken(dark).rotate(rotate).hexString();
  }
  renderColorPatterns() {
    const patterns = [];
    const [count1, count2] = [5, 4];
    const tColor = Color('#fff');
    const pColor = Color(this.state.primaryColor);
    const sColor = Color(this.getShadeColor());
    let index = 1;
    const primaryEasing = easing(0.1 * (count1 + 1));
    for (let i = 1; i <= count1; i += 1) {
      const colorString =
        pColor
          .clone()
          .mix(tColor, easing(0.1 * i) / primaryEasing)
          .hexString();
      patterns.push(
        <ColorBlock color={colorString} index={index} key={`tint-${i}`} />
      );
      index += 1;
    }
    for (let i = count1 + 1; i <= count1 + count2 + 1; i += 1) {
      const colorString =
        pColor
          .clone()
          .mix(sColor, 1 - ((easing(i * 0.1) - primaryEasing) / (1 - primaryEasing)))
          .hexString();
      patterns.push(
        <ColorBlock color={colorString} index={index} key={`shade-${i}`} />
      );
      index += 1;
    }
    return patterns;
  }
  render() {
    return (
      <div className="color-palette">
        <div className="color-palette-pick">
          选择自定义主色
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
    );
  }
}
