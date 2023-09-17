import type { Color } from 'antd/es/color-picker';
import { generateColor } from 'antd/es/color-picker/util';

export const DEFAULT_COLOR = '#1677FF';
export const PINK_COLOR = '#ED4192';

export const COLOR_IMAGES = [
  {
    color: DEFAULT_COLOR,
    // url: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*QEAoSL8uVi4AAAAAAAAAAAAAARQnAQ',
    url: null,
    webp: null,
  },
  {
    color: '#5A54F9',
    url: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*H8nRT7_q0EwAAAAAAAAAAAAADrJ8AQ/original',
    webp: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*H8nRT7_q0EwAAAAAAAAAAAAADrJ8AQ/fmt.webp',
  },
  {
    color: '#9E339F',
    url: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*FMluR4vJhaQAAAAAAAAAAAAAARQnAQ',
    webp: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*CMCMTKV51tIAAAAAAAAAAAAADrJ8AQ/fmt.webp',
  },
  {
    color: PINK_COLOR,
    url: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*DGZXS4YOGp0AAAAAAAAAAAAAARQnAQ',
    webp: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*s5OdR6wZZIkAAAAAAAAAAAAADrJ8AQ/fmt.webp',
  },
  {
    color: '#E0282E',
    url: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*w6xcR7MriwEAAAAAAAAAAAAAARQnAQ',
    webp: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*HE_4Qp_XfQQAAAAAAAAAAAAADrJ8AQ/fmt.webp',
  },
  {
    color: '#F4801A',
    url: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*VWFOTbEyU9wAAAAAAAAAAAAAARQnAQ',
    webp: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*xTG2QbottAQAAAAAAAAAAAAADrJ8AQ/fmt.webp',
  },
  {
    color: '#F2BD27',
    url: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*1yydQLzw5nYAAAAAAAAAAAAAARQnAQ',
    webp: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*hbPfSbF-xPIAAAAAAAAAAAAADrJ8AQ/fmt.webp',
  },
  {
    color: '#00B96B',
    url: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*XpGeRoZKGycAAAAAAAAAAAAAARQnAQ',
    webp: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*iM6CQ496P3oAAAAAAAAAAAAADrJ8AQ/fmt.webp',
  },
] as const;

export const PRESET_COLORS = COLOR_IMAGES.map(({ color }) => color);

const DISTANCE = 33;

export function getClosetColor(colorPrimary?: Color | string | null) {
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
