import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'antd';
import ColorPicker from './ColorPicker';
import ColorPatterns from './ColorPatterns';
import { validateColor } from './utils';

export default class ColorPaletteTool extends Component {
  state = {
    primaryColor: '#1890ff',
    backgroundColor: '#141414',
  };

  handleChangeColor = color => this.setState({ primaryColor: color });

  handleChangeBackgroundColor = color => {
    this.setState({
      backgroundColor: color,
    });
  };

  renderColorValidation() {
    return (
      <span className="color-palette-picker-validation color-palette-picker-validation-dark">
        {validateColor(this.state.primaryColor)}
      </span>
    );
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
                    <ColorPicker color={primaryColor} onChange={this.handleChangeColor} />
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
                    <ColorPicker
                      color={backgroundColor}
                      onChange={this.handleChangeBackgroundColor}
                    />
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
