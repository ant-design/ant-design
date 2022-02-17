import * as React from 'react';
import classNames from 'classnames';
import RcCascader from 'rc-cascader';
import type {
  SingleCascaderProps as RcSingleCascaderProps,
  MultipleCascaderProps as RcMultipleCascaderProps,
  ShowSearchType,
  FieldNames,
  BaseOptionType,
  DefaultOptionType,
} from 'rc-cascader';
import omit from 'rc-util/lib/omit';
import RightOutlined from '@ant-design/icons/RightOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import { useContext } from 'react';
import devWarning from '../_util/devWarning';
import { ConfigContext } from '../config-provider';
import type { SizeType } from '../config-provider/SizeContext';
import SizeContext from '../config-provider/SizeContext';
import getIcons from '../select/utils/iconUtil';
import { getTransitionName, getTransitionDirection, SelectCommonPlacement } from '../_util/motion';
import { FormItemStatusContext } from '../form/context';
import { getMergedStatus, getStatusClassNames, InputStatus } from '../_util/statusUtils';

// Align the design since we use `rc-select` in root. This help:
// - List search content will show all content
// - Hover opacity style
// - Search filter match case

export { BaseOptionType, DefaultOptionType };

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
        // eslint-disable-next-line react/no-array-index-key
        <span className={`${prefixCls}-menu-item-keyword`} key={`seperator-${index}`}>
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

type SingleCascaderProps = Omit<RcSingleCascaderProps, 'checkable' | 'options'> & {
  multiple?: false;
};
type MultipleCascaderProps = Omit<RcMultipleCascaderProps, 'checkable' | 'options'> & {
  multiple: true;
};

type UnionCascaderProps = SingleCascaderProps | MultipleCascaderProps;

export type CascaderProps<DataNodeType> = UnionCascaderProps & {
  multiple?: boolean;
  size?: SizeType;
  bordered?: boolean;
  placement?: SelectCommonPlacement;
  suffixIcon?: React.ReactNode;
  options?: DataNodeType[];
  status?: InputStatus;
};

export interface CascaderRef {
  focus: () => void;
  blur: () => void;
}

const Cascader = React.forwardRef((props: CascaderProps<any>, ref: React.Ref<CascaderRef>) => {
  const {
    prefixCls: customizePrefixCls,
    size: customizeSize,
    className,
    multiple,
    bordered = true,
    transitionName,
    choiceTransitionName = '',
    popupClassName,
    dropdownClassName,
    expandIcon,
    placement,
    showSearch,
    allowClear = true,
    notFoundContent,
    direction,
    getPopupContainer,
    status: customStatus,
    showArrow,
    ...rest
  } = props;

  const restProps = omit(rest, ['suffixIcon' as any]);

  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction: rootDirection,
    // virtual,
    // dropdownMatchSelectWidth,
  } = useContext(ConfigContext);

  const mergedDirection = direction || rootDirection;
  const isRtl = mergedDirection === 'rtl';

  // =================== Status =====================
  const { status: contextStatus, hasFeedback } = useContext(FormItemStatusContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);

  // =================== Warning =====================
  if (process.env.NODE_ENV !== 'production') {
    devWarning(
      popupClassName === undefined,
      'Cascader',
      '`popupClassName` is deprecated. Please use `dropdownClassName` instead.',
    );

    devWarning(
      !multiple || !props.displayRender,
      'Cascader',
      '`displayRender` not work on `multiple`. Please use `tagRender` instead.',
    );
  }

  // =================== No Found ====================
  const mergedNotFoundContent = notFoundContent || renderEmpty('Cascader');

  // ==================== Prefix =====================
  const rootPrefixCls = getPrefixCls();
  const prefixCls = getPrefixCls('select', customizePrefixCls);
  const cascaderPrefixCls = getPrefixCls('cascader', customizePrefixCls);

  // =================== Dropdown ====================
  const mergedDropdownClassName = classNames(
    dropdownClassName || popupClassName,
    `${cascaderPrefixCls}-dropdown`,
    {
      [`${cascaderPrefixCls}-dropdown-rtl`]: mergedDirection === 'rtl',
    },
  );

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
      <LoadingOutlined spin />
    </span>
  );

  // =================== Multiple ====================
  const checkable = React.useMemo(
    () => (multiple ? <span className={`${cascaderPrefixCls}-checkbox-inner`} /> : false),
    [multiple],
  );

  // ===================== Icons =====================
  const mergedShowArrow = showArrow !== undefined ? showArrow : props.loading || !multiple;
  const { suffixIcon, removeIcon, clearIcon } = getIcons({
    ...props,
    status: mergedStatus,
    hasFeedback,
    showArrow: mergedShowArrow,
    multiple,
    prefixCls,
  });

  // ===================== Placement =====================
  const getPlacement = () => {
    if (placement !== undefined) {
      return placement;
    }
    return direction === 'rtl'
      ? ('bottomRight' as SelectCommonPlacement)
      : ('bottomLeft' as SelectCommonPlacement);
  };

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
        getStatusClassNames(prefixCls, mergedStatus, hasFeedback),
        className,
      )}
      {...(restProps as any)}
      direction={mergedDirection}
      placement={getPlacement()}
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
      transitionName={getTransitionName(
        rootPrefixCls,
        getTransitionDirection(placement),
        transitionName,
      )}
      getPopupContainer={getPopupContainer || getContextPopupContainer}
      ref={ref}
      showArrow={hasFeedback || showArrow}
    />
  );
}) as (<OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType>(
  props: React.PropsWithChildren<CascaderProps<OptionType>> & { ref?: React.Ref<CascaderRef> },
) => React.ReactElement) & {
  displayName: string;
};

Cascader.displayName = 'Cascader';

export default Cascader;
