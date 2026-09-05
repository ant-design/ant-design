import type { ReactNode } from 'react';
import * as React from 'react';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import DownOutlined from '@ant-design/icons/DownOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import { isReactRenderable } from '@rc-component/util';

import fallbackProp from '../_util/fallbackProp';
import { devUseWarning } from '../_util/warning';

type RenderNode = React.ReactNode | ((props: any) => React.ReactNode);

export default function useIcons({
  suffix,
  contextSuffix,
  clearIcon,
  contextClearIcon,
  menuItemSelectedIcon,
  contextMenuItemSelectedIcon,
  removeIcon,
  contextRemoveIcon,
  loading,
  loadingIcon,
  contextLoadingIcon,
  searchIcon,
  contextSearchIcon,
  multiple,
  hasFeedback,
  showSuffix,
  feedbackIcon,
  showArrow,
  componentName,
}: {
  suffix?: RenderNode;
  contextSuffix?: RenderNode;
  clearIcon?: React.ReactNode;
  contextClearIcon?: React.ReactNode;
  menuItemSelectedIcon?: RenderNode;
  contextMenuItemSelectedIcon?: RenderNode;
  removeIcon?: RenderNode;
  contextRemoveIcon?: RenderNode;
  loading?: boolean;
  loadingIcon?: React.ReactNode;
  contextLoadingIcon?: React.ReactNode;
  searchIcon?: React.ReactNode;
  contextSearchIcon?: React.ReactNode;
  multiple?: boolean;
  hasFeedback?: boolean;
  feedbackIcon?: ReactNode;
  prefixCls: string;
  showSuffix?: boolean;
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
    const getSuffixNode = (suffixNode?: ReactNode) => {
      if (!isReactRenderable(suffixNode) && !hasFeedback && !showArrow) {
        return null;
      }
      return (
        <>
          {showSuffix !== false && suffixNode}
          {hasFeedback && feedbackIcon}
        </>
      );
    };

    // Suffix
    let mergedSuffix: RenderNode = null;
    if (suffix !== undefined) {
      mergedSuffix =
        typeof suffix === 'function'
          ? (props) => getSuffixNode(suffix(props))
          : getSuffixNode(suffix);
    } else if (loading) {
      mergedSuffix = getSuffixNode(
        fallbackProp(loadingIcon, contextLoadingIcon, <LoadingOutlined spin />),
      );
    } else {
      mergedSuffix = (props: { open: boolean; showSearch: boolean }) => {
        const { open, showSearch } = props;
        if (open && showSearch) {
          return getSuffixNode(fallbackProp(searchIcon, contextSearchIcon, <SearchOutlined />));
        }
        const fallbackSuffix = fallbackProp(contextSuffix, <DownOutlined />);
        return getSuffixNode(
          typeof fallbackSuffix === 'function' ? fallbackSuffix(props) : fallbackSuffix,
        );
      };
    }

    // Checked item icon
    const mergedItemIcon = fallbackProp(
      menuItemSelectedIcon,
      contextMenuItemSelectedIcon,
      multiple ? <CheckOutlined /> : null,
    );
    const mergedRemoveIcon = fallbackProp(removeIcon, contextRemoveIcon, <CloseOutlined />);

    return {
      clearIcon: mergedClearIcon,
      suffix: mergedSuffix,
      itemIcon: mergedItemIcon,
      removeIcon: mergedRemoveIcon,
    };
  }, [
    suffix,
    contextSuffix,
    clearIcon,
    contextClearIcon,
    menuItemSelectedIcon,
    contextMenuItemSelectedIcon,
    removeIcon,
    contextRemoveIcon,
    loading,
    loadingIcon,
    contextLoadingIcon,
    searchIcon,
    contextSearchIcon,
    multiple,
    hasFeedback,
    showSuffix,
    feedbackIcon,
    showArrow,
  ]);
}
