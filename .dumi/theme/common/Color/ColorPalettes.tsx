import React, { useMemo } from 'react';
import { clsx } from 'clsx';

import useLocale from '../../../hooks/useLocale';
import Palette from './Palette';

const COLOR_KEYS = [
  'red',
  'volcano',
  'orange',
  'lime',
  'gold',
  'yellow',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
  'magenta',
] as const;

const locales = {
  cn: {
    redTitle: '薄暮',
    redDescription: '斗志、奔放',

    volcanoTitle: '火山',
    volcanoDescription: '醒目、澎湃',

    orangeTitle: '日暮',
    orangeDescription: '温暖、欢快',

    limeTitle: '青柠',
    limeDescription: '自然、生机',

    goldTitle: '金盏花',
    goldDescription: '活力、积极',

    yellowTitle: '日出',
    yellowDescription: '出生、阳光',

    greenTitle: '极光绿',
    greenDescription: '健康、创新',

    cyanTitle: '明青',
    cyanDescription: '希望、坚强',

    blueTitle: '拂晓蓝',
    blueDescription: '包容、科技、普惠',

    geekblueTitle: '极客蓝',
    geekblueDescription: '探索、钻研',

    purpleTitle: '酱紫',
    purpleDescription: '优雅、浪漫',

    magentaTitle: '法式洋红',
    magentaDescription: '明快、感性',
  },
  en: {
    redTitle: 'Dust Red',
    redDescription: 'Fighting Spirit, Unrestrained',

    volcanoTitle: 'Volcano',
    volcanoDescription: 'Eye-catching, Surging',

    orangeTitle: 'Sunset Orange',
    orangeDescription: 'Warm, Cheerful',

    limeTitle: 'Lime',
    limeDescription: 'Natural, Vitality',

    goldTitle: 'Calendula Gold',
    goldDescription: 'Energetic, Positive',

    yellowTitle: 'Sunrise Yellow',
    yellowDescription: 'Birth, Sunshine',

    greenTitle: 'Polar Green',
    greenDescription: 'Healthy, Innovative',

    cyanTitle: 'Cyan',
    cyanDescription: 'Hope, Strong',

    blueTitle: 'Daybreak Blue',
    blueDescription: 'Inclusive, Technology, Universal',

    geekblueTitle: 'Geek Blue',
    geekblueDescription: 'Exploration, Research',

    purpleTitle: 'Golden Purple',
    purpleDescription: 'Elegant, Romantic',

    magentaTitle: 'French Magenta',
    magentaDescription: 'Bright, Emotional',
  },
};

const ColorPalettes: React.FC<{ dark?: boolean }> = (props) => {
  const { dark } = props;
  const [locale] = useLocale(locales);
  const memoizedColors = useMemo(() => {
    return COLOR_KEYS.map((key) => ({
      name: key,
      title: locale[`${key}Title`],
      description: locale[`${key}Description`],
    }));
  }, [locale]);
  return (
    <div className={clsx('color-palettes', { 'color-palettes-dark': dark })}>
      {memoizedColors.map((color) => (
        <Palette key={`item-${color.name}`} color={color} dark={dark} showTitle />
      ))}
    </div>
  );
};

export default ColorPalettes;
