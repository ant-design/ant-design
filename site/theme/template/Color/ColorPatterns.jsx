import React from 'react';
import uniq from 'lodash/uniq';
import { generate } from '@ant-design/colors';
import ColorBlock from './ColorBlock';

export default function ColorPatterns({ color }) {
  return uniq(generate(color)).map((colorString, i) => (
    <ColorBlock color={colorString} index={i + 1} key={colorString} />
  ));
}
