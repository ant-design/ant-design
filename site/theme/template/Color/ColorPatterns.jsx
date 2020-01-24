import React from 'react';
import { generate } from '@ant-design/colors';
import ColorBlock from './ColorBlock';

export default function ColorPatterns({ color, dark, backgroundColor }) {
  return generate(color, dark ? { theme: 'dark', backgroundColor } : {}).map((colorString, i) => (
    <ColorBlock color={colorString} index={i + 1} dark={dark} key={colorString} />
  ));
}
