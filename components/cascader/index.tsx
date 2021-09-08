import * as React from 'react';
import classNames from 'classnames';
import RcCascader from 'rc-cascader';
import type { CascaderProps as RcCascaderProps } from 'rc-cascader';
import type { ShowSearchType, FieldNames } from 'rc-cascader/lib/interface';
import omit from 'rc-util/lib/omit';
import RightOutlined from '@ant-design/icons/RightOutlined';
import RedoOutlined from '@ant-design/icons/RedoOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import { ConfigContext } from '../config-provider';
import type { SizeType } from '../config-provider/SizeContext';
import SizeContext from '../config-provider/SizeContext';
import getIcons from '../select/utils/iconUtil';
import { getTransitionName } from '../_util/motion';

// Align the design since we use `rc-select` in root. This help:
// - List search content will show all content
// - Hover opacity style
// - Search filter match case

export type FieldNamesType = FieldNames;

export type FilledFieldNamesType = Required<FieldNamesType>;

function highlightKeyword(str: string, lowerKeyword: string, prefixCls: string | undefined) {
  const cells = str
    .toLowerCase()
    .split(lowerKeyword)
    .reduce((list, cur, index) => (index === 0 ? [cur] : [...list, lowerKeyword, cur]), []);
  const fillCells: React.ReactNode[] = [];
  let start = 0;

  cells.forEach((cell, index) => {
    const end = start + cell.length;
    let originWorld: React.ReactNode = str.slice(start, end);
    start = end;

    if (index % 2 === 1) {
      originWorld = (
        <span className={`${prefixCls}-menu-item-keyword`} key="seperator">
          {originWorld}
        </span>
      );
    }

    fillCells.push(originWorld);
  });

  return fillCells;
}

const defaultSearchRender: ShowSearchType['render'] = (inputValue, path, prefixCls, fieldNames) => {
  const optionList: React.ReactNode[] = [];

  // We do lower here to save perf
  const lower = inputValue.toLowerCase();

  path.forEach((node, index) => {
    if (index !== 0) {
      optionList.push(' / ');
    }

    let label = (node as any)[fieldNames.label!];
    const type = typeof label;
    if (type === 'string' || type === 'number') {
      label = highlightKeyword(String(label), lower, prefixCls);
    }

    optionList.push(label);
  });
  return optionList;
};

export interface CascaderProps extends Omit<RcCascaderProps, 'checkable'> {
  multiple?: boolean;
  size?: SizeType;
  bordered?: boolean;
}

interface CascaderRef {
  focus: () => void;
  blur: () => void;
}

const Cascader = React.forwardRef((props: CascaderProps, ref: React.Ref<CascaderRef>) => {
  const {
    prefixCls: customizePrefixCls,
    size: customizeSize,
    className,
    multiple,
    bordered = true,
    transitionName,
    choiceTransitionName = '',
    dropdownClassName,
    expandIcon,
    showSearch,
    allowClear = true,
    notFoundContent,
    direction,
    ...rest
  } = props;

  const restProps = omit(rest, ['suffixIcon' as any]);

  const {
    // getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction: rootDirection,
    // virtual,
    // dropdownMatchSelectWidth,
  } = React.useContext(ConfigContext);

  const mergedDirection = direction || rootDirection;
  const isRtl = mergedDirection === 'rtl';

  // =================== No Found ====================
  const mergedNotFoundContent = notFoundContent || renderEmpty('Cascader');

  // ==================== Prefix =====================
  const rootPrefixCls = getPrefixCls();
  const prefixCls = getPrefixCls('select', customizePrefixCls);
  const cascaderPrefixCls = getPrefixCls('cascader', customizePrefixCls);

  // =================== Dropdown ====================
  const mergedDropdownClassName = classNames(dropdownClassName, `${cascaderPrefixCls}-dropdown`, {
    [`${cascaderPrefixCls}-dropdown-rtl`]: mergedDirection === 'rtl',
  });

  // ==================== Search =====================
  const mergedShowSearch = React.useMemo(() => {
    if (!showSearch) {
      return showSearch;
    }

    let searchConfig: ShowSearchType = {
      render: defaultSearchRender,
    };

    if (typeof showSearch === 'object') {
      searchConfig = {
        ...searchConfig,
        ...showSearch,
      };
    }

    return searchConfig;
  }, [showSearch]);

  // ===================== Size ======================
  const size = React.useContext(SizeContext);
  const mergedSize = customizeSize || size;

  // ===================== Icon ======================
  let mergedExpandIcon = expandIcon;
  if (!expandIcon) {
    mergedExpandIcon = isRtl ? <LeftOutlined /> : <RightOutlined />;
  }

  const loadingIcon = (
    <span className={`${prefixCls}-menu-item-loading-icon`}>
      <RedoOutlined spin />
    </span>
  );

  // =================== Multiple ====================
  const checkable = React.useMemo(
    () => (multiple ? <span className={`${cascaderPrefixCls}-checkbox-inner`} /> : false),
    [multiple],
  );

  // ===================== Icons =====================
  const { suffixIcon, removeIcon, clearIcon } = getIcons({
    ...props,
    multiple,
    prefixCls,
  });

  // ==================== Render =====================
  return (
    <RcCascader
      prefixCls={prefixCls}
      className={classNames(
        !customizePrefixCls && cascaderPrefixCls,
        {
          [`${prefixCls}-lg`]: mergedSize === 'large',
          [`${prefixCls}-sm`]: mergedSize === 'small',
          [`${prefixCls}-rtl`]: isRtl,
          [`${prefixCls}-borderless`]: !bordered,
        },
        className,
      )}
      {...(restProps as any)}
      direction={mergedDirection}
      notFoundContent={mergedNotFoundContent}
      allowClear={allowClear}
      showSearch={mergedShowSearch}
      expandIcon={mergedExpandIcon}
      inputIcon={suffixIcon}
      removeIcon={removeIcon}
      clearIcon={clearIcon}
      loadingIcon={loadingIcon}
      checkable={checkable}
      dropdownClassName={mergedDropdownClassName}
      dropdownPrefixCls={customizePrefixCls || cascaderPrefixCls}
      choiceTransitionName={getTransitionName(rootPrefixCls, '', choiceTransitionName)}
      transitionName={getTransitionName(rootPrefixCls, 'slide-up', transitionName)}
      ref={ref}
    />
  );
});

Cascader.displayName = 'Cascader';

export default Cascader;
