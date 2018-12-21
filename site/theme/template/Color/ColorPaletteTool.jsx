import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import ColorPicker from './ColorPicker';
import ColorPatterns from './ColorPatterns';

const primaryMinSaturation = 70; // 主色推荐最小饱和度
const primaryMinBrightness = 70; // 主色推荐最小亮度

// eslint-disable-next-line
export default class ColorPaletteTool extends Component {
  state = {
    primaryColor: '#1890ff',
    primaryColorInstance: null,
  };

  handleChangeColor = (e, color) => {
    const value = e.target ? e.target.value : e;
    this.setState({
      primaryColor: value,
      primaryColorInstance: color,
    });
  };

  renderColorValidation() {
    const { primaryColorInstance } = this.state;
    let text = '';
    if (primaryColorInstance) {
      if (primaryColorInstance.hsv.s * 100 < primaryMinSaturation) {
        text += ` 饱和度建议不低于${primaryMinSaturation}（现在 ${(
          primaryColorInstance.hsv.s * 100
        ).toFixed(2)}）`;
      }
      if (primaryColorInstance.hsv.v * 100 < primaryMinBrightness) {
        text += ` 亮度建议不低于${primaryMinBrightness}（现在 ${(
          primaryColorInstance.hsv.v * 100
        ).toFixed(2)}）`;
      }
    }
    return <span className="color-palette-picker-validation">{text.trim()}</span>;
  }

  render() {
    const { primaryColor } = this.state;
    return (
      <div className="color-palette-horizontal">
        <div className="color-palette-pick">
          <FormattedMessage id="app.docs.color.pick-primary" />
        </div>
        <div className="main-color">
          <ColorPatterns color={primaryColor} />
        </div>
        <div className="color-palette-picker">
          <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <ColorPicker type="chrome" color={primaryColor} onChange={this.handleChangeColor} />
          </span>
          <span className="color-palette-picker-value">{primaryColor}</span>
          {this.renderColorValidation()}
        </div>
      </div>
    );
  }
}
