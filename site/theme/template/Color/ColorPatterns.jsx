import React from 'react';
import { generate } from '@ant-design/colors';
import uniq from 'lodash/uniq';
import ColorBlock from './ColorBlock';

export default function ColorPatterns({ color, dark, backgroundColor }) {
  const colors = generate(color, dark ? { theme: 'dark', backgroundColor } : {});
  return uniq(colors).map((colorString, i) => (
    <ColorBlock color={colorString} index={i + 1} dark={dark} key={colorString} />
  ));
}
