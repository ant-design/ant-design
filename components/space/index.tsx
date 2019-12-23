import React, { Component } from 'react';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

type SizePreset = 'small' | 'default' | 'large';

interface SpaceProps {
  size?: SizePreset | number;
}

class Space extends Component<SpaceProps> {
  renderSpace = (configProps: ConfigConsumerProps) => {
    const { size = 'default' } = this.props;
    const { spaceBaseSize = 8 } = configProps;
    const widthPreset: { [key in SizePreset]: number } = {
      small: spaceBaseSize,
      default: spaceBaseSize * 2,
      large: spaceBaseSize * 3,
    };
    const spaceWidth = typeof size === 'string' ? widthPreset[size] : size;
    return <span style={{ width: spaceWidth, display: 'inline-block' }} />;
  };

  render() {
    return <ConfigConsumer>{this.renderSpace}</ConfigConsumer>;
  }
}

export default Space;
