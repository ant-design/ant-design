import * as React from 'react';
import { ThemeType } from '../../../../components/icon';

interface IconDisplayProps {
  icons: Array<{ category: string, names: string[] }>;
}

interface IconDisplayState {
  theme: ThemeType;
}

export default class IconDisplay extends React.Component<IconDisplayProps, IconDisplayState> {
  state: IconDisplayState = {
    theme: 'outlined',
  };

  render() {
    // wip
    return null;
  }
}
