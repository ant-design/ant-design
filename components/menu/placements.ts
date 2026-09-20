import type { BuildInPlacements } from '@rc-component/trigger';

const popupOverflow = {
  adjustX: true,
  adjustY: true,
  shiftY: true,
};

const menuPopupPlacements: BuildInPlacements = {
  topLeft: { points: ['bl', 'tl'], overflow: popupOverflow },
  topRight: { points: ['br', 'tr'], overflow: popupOverflow },
  bottomLeft: { points: ['tl', 'bl'], overflow: popupOverflow },
  bottomRight: { points: ['tr', 'br'], overflow: popupOverflow },
  leftTop: { points: ['tr', 'tl'], overflow: popupOverflow },
  leftBottom: { points: ['br', 'bl'], overflow: popupOverflow },
  rightTop: { points: ['tl', 'tr'], overflow: popupOverflow },
  rightBottom: { points: ['bl', 'br'], overflow: popupOverflow },
};

const menuPopupPlacementsRtl: BuildInPlacements = {
  topLeft: { points: ['bl', 'tl'], overflow: popupOverflow },
  topRight: { points: ['br', 'tr'], overflow: popupOverflow },
  bottomLeft: { points: ['tl', 'bl'], overflow: popupOverflow },
  bottomRight: { points: ['tr', 'br'], overflow: popupOverflow },
  rightTop: { points: ['tr', 'tl'], overflow: popupOverflow },
  rightBottom: { points: ['br', 'bl'], overflow: popupOverflow },
  leftTop: { points: ['tl', 'tr'], overflow: popupOverflow },
  leftBottom: { points: ['bl', 'br'], overflow: popupOverflow },
};

export default function getMenuPopupPlacements(rtl?: boolean): BuildInPlacements {
  return rtl ? menuPopupPlacementsRtl : menuPopupPlacements;
}
