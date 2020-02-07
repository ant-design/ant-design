import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'antd';
import ColorPicker from './ColorPicker';
import ColorPatterns from './ColorPatterns';

const primaryMinSaturation = 70; // 主色推荐最小饱和度
const primaryMinBrightness = 70; // 主色推荐最小亮度

// eslint-disable-next-line
export default class ColorPaletteTool extends Component {
  state = {
    primaryColor: '#1890ff',
    backgroundColor: '#141414',
    primaryColorInstance: null,
  };

  handleChangeColor = (e, color) => {
    const value = e.target ? e.target.value : e;
    this.setState({
      primaryColor: value,
      primaryColorInstance: color,
    });
  };

  handleChangeBackgroundColor = (e) => {
    const value = e.target ? e.target.value : e;
    this.setState({
      backgroundColor: value,
    });
  }

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
    return <span className="color-palette-picker-validation color-palette-picker-validation-dark">{text.trim()}</span>;
  }

  render() {
    const { primaryColor, backgroundColor } = this.state;
    return (
      <div className="color-palette-horizontal color-palette-horizontal-dark">
        <div className="main-color">
          <ColorPatterns color={primaryColor} dark backgroundColor={backgroundColor} />
        </div>
        <div className="color-palette-picker">
          <Row>
            <Col span={12}>
              <div className="color-palette-pick">
                <FormattedMessage id="app.docs.color.pick-primary" />
              </div>
              <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <Row>
                  <Col span={18}>
                    <ColorPicker type="chrome" color={primaryColor} onChange={this.handleChangeColor} />
                  </Col>
                  <Col span={6}>
                    <span className="color-palette-pick-hex">{primaryColor}</span>
                  </Col>
                </Row>
              </span>
            </Col>
            <Col span={12}>
              <div className="color-palette-pick">
                <FormattedMessage id="app.docs.color.pick-background" />
              </div>
              <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <Row>
                  <Col span={18}>
                    <ColorPicker type="chrome" color={backgroundColor} onChange={this.handleChangeBackgroundColor} />
                  </Col>
                  <Col span={6}>
                    <span className="color-palette-pick-hex">{backgroundColor}</span>
                  </Col>
                </Row>
              </span>
            </Col>
          </Row>
          {this.renderColorValidation()}
        </div>
      </div>
    );
  }
}
