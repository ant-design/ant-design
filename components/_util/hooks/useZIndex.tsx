import React from 'react';
import useToken from '../../theme/useToken';
import { zIndexContext } from '../zindexContext';

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

export function useZIndex(componentType: ZIndexContainer | ZIndexConsumer) {
  const [, token] = useToken();
  const { zIndex: parentZIndex } = React.useContext(zIndexContext);
  const isContainer = isContainerType(componentType!);
  let containerBaseZIndex = 0;
  if (isContainer) {
    containerBaseZIndex = token.zIndexPopupBase + containerBaseZIndexOffset[componentType];
  }
  if (parentZIndex === null) {
    return {
      zIndex: null,
      containerBaseZIndex,
    };
  }
  let zIndex = parentZIndex;
  if (isContainer) {
    zIndex += token.zIndexPopupBase + containerBaseZIndexOffset[componentType];
  } else {
    zIndex += consumerBaseZIndexOffset[componentType];
  }
  return {
    zIndex,
    containerBaseZIndex,
  };
}
