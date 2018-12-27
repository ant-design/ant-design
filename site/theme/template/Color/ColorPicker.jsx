import React, { Component } from 'react';
import { ChromePicker, SketchPicker } from 'react-color';

const noop = () => {};

const pickers = {
  chrome: ChromePicker,
  sketch: SketchPicker,
};

export default class ColorPicker extends Component {
  static defaultProps = {
    onChange: noop,
    onChangeComplete: noop,
    position: 'bottom',
  };

  static getDerivedStateFromProps(props) {
    if ('color' in props) {
      return {
        color: props.color,
      };
    }
    return null;
  }

  state = {
    displayColorPicker: false,
  };

  handleClick = () => {
    const { displayColorPicker } = this.state;
    this.setState({ displayColorPicker: !displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = color => {
    const { onChange } = this.props;
    this.setState({ color: color.hex });
    onChange(color.hex, color);
  };

  handleChangeComplete = color => {
    const { onChangeComplete } = this.props;
    this.setState({ color: color.hex });
    onChangeComplete(color.hex);
  };

  render() {
    const { small, type, position } = this.props;
    const { color, displayColorPicker } = this.state;
    const Picker = pickers[type];
    const styles = {
      color: {
        width: small ? '80px' : '120px',
        height: small ? '16px' : '24px',
        borderRadius: '2px',
        background: color,
      },
      swatch: {
        padding: '4px',
        background: '#fff',
        borderRadius: '2px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
      wrapper: {
        position: 'inherit',
        zIndex: '100',
      },
    };

    if (position === 'top') {
      styles.wrapper.transform = 'translateY(-100%)';
      styles.wrapper.paddingBottom = 8;
    }

    const swatch = (
      <div style={styles.swatch} onClick={this.handleClick}>
        <div style={styles.color} />
      </div>
    );
    const picker = displayColorPicker ? (
      <div style={styles.popover}>
        <div style={styles.cover} onClick={this.handleClose} />
        <div style={styles.wrapper}>
          <Picker
            {...this.props}
            color={color}
            onChange={this.handleChange}
            onChangeComplete={this.handleChangeComplete}
          />
        </div>
      </div>
    ) : null;

    if (position === 'top') {
      return (
        <div>
          {picker}
          {swatch}
        </div>
      );
    }
    return (
      <div>
        {swatch}
        {picker}
      </div>
    );
  }
}
