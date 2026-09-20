import type { BuildInPlacements } from '@rc-component/trigger';

const flipOverflow = {
  adjustX: true,
  adjustY: true,
};

const sidePopupOverflow = {
  ...flipOverflow,
  shiftY: true,
};

const menuPopupPlacements: BuildInPlacements = {
  topLeft: { points: ['bl', 'tl'], overflow: flipOverflow },
  topRight: { points: ['br', 'tr'], overflow: flipOverflow },
  bottomLeft: { points: ['tl', 'bl'], overflow: flipOverflow },
  bottomRight: { points: ['tr', 'br'], overflow: flipOverflow },
  leftTop: { points: ['tr', 'tl'], overflow: sidePopupOverflow },
  leftBottom: { points: ['br', 'bl'], overflow: sidePopupOverflow },
  rightTop: { points: ['tl', 'tr'], overflow: sidePopupOverflow },
  rightBottom: { points: ['bl', 'br'], overflow: sidePopupOverflow },
};

const menuPopupPlacementsRtl: BuildInPlacements = {
  topLeft: { points: ['bl', 'tl'], overflow: flipOverflow },
  topRight: { points: ['br', 'tr'], overflow: flipOverflow },
  bottomLeft: { points: ['tl', 'bl'], overflow: flipOverflow },
  bottomRight: { points: ['tr', 'br'], overflow: flipOverflow },
  rightTop: { points: ['tr', 'tl'], overflow: sidePopupOverflow },
  rightBottom: { points: ['br', 'bl'], overflow: sidePopupOverflow },
  leftTop: { points: ['tl', 'tr'], overflow: sidePopupOverflow },
  leftBottom: { points: ['bl', 'br'], overflow: sidePopupOverflow },
};

export default function getMenuPopupPlacements(rtl?: boolean): BuildInPlacements {
  return rtl ? menuPopupPlacementsRtl : menuPopupPlacements;
}
