import type { ReactNode } from 'react';
import * as React from 'react';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import DownOutlined from '@ant-design/icons/DownOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import { isReactRenderable } from '@rc-component/util';

import fallbackProp from '../_util/fallbackProp';
import { isFunction } from '../_util/is';

type RenderNode = React.ReactNode | ((props: any) => React.ReactNode);

export default function useIcons({
  suffix,
  contextSuffix,
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
}: {
  suffix?: RenderNode;
  contextSuffix?: RenderNode;
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
}) {
  return React.useMemo(() => {
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
      mergedSuffix = isFunction(suffix)
        ? (props) => getSuffixNode(suffix(props))
        : getSuffixNode(suffix);
    } else if (loading) {
      mergedSuffix = getSuffixNode(
        fallbackProp(loadingIcon, contextLoadingIcon, <LoadingOutlined spin aria-hidden="true" />),
      );
    } else {
      mergedSuffix = (props: { open: boolean; showSearch: boolean }) => {
        const { open, showSearch } = props;
        if (open && showSearch) {
          return getSuffixNode(
            fallbackProp(searchIcon, contextSearchIcon, <SearchOutlined aria-hidden="true" />),
          );
        }
        const fallbackSuffix = fallbackProp(contextSuffix, <DownOutlined aria-hidden="true" />);
        return getSuffixNode(isFunction(fallbackSuffix) ? fallbackSuffix(props) : fallbackSuffix);
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
      suffix: mergedSuffix,
      itemIcon: mergedItemIcon,
      removeIcon: mergedRemoveIcon,
    };
  }, [
    suffix,
    contextSuffix,
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
