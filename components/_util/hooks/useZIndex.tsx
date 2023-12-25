import React from 'react';

import useToken from '../../theme/useToken';
import zIndexContext from '../zindexContext';

export type ZIndexContainer = 'Modal' | 'Drawer' | 'Popover' | 'Popconfirm' | 'Tooltip' | 'Tour';

export type ZIndexConsumer = 'SelectLike' | 'Dropdown' | 'DatePicker' | 'Menu' | 'ImagePreview';

// Z-Index control range
// Container: 1000 + offset 100 (max base + 10 * offset = 2000)
// Popover: offset 50
// Notification: Container Max zIndex + componentOffset

const CONTAINER_OFFSET = 100;
const CONTAINER_OFFSET_MAX_COUNT = 10;

export const CONTAINER_MAX_OFFSET = CONTAINER_OFFSET * CONTAINER_OFFSET_MAX_COUNT;

export const containerBaseZIndexOffset: Record<ZIndexContainer, number> = {
  Modal: CONTAINER_OFFSET,
  Drawer: CONTAINER_OFFSET,
  Popover: CONTAINER_OFFSET,
  Popconfirm: CONTAINER_OFFSET,
  Tooltip: CONTAINER_OFFSET,
  Tour: CONTAINER_OFFSET,
};
export const consumerBaseZIndexOffset: Record<ZIndexConsumer, number> = {
  SelectLike: 50,
  Dropdown: 50,
  DatePicker: 50,
  Menu: 50,
  ImagePreview: 1,
};

function isContainerType(type: ZIndexContainer | ZIndexConsumer): type is ZIndexContainer {
  return type in containerBaseZIndexOffset;
}

export function useZIndex(
  componentType: ZIndexContainer | ZIndexConsumer,
  customZIndex?: number,
): [zIndex: number | undefined, contextZIndex: number] {
  const [, token] = useToken();
  const parentZIndex = React.useContext(zIndexContext);
  const isContainer = isContainerType(componentType);

  if (customZIndex !== undefined) {
    return [customZIndex, customZIndex];
  }

  let zIndex = parentZIndex ?? 0;

  if (isContainer) {
    zIndex +=
      // Use preset token zIndex by default but not stack when has parent container
      (parentZIndex ? 0 : token.zIndexPopupBase) +
      // Container offset
      containerBaseZIndexOffset[componentType];

    zIndex = Math.min(zIndex, token.zIndexPopupBase + CONTAINER_MAX_OFFSET);
  } else {
    zIndex += consumerBaseZIndexOffset[componentType];
  }
  return [parentZIndex === undefined ? customZIndex : zIndex, zIndex];
}
