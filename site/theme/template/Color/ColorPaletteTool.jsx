import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import ColorPicker from './ColorPicker';
import ColorPatterns from './ColorPatterns';
import { validateColor } from './utils';

export default class ColorPaletteTool extends Component {
  state = {
    primaryColor: '#1890ff',
  };

  handleChangeColor = color => this.setState({ primaryColor: color });

  renderColorValidation() {
    return (
      <span className="color-palette-picker-validation">
        {validateColor(this.state.primaryColor)}
      </span>
    );
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
            <ColorPicker color={primaryColor} onChange={this.handleChangeColor} />
          </span>
          <span className="color-palette-picker-value">{primaryColor}</span>
          {this.renderColorValidation()}
        </div>
      </div>
    );
  }
}
