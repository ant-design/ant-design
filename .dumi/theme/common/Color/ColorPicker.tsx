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
    const { onChange = noop } = this.props;
    this.setState({ color: color.hex });
    onChange(color.hex, color);
  };

  handleChangeComplete = (color: { hex: string }) => {
    const { onChangeComplete = noop } = this.props;
    this.setState({ color: color.hex });
    onChangeComplete(color.hex);
  };

  render() {
    const { small, position = 'bottom', presetColors } = this.props;
    const { color, displayColorPicker } = this.state;
    const width = small ? 80 : 120;
    const styles: Record<PropertyKey, React.CSSProperties> = {
      color: {
        width: `${width}px`,
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
        zIndex: 10,
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
        zIndex: 100,
      },
    };

    if (position === 'top') {
      styles.wrapper.transform = `translate(calc(-100% + ${width + 8}px), -100%)`;
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
