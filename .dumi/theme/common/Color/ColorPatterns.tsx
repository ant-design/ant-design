import React from 'react';
import { generate } from '@ant-design/colors';
import uniq from 'lodash/uniq';
import ColorBlock from './ColorBlock';

interface ColorPatternsProps {
  color?: string;
  dark?: boolean;
  backgroundColor?: string;
}

const ColorPatterns = ({ color, dark, backgroundColor }: ColorPatternsProps) => {
  const colors = generate(color, dark ? { theme: 'dark', backgroundColor } : {});
  return uniq(colors).map((colorString, i) => (
    <ColorBlock color={colorString} index={i + 1} dark={dark} key={colorString} />
  ));
};

export default ColorPatterns;
