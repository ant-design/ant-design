import { generateColor } from 'antd/es/color-picker/util';

export const DEFAULT_COLOR = '#1677FF';
export const PINK_COLOR = '#ED4192';

export const COLOR_IMAGES = [
  {
    color: DEFAULT_COLOR,
    // url: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*QEAoSL8uVi4AAAAAAAAAAAAAARQnAQ',
    url: null,
  },
  {
    color: '#5A54F9',
    url: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*MtVDSKukKj8AAAAAAAAAAAAAARQnAQ',
  },
  {
    color: '#9E339F',
    url: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*FMluR4vJhaQAAAAAAAAAAAAAARQnAQ',
  },
  {
    color: PINK_COLOR,
    url: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*DGZXS4YOGp0AAAAAAAAAAAAAARQnAQ',
  },
  {
    color: '#E0282E',
    url: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*w6xcR7MriwEAAAAAAAAAAAAAARQnAQ',
  },
  {
    color: '#F4801A',
    url: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*VWFOTbEyU9wAAAAAAAAAAAAAARQnAQ',
  },
  {
    color: '#F2BD27',
    url: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*1yydQLzw5nYAAAAAAAAAAAAAARQnAQ',
  },
  {
    color: '#00B96B',
    url: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*XpGeRoZKGycAAAAAAAAAAAAAARQnAQ',
  },
] as const;

export const PRESET_COLORS = COLOR_IMAGES.map(({ color }) => color);

const DISTANCE = 33;
export function getClosetColor(colorPrimary?: string | null) {
  if (!colorPrimary) {
    return null;
  }

  const colorPrimaryRGB = generateColor(colorPrimary).toRgb();

  const distance = COLOR_IMAGES.map(({ color }) => {
    const colorObj = generateColor(color).toRgb();
    const dist = Math.sqrt(
      (colorObj.r - colorPrimaryRGB.r) ** 2 +
        (colorObj.g - colorPrimaryRGB.g) ** 2 +
        (colorObj.b - colorPrimaryRGB.b) ** 2,
    );

    return { color, dist };
  });

  const firstMatch = distance.sort((a, b) => a.dist - b.dist)[0];

  return firstMatch.dist <= DISTANCE ? firstMatch.color : null;
}

export function getAvatarURL(color?: string | null) {
  const closestColor = getClosetColor(color);

  if (!closestColor) {
    return null;
  }

  return (
    COLOR_IMAGES.find((obj) => obj.color === closestColor)?.url ||
    'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*CLp0Qqc11AkAAAAAAAAAAAAAARQnAQ'
  );
}
