import LeftOutlined from '@ant-design/icons/LeftOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import classNames from 'classnames';
import type {
  BaseOptionType,
  DefaultOptionType,
  FieldNames,
  MultipleCascaderProps as RcMultipleCascaderProps,
  SingleCascaderProps as RcSingleCascaderProps,
  ShowSearchType,
} from 'rc-cascader';
import RcCascader from 'rc-cascader';
import type { Placement } from 'rc-select/lib/BaseSelect';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import genPurePanel from '../_util/PurePanel';
import type { SelectCommonPlacement } from '../_util/motion';
import { getTransitionDirection, getTransitionName } from '../_util/motion';
import type { InputStatus } from '../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import warning from '../_util/warning';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import type { SizeType } from '../config-provider/SizeContext';
import DefaultRenderEmpty from '../config-provider/defaultRenderEmpty';
import useSize from '../config-provider/hooks/useSize';
import { FormItemInputContext } from '../form/context';
import useSelectStyle from '../select/style';
import useBuiltinPlacements from '../select/useBuiltinPlacements';
import useShowArrow from '../select/useShowArrow';
import getIcons from '../select/utils/iconUtil';
import { useCompactItemContext } from '../space/Compact';
import useStyle from './style';

// Align the design since we use `rc-select` in root. This help:
// - List search content will show all content
// - Hover opacity style
// - Search filter match case

export { BaseOptionType, DefaultOptionType };

export type FieldNamesType = FieldNames;

export type FilledFieldNamesType = Required<FieldNamesType>;

const { SHOW_CHILD, SHOW_PARENT } = RcCascader;

function highlightKeyword(str: string, lowerKeyword: string, prefixCls?: string) {
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
        <span className={`${prefixCls}-menu-item-keyword`} key={`separator-${index}`}>
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

    let label = node[fieldNames.label!];
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

export type CascaderProps<DataNodeType = any> = UnionCascaderProps & {
  multiple?: boolean;
  size?: SizeType;
  disabled?: boolean;
  bordered?: boolean;
  placement?: SelectCommonPlacement;
  suffixIcon?: React.ReactNode;
  options?: DataNodeType[];
  status?: InputStatus;

  rootClassName?: string;
  popupClassName?: string;
  /** @deprecated Please use `popupClassName` instead */
  dropdownClassName?: string;
};

export interface CascaderRef {
  focus: () => void;
  blur: () => void;
}

const Cascader = React.forwardRef((props: CascaderProps<any>, ref: React.Ref<CascaderRef>) => {
  const {
    prefixCls: customizePrefixCls,
    size: customizeSize,
    disabled: customDisabled,
    className,
    rootClassName,
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
    builtinPlacements,
    ...rest
  } = props;

  const restProps = omit(rest, ['suffixIcon']);

  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction: rootDirection,
    popupOverflow,
  } = React.useContext(ConfigContext);

  const mergedDirection = direction || rootDirection;
  const isRtl = mergedDirection === 'rtl';

  // =================== Form =====================
  const {
    status: contextStatus,
    hasFeedback,
    isFormItemInput,
    feedbackIcon,
  } = React.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);

  // =================== Warning =====================
  if (process.env.NODE_ENV !== 'production') {
    warning(
      !dropdownClassName,
      'Cascader',
      '`dropdownClassName` is deprecated. Please use `popupClassName` instead.',
    );
  }

  // =================== No Found ====================
  const mergedNotFoundContent = notFoundContent || renderEmpty?.('Cascader') || (
    <DefaultRenderEmpty componentName="Cascader" />
  );

  // ==================== Prefix =====================
  const rootPrefixCls = getPrefixCls();
  const prefixCls = getPrefixCls('select', customizePrefixCls);
  const cascaderPrefixCls = getPrefixCls('cascader', customizePrefixCls);

  const [wrapSelectSSR, hashId] = useSelectStyle(prefixCls);
  const [wrapCascaderSSR] = useStyle(cascaderPrefixCls);

  const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
  // =================== Dropdown ====================
  const mergedDropdownClassName = classNames(
    popupClassName || dropdownClassName,
    `${cascaderPrefixCls}-dropdown`,
    {
      [`${cascaderPrefixCls}-dropdown-rtl`]: mergedDirection === 'rtl',
    },
    rootClassName,
    hashId,
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
  const mergedSize = useSize((ctx) => customizeSize ?? compactSize ?? ctx);

  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;

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
  const mergedShowArrow = useShowArrow(showArrow);
  const { suffixIcon, removeIcon, clearIcon } = getIcons({
    ...props,
    hasFeedback,
    feedbackIcon,
    showArrow: mergedShowArrow,
    multiple,
    prefixCls,
  });

  // ===================== Placement =====================
  const memoPlacement = React.useMemo<Placement>(() => {
    if (placement !== undefined) {
      return placement;
    }
    return isRtl ? 'bottomRight' : 'bottomLeft';
  }, [placement, isRtl]);

  const mergedBuiltinPlacements = useBuiltinPlacements(builtinPlacements, popupOverflow);

  // ==================== Render =====================
  const renderNode = (
    <RcCascader
      prefixCls={prefixCls}
      className={classNames(
        !customizePrefixCls && cascaderPrefixCls,
        {
          [`${prefixCls}-lg`]: mergedSize === 'large',
          [`${prefixCls}-sm`]: mergedSize === 'small',
          [`${prefixCls}-rtl`]: isRtl,
          [`${prefixCls}-borderless`]: !bordered,
          [`${prefixCls}-in-form-item`]: isFormItemInput,
        },
        getStatusClassNames(prefixCls, mergedStatus, hasFeedback),
        compactItemClassnames,
        className,
        rootClassName,
        hashId,
      )}
      disabled={mergedDisabled}
      {...(restProps as any)}
      builtinPlacements={mergedBuiltinPlacements}
      direction={mergedDirection}
      placement={memoPlacement}
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
      showArrow={hasFeedback || mergedShowArrow}
    />
  );

  return wrapCascaderSSR(wrapSelectSSR(renderNode));
}) as unknown as (<OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType>(
  props: React.PropsWithChildren<CascaderProps<OptionType>> & { ref?: React.Ref<CascaderRef> },
) => React.ReactElement) & {
  displayName: string;
  SHOW_PARENT: typeof SHOW_PARENT;
  SHOW_CHILD: typeof SHOW_CHILD;
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};
if (process.env.NODE_ENV !== 'production') {
  Cascader.displayName = 'Cascader';
}

// We don't care debug panel
/* istanbul ignore next */
const PurePanel = genPurePanel(Cascader);

Cascader.SHOW_PARENT = SHOW_PARENT;
Cascader.SHOW_CHILD = SHOW_CHILD;
Cascader._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default Cascader;
