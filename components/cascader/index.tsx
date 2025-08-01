import * as React from 'react';
import cls from 'classnames';
import type {
  BaseOptionType,
  DefaultOptionType,
  FieldNames,
  CascaderProps as RcCascaderProps,
  ShowSearchType,
} from 'rc-cascader';
import RcCascader from 'rc-cascader';
import type { Placement } from 'rc-select/lib/BaseSelect';
import omit from 'rc-util/lib/omit';

import { useZIndex } from '../_util/hooks/useZIndex';
import type { SelectCommonPlacement } from '../_util/motion';
import { getTransitionName } from '../_util/motion';
import genPurePanel from '../_util/PurePanel';
import type { InputStatus } from '../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import type { Variant } from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
import DefaultRenderEmpty from '../config-provider/defaultRenderEmpty';
import DisabledContext from '../config-provider/DisabledContext';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import { FormItemInputContext } from '../form/context';
import useVariant from '../form/hooks/useVariants';
import mergedBuiltinPlacements from '../select/mergedBuiltinPlacements';
import useSelectStyle from '../select/style';
import useIcons from '../select/useIcons';
import usePopupRender from '../select/usePopupRender';
import useShowArrow from '../select/useShowArrow';
import { useCompactItemContext } from '../space/Compact';
import useBase from './hooks/useBase';
import useCheckable from './hooks/useCheckable';
import useColumnIcons from './hooks/useColumnIcons';
import CascaderPanel from './Panel';
import useStyle from './style';

// Align the design since we use `rc-select` in root. This help:
// - List search content will show all content
// - Hover opacity style
// - Search filter match case

export type { BaseOptionType, DefaultOptionType };

export type FieldNamesType = FieldNames;

export type FilledFieldNamesType = Required<FieldNamesType>;

type SemanticName = 'root';
type PopupSemantic = 'root';

const { SHOW_CHILD, SHOW_PARENT } = RcCascader;

function highlightKeyword(str: string, lowerKeyword: string, prefixCls?: string) {
  const cells = str
    .toLowerCase()
    .split(lowerKeyword)
    .reduce<string[]>(
      (list, cur, index) => (index === 0 ? [cur] : [...list, lowerKeyword, cur]),
      [],
    );
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

export interface CascaderProps<
  OptionType extends DefaultOptionType = DefaultOptionType,
  ValueField extends keyof OptionType = keyof OptionType,
  Multiple extends boolean = boolean,
> extends Omit<RcCascaderProps<OptionType, ValueField, Multiple>, 'checkable'> {
  multiple?: Multiple;
  size?: SizeType;
  /**
   * @deprecated `showArrow` is deprecated which will be removed in next major version. It will be a
   *   default behavior, you can hide it by setting `suffixIcon` to null.
   */
  showArrow?: boolean;
  disabled?: boolean;
  /** @deprecated Use `variant` instead. */
  bordered?: boolean;
  placement?: SelectCommonPlacement;
  suffixIcon?: React.ReactNode;
  options?: OptionType[];
  status?: InputStatus;
  autoClearSearchValue?: boolean;

  rootClassName?: string;
  /** @deprecated Please use `classNames.popup.root` instead */
  popupClassName?: string;
  /** @deprecated Please use `classNames.popup.root` instead */
  dropdownClassName?: string;
  /** @deprecated Please use `styles.popup.root` instead */
  dropdownStyle?: React.CSSProperties;
  /** @deprecated Please use `popupRender` instead */
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
  popupRender?: (menu: React.ReactElement) => React.ReactElement;
  /** @deprecated Please use `popupMenuColumnStyle` instead */
  dropdownMenuColumnStyle?: React.CSSProperties;
  popupMenuColumnStyle?: React.CSSProperties;
  /** @deprecated Please use `onOpenChange` instead */
  onDropdownVisibleChange?: (visible: boolean) => void;
  onOpenChange?: (visible: boolean) => void;
  /**
   * @since 5.13.0
   * @default "outlined"
   */
  variant?: Variant;
  classNames?: Partial<Record<SemanticName, string>> & {
    popup?: Partial<Record<PopupSemantic, string>>;
  };
  styles?: Partial<Record<SemanticName, React.CSSProperties>> & {
    popup?: Partial<Record<PopupSemantic, React.CSSProperties>>;
  };
}
export type CascaderAutoProps<
  OptionType extends DefaultOptionType = DefaultOptionType,
  ValueField extends keyof OptionType = keyof OptionType,
> =
  | (CascaderProps<OptionType, ValueField> & { multiple?: false })
  | (CascaderProps<OptionType, ValueField, true> & { multiple: true });

export interface CascaderRef {
  focus: () => void;
  blur: () => void;
}

const Cascader = React.forwardRef<CascaderRef, CascaderProps<any>>((props, ref) => {
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
    style,
    variant: customVariant,
    dropdownRender,
    onDropdownVisibleChange,
    dropdownMenuColumnStyle,
    popupRender,
    dropdownStyle,
    popupMenuColumnStyle,
    onOpenChange,
    styles,
    classNames,
    ...rest
  } = props;

  const restProps = omit(rest, ['suffixIcon']);

  const {
    getPrefixCls,
    getPopupContainer: getContextPopupContainer,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('cascader');

  const { popupOverflow } = React.useContext(ConfigContext);

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
    const warning = devUseWarning('Cascader');

    // v5 deprecated dropdown api
    const deprecatedProps = {
      dropdownClassName: 'classNames.popup.root',
      dropdownStyle: 'styles.popup.root',
      dropdownRender: 'popupRender',
      dropdownMenuColumnStyle: 'popupMenuColumnStyle',
      onDropdownVisibleChange: 'onOpenChange',
      bordered: 'variant',
    };

    Object.entries(deprecatedProps).forEach(([oldProp, newProp]) => {
      warning.deprecated(!(oldProp in props), oldProp, newProp);
    });

    warning(
      !('showArrow' in props),
      'deprecated',
      '`showArrow` is deprecated which will be removed in next major version. It will be a default behavior, you can hide it by setting `suffixIcon` to null.',
    );
  }

  // ==================== Prefix =====================
  const [prefixCls, cascaderPrefixCls, mergedDirection, renderEmpty] = useBase(
    customizePrefixCls,
    direction,
  );
  const isRtl = mergedDirection === 'rtl';

  const rootPrefixCls = getPrefixCls();

  const rootCls = useCSSVarCls(prefixCls);
  const [wrapSelectCSSVar, hashId, cssVarCls] = useSelectStyle(prefixCls, rootCls);
  const cascaderRootCls = useCSSVarCls(cascaderPrefixCls);
  const [wrapCascaderCSSVar] = useStyle(cascaderPrefixCls, cascaderRootCls);

  const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);

  const [variant, enableVariantCls] = useVariant('cascader', customVariant, bordered);

  // =================== No Found ====================
  const mergedNotFoundContent = notFoundContent || renderEmpty?.('Cascader') || (
    <DefaultRenderEmpty componentName="Cascader" />
  );

  // =================== Dropdown ====================
  const mergedPopupClassName = cls(
    classNames?.popup?.root || contextClassNames.popup?.root || popupClassName || dropdownClassName,
    `${cascaderPrefixCls}-dropdown`,
    {
      [`${cascaderPrefixCls}-dropdown-rtl`]: mergedDirection === 'rtl',
    },
    rootClassName,
    rootCls,
    contextClassNames.root,
    classNames?.root,
    cascaderRootCls,
    hashId,
    cssVarCls,
  );

  const mergedPopupRender = usePopupRender(popupRender || dropdownRender);

  const mergedPopupMenuColumnStyle = popupMenuColumnStyle || dropdownMenuColumnStyle;
  const mergedOnOpenChange = onOpenChange || onDropdownVisibleChange;
  const mergedPopupStyle = styles?.popup?.root || contextStyles.popup?.root || dropdownStyle;

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
  const [mergedExpandIcon, loadingIcon] = useColumnIcons(prefixCls, isRtl, expandIcon);

  // =================== Multiple ====================
  const checkable = useCheckable(cascaderPrefixCls, multiple);

  // ===================== Icons =====================
  const showSuffixIcon = useShowArrow(props.suffixIcon, showArrow);
  const { suffixIcon, removeIcon, clearIcon } = useIcons({
    ...props,
    hasFeedback,
    feedbackIcon,
    showSuffixIcon,
    multiple,
    prefixCls,
    componentName: 'Cascader',
  });

  // ===================== Placement =====================
  const memoPlacement = React.useMemo<Placement>(() => {
    if (placement !== undefined) {
      return placement;
    }
    return isRtl ? 'bottomRight' : 'bottomLeft';
  }, [placement, isRtl]);

  const mergedAllowClear = allowClear === true ? { clearIcon } : allowClear;

  // ============================ zIndex ============================
  const [zIndex] = useZIndex('SelectLike', mergedPopupStyle?.zIndex as number);

  // ==================== Render =====================
  const renderNode = (
    <RcCascader
      prefixCls={prefixCls}
      className={cls(
        !customizePrefixCls && cascaderPrefixCls,
        {
          [`${prefixCls}-lg`]: mergedSize === 'large',
          [`${prefixCls}-sm`]: mergedSize === 'small',
          [`${prefixCls}-rtl`]: isRtl,
          [`${prefixCls}-${variant}`]: enableVariantCls,
          [`${prefixCls}-in-form-item`]: isFormItemInput,
        },
        getStatusClassNames(prefixCls, mergedStatus, hasFeedback),
        compactItemClassnames,
        contextClassName,
        className,
        rootClassName,
        classNames?.root,
        contextClassNames.root,
        rootCls,
        cascaderRootCls,
        hashId,
        cssVarCls,
      )}
      disabled={mergedDisabled}
      style={{ ...contextStyles.root, ...styles?.root, ...contextStyle, ...style }}
      {...(restProps as any)}
      builtinPlacements={mergedBuiltinPlacements(builtinPlacements, popupOverflow)}
      direction={mergedDirection}
      placement={memoPlacement}
      notFoundContent={mergedNotFoundContent}
      allowClear={mergedAllowClear}
      showSearch={mergedShowSearch}
      expandIcon={mergedExpandIcon}
      suffixIcon={suffixIcon}
      removeIcon={removeIcon}
      loadingIcon={loadingIcon}
      checkable={checkable}
      dropdownClassName={mergedPopupClassName}
      dropdownPrefixCls={customizePrefixCls || cascaderPrefixCls}
      dropdownStyle={{ ...mergedPopupStyle, zIndex }}
      dropdownRender={mergedPopupRender}
      dropdownMenuColumnStyle={mergedPopupMenuColumnStyle}
      onOpenChange={mergedOnOpenChange}
      choiceTransitionName={getTransitionName(rootPrefixCls, '', choiceTransitionName)}
      transitionName={getTransitionName(rootPrefixCls, 'slide-up', transitionName)}
      getPopupContainer={getPopupContainer || getContextPopupContainer}
      ref={ref}
    />
  );

  return wrapCascaderCSSVar(wrapSelectCSSVar(renderNode));
}) as unknown as (<
  OptionType extends DefaultOptionType = DefaultOptionType,
  ValueField extends keyof OptionType = keyof OptionType,
>(
  props: React.PropsWithChildren<CascaderAutoProps<OptionType, ValueField>> &
    React.RefAttributes<CascaderRef>,
) => React.ReactElement) & {
  displayName: string;
  SHOW_PARENT: typeof SHOW_PARENT;
  SHOW_CHILD: typeof SHOW_CHILD;
  Panel: typeof CascaderPanel;
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};
if (process.env.NODE_ENV !== 'production') {
  Cascader.displayName = 'Cascader';
}

// We don't care debug panel
/* istanbul ignore next */
const PurePanel = genPurePanel(Cascader, 'dropdownAlign', (props: any) => omit(props, ['visible']));

Cascader.SHOW_PARENT = SHOW_PARENT;
Cascader.SHOW_CHILD = SHOW_CHILD;
Cascader.Panel = CascaderPanel;
Cascader._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default Cascader;
