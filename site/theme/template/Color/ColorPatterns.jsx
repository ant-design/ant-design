import React from 'react';
import { generate } from 'ant-design-palettes';
import ColorBlock from './ColorBlock';

export default function ColorPatterns({ color }) {
  return generate(color).map((colorString, i) => (
    <ColorBlock color={colorString} index={i} key={colorString} />
  ));
}
