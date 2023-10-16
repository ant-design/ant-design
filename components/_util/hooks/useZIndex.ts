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

export const baseZIndexOffset: Record<ZIndexConsumer | ZIndexContainer, number> = {
  Modal: 0,
  Drawer: 0,
  Popover: 30,
  Popconfirm: 60,
  Tooltip: 70,
  Tour: 70,
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
    return null;
  }
  let baseZIndex = parentZIndex;
  if (consumer) {
    baseZIndex += baseZIndexOffset[consumer];
  } else {
    baseZIndex += token.zIndexPopupBase;
  }
  return baseZIndex;
}
