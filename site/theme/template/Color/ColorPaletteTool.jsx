import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import ColorPicker from './ColorPicker';
import ColorPalettes from './ColorPatterns';

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

  render() {
    return (
      <div style={{ margin: '0 auto', textAlign: 'center' }}>
        <div className="color-palette-horizontal">
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
            <ColorPalettes color={this.state.primaryColor} />
          </div>
        </div>
      </div>
    );
  }
}
