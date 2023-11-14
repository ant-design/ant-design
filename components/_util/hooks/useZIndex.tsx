import React from 'react';

import useToken from '../../theme/useToken';
import zIndexContext from '../zindexContext';

export type ZIndexContainer = 'Modal' | 'Drawer' | 'Popover' | 'Popconfirm' | 'Tooltip' | 'Tour';

export type ZIndexConsumer = 'SelectLike' | 'Dropdown' | 'ColorPicker' | 'DatePicker' | 'Menu';

export const containerBaseZIndexOffset: Record<ZIndexContainer, number> = {
  Modal: 0,
  Drawer: 0,
  Popover: 70,
  Popconfirm: 70,
  Tooltip: 70,
  Tour: 70,
};
export const consumerBaseZIndexOffset: Record<ZIndexConsumer, number> = {
  SelectLike: 50,
  Dropdown: 50,
  ColorPicker: 30,
  DatePicker: 50,
  Menu: 50,
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
  let zIndex = parentZIndex ?? 0;
  if (isContainer) {
    zIndex += token.zIndexPopupBase + containerBaseZIndexOffset[componentType];
  } else if (componentType === 'ColorPicker') {
    // Since ColorPicker is a higher-level encapsulation based on the container component Popover,
    // and the Popover component is a container component, it needs to add an extra 1000 to the base offset
    // to serve as the actual offset for the ColorPicker
    zIndex += token.zIndexPopupBase + consumerBaseZIndexOffset[componentType];
  } else {
    zIndex += consumerBaseZIndexOffset[componentType];
  }
  return [parentZIndex === undefined ? customZIndex : zIndex, zIndex];
}
