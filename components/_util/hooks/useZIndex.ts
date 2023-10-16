import React from 'react';
import { zIndexContext } from '../zindexContext';
import useToken from '../../theme/useToken';

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

export const baseZIndexOffset: Record<ZIndexConsumer, number> = {
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

export function useZIndex(consumer?: ZIndexConsumer) {
  const [, token] = useToken();
  const { zIndex: parentZIndex } = React.useContext(zIndexContext);
  if (parentZIndex === null) {
    return {
      curZIndex: consumer ? baseZIndexOffset[consumer] : token.zIndexPopupBase,
      parentZIndex: null,
    };
  }
  let curZIndex = parentZIndex;
  if (consumer) {
    curZIndex += baseZIndexOffset[consumer];
  } else {
    curZIndex += token.zIndexPopupBase;
  }
  return {
    curZIndex,
    parentZIndex,
  };
}
