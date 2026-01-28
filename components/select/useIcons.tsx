import type { ReactNode } from 'react';
import * as React from 'react';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import DownOutlined from '@ant-design/icons/DownOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';

import fallbackProp from '../_util/fallbackProp';
import { devUseWarning } from '../_util/warning';

type RenderNode = React.ReactNode | ((props: any) => React.ReactNode);

export default function useIcons({
  suffixIcon,
  contextSuffixIcon,
  clearIcon,
  contextClearIcon,
  menuItemSelectedIcon,
  removeIcon,
  contextRemoveIcon,
  loading,
  loadingIcon,
  searchIcon,
  contextSearchIcon,
  multiple,
  hasFeedback,
  showSuffixIcon,
  feedbackIcon,
  showArrow,
  componentName,
}: {
  suffixIcon?: React.ReactNode;
  contextSuffixIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  contextClearIcon?: React.ReactNode;
  menuItemSelectedIcon?: RenderNode;
  removeIcon?: RenderNode;
  contextRemoveIcon?: RenderNode;
  loading?: boolean;
  loadingIcon?: React.ReactNode;
  searchIcon?: React.ReactNode;
  contextSearchIcon?: React.ReactNode;
  multiple?: boolean;
  hasFeedback?: boolean;
  feedbackIcon?: ReactNode;
  prefixCls: string;
  showSuffixIcon?: boolean;
  showArrow?: boolean;
  componentName: string;
}) {
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning(componentName);

    warning.deprecated(!clearIcon, 'clearIcon', 'allowClear={{ clearIcon: React.ReactNode }}');
  }

  return React.useMemo(() => {
    // Clear Icon
    const mergedClearIcon = fallbackProp(clearIcon, contextClearIcon, <CloseCircleFilled />);

    // Validation Feedback Icon
    const getSuffixIconNode = (arrowIcon?: ReactNode) => {
      if (suffixIcon === null && !hasFeedback && !showArrow) {
        return null;
      }
      return (
        <>
          {showSuffixIcon !== false && arrowIcon}
          {hasFeedback && feedbackIcon}
        </>
      );
    };

    // Arrow item icon
    let mergedSuffixIcon = null;
    if (suffixIcon !== undefined) {
      mergedSuffixIcon = getSuffixIconNode(suffixIcon);
    } else if (loading) {
      mergedSuffixIcon = getSuffixIconNode(fallbackProp(loadingIcon, <LoadingOutlined spin />));
    } else {
      mergedSuffixIcon = ({ open, showSearch }: { open: boolean; showSearch: boolean }) => {
        if (open && showSearch) {
          return getSuffixIconNode(fallbackProp(searchIcon, contextSearchIcon, <SearchOutlined />));
        }
        return getSuffixIconNode(fallbackProp(contextSuffixIcon, <DownOutlined />));
      };
    }

    // Checked item icon
    let mergedItemIcon = null;
    if (menuItemSelectedIcon !== undefined) {
      mergedItemIcon = menuItemSelectedIcon;
    } else if (multiple) {
      mergedItemIcon = <CheckOutlined />;
    } else {
      mergedItemIcon = null;
    }

    const mergedRemoveIcon = fallbackProp(removeIcon, contextRemoveIcon, <CloseOutlined />);

    return {
      clearIcon: mergedClearIcon,
      suffixIcon: mergedSuffixIcon,
      itemIcon: mergedItemIcon,
      removeIcon: mergedRemoveIcon,
    };
  }, [
    suffixIcon,
    contextSuffixIcon,
    clearIcon,
    contextClearIcon,
    menuItemSelectedIcon,
    removeIcon,
    contextRemoveIcon,
    loading,
    loadingIcon,
    searchIcon,
    contextSearchIcon,
    multiple,
    hasFeedback,
    showSuffixIcon,
    feedbackIcon,
    showArrow,
  ]);
}
