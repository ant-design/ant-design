import * as React from 'react';
import {
  LoadingOutlined,
  SearchOutlined,
  IArrowDown,
  IArrowUp,
  ISelector,
  IClose,
  ICloseFullfiled,
} from 'infra-design-icons';

export default function getIcons({
  suffixIcon,
  clearIcon,
  menuItemSelectedIcon,
  removeIcon,
  loading,
  multiple,
  prefixCls,
}: {
  suffixIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  menuItemSelectedIcon?: React.ReactNode;
  removeIcon?: React.ReactNode;
  loading?: boolean;
  multiple?: boolean;
  prefixCls: string;
}) {
  // Clear Icon
  let mergedClearIcon = clearIcon;
  if (!clearIcon) {
    mergedClearIcon = <ICloseFullfiled />;
  }

  // Arrow item icon
  let mergedSuffixIcon = null;
  if (suffixIcon !== undefined) {
    mergedSuffixIcon = suffixIcon;
  } else if (loading) {
    mergedSuffixIcon = <LoadingOutlined spin />;
  } else {
    const iconCls = `${prefixCls}-suffix`;
    mergedSuffixIcon = ({ open, showSearch }: { open: boolean; showSearch: boolean }) => {
      if (open) {
        return showSearch ? (
          <SearchOutlined className={iconCls} />
        ) : (
          <IArrowUp className={iconCls} />
        );
      }
      return <IArrowDown className={iconCls} />;
    };
  }

  // Checked item icon
  let mergedItemIcon = null;
  if (menuItemSelectedIcon !== undefined) {
    mergedItemIcon = menuItemSelectedIcon;
  } else if (multiple) {
    mergedItemIcon = <ISelector />;
  } else {
    mergedItemIcon = null;
  }

  let mergedRemoveIcon = null;
  if (removeIcon !== undefined) {
    mergedRemoveIcon = removeIcon;
  } else {
    mergedRemoveIcon = <IClose />;
  }

  return {
    clearIcon: mergedClearIcon,
    suffixIcon: mergedSuffixIcon,
    itemIcon: mergedItemIcon,
    removeIcon: mergedRemoveIcon,
  };
}
