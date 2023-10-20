import React from 'react';
import useToken from '../../theme/useToken';
import zIndexContext from '../zindexContext';

export type ZIndexContainer = 'Modal' | 'Drawer' | 'Popover' | 'Popconfirm' | 'Tooltip' | 'Tour';

export type ZIndexConsumer =
  | 'Select'
  | 'Dropdown'
  | 'Cascader'
  | 'TreeSelect'
  | 'AutoComplete'
  | 'ColorPicker'
  | 'DatePicker'
  | 'TimePicker'
  | 'Menu';

export const containerBaseZIndexOffset: Record<ZIndexContainer, number> = {
  Modal: 0,
  Drawer: 0,
  Popover: 30,
  Popconfirm: 60,
  Tooltip: 70,
  Tour: 70,
};
export const consumerBaseZIndexOffset: Record<ZIndexConsumer, number> = {
  Select: 50,
  Dropdown: 50,
  Cascader: 50,
  TreeSelect: 50,
  AutoComplete: 50,
  ColorPicker: 30,
  DatePicker: 50,
  TimePicker: 50,
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
  console.log(componentType, parentZIndex);
  if (isContainer) {
    zIndex += token.zIndexPopupBase + containerBaseZIndexOffset[componentType];
  } else if (componentType === 'ColorPicker') {
    zIndex +=
      token.zIndexPopupBase +
      consumerBaseZIndexOffset[componentType] +
      consumerBaseZIndexOffset[componentType];
  } else {
    zIndex += consumerBaseZIndexOffset[componentType];
  }
  return [customZIndex ?? parentZIndex === undefined ? customZIndex : zIndex, zIndex];
}
