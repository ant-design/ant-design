import React from 'react';
import classNames from 'classnames';

import Palette from './Palette';

const colors = [
  {
    name: 'red',
    english: 'Dust Red',
    chinese: '薄暮',
    englishDescription: 'Fighting Spirit, Unrestrained',
    chineseDescription: '斗志、奔放',
  },
  {
    name: 'volcano',
    english: 'Volcano',
    chinese: '火山',
    englishDescription: 'Eye-catching, Surging',
    chineseDescription: '醒目、澎湃',
  },
  {
    name: 'orange',
    english: 'Sunset Orange',
    chinese: '日暮',
    englishDescription: 'Warm, Cheerful',
    chineseDescription: '温暖、欢快',
  },
  {
    name: 'gold',
    english: 'Calendula Gold',
    chinese: '金盏花',
    englishDescription: 'Energetic, Positive',
    chineseDescription: '活力、积极',
  },
  {
    name: 'yellow',
    english: 'Sunrise Yellow',
    chinese: '日出',
    englishDescription: 'Birth, Sunshine',
    chineseDescription: '出生、阳光',
  },
  {
    name: 'lime',
    english: 'Lime',
    chinese: '青柠',
    englishDescription: 'Natural, Vitality',
    chineseDescription: '自然、生机',
  },
  {
    name: 'green',
    english: 'Polar Green',
    chinese: '极光绿',
    englishDescription: 'Healthy, Innovative',
    chineseDescription: '健康、创新',
  },
  {
    name: 'cyan',
    english: 'Cyan',
    chinese: '明青',
    englishDescription: 'Hope, Strong',
    chineseDescription: '希望、坚强',
  },
  {
    name: 'blue',
    english: 'Daybreak Blue',
    chinese: '拂晓蓝',
    englishDescription: 'Inclusive, Technology, Universal',
    chineseDescription: '包容、科技、普惠',
  },
  {
    name: 'geekblue',
    english: 'Geek Blue',
    chinese: '极客蓝',
    englishDescription: 'Exploration, Research',
    chineseDescription: '探索、钻研',
  },
  {
    name: 'purple',
    english: 'Golden Purple',
    chinese: '酱紫',
    englishDescription: 'Elegant, Romantic',
    chineseDescription: '优雅、浪漫',
  },
  {
    name: 'magenta',
    english: 'Magenta',
    chinese: '法式洋红',
    englishDescription: 'Bright, Emotional',
    chineseDescription: '明快、感性',
  },
];

const ColorPalettes: React.FC<{ dark?: boolean }> = (props) => {
  const { dark } = props;
  return (
    <div className={classNames('color-palettes', { 'color-palettes-dark': dark })}>
      {colors.map((color) => (
        <Palette key={color.name} color={color} dark={dark} showTitle />
      ))}
    </div>
  );
};

export default ColorPalettes;
