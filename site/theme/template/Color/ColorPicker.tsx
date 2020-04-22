import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

const noop = () => {};

interface ColorPickerProps {
  color?: string;
  small: boolean;
  position: string;
  presetColors?: string[];
  onChange: (hex: string, color: { hex: string }) => void;
  onChangeComplete: (hex: string) => void;
}

export default class ColorPicker extends Component<ColorPickerProps> {
  static defaultProps = {
    onChange: noop,
    onChangeComplete: noop,
    position: 'bottom',
  };

  static getDerivedStateFromProps(props: ColorPickerProps) {
    if ('color' in props) {
      return {
        color: props.color,
      };
    }
    return null;
  }

  state = {
    displayColorPicker: false,
    color: undefined,
  };

  handleClick = () => {
    const { displayColorPicker } = this.state;
    this.setState({ displayColorPicker: !displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color: { hex: string }) => {
    const { onChange } = this.props;
    this.setState({ color: color.hex });
    onChange(color.hex, color);
  };

  handleChangeComplete = (color: { hex: string }) => {
    const { onChangeComplete } = this.props;
    this.setState({ color: color.hex });
    onChangeComplete(color.hex);
  };

  render() {
    const { small, position, presetColors } = this.props;
    const { color, displayColorPicker } = this.state;
    const styles = {
      color: {
        width: small ? '80px' : '120px',
        height: small ? '16px' : '24px',
        borderRadius: '2px',
        background: color,
      } as React.CSSProperties,
      swatch: {
        padding: '4px',
        background: '#fff',
        borderRadius: '2px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      } as React.CSSProperties,
      popover: {
        position: 'absolute',
        zIndex: 10,
      } as React.CSSProperties,
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      } as React.CSSProperties,
      wrapper: {
        position: 'inherit',
        zIndex: 100,
      } as React.CSSProperties,
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
          <SketchPicker
            presetColors={presetColors}
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
