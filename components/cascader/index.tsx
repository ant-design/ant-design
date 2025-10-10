import * as React from 'react';
import type {
  BaseOptionType,
  DefaultOptionType,
  FieldNames,
  CascaderProps as RcCascaderProps,
  SearchConfig,
} from '@rc-component/cascader';
import RcCascader from '@rc-component/cascader';
import type { Placement } from '@rc-component/select/lib/BaseSelect';
import { omit } from '@rc-component/util';
import { clsx } from 'clsx';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import type {
  SemanticClassNames,
  SemanticClassNamesType,
  SemanticStyles,
  SemanticStylesType,
} from '../_util/hooks/useMergeSemantic';
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

// Align the design since we use `@rc-component/select` in root. This help:
// - List search content will show all content
// - Hover opacity style
// - Search filter match case

export type { BaseOptionType, DefaultOptionType };

export type FieldNamesType = FieldNames;

export type FilledFieldNamesType = Required<FieldNamesType>;

type SemanticName = 'root' | 'prefix' | 'suffix';
type PopupSemantic = 'root' | 'listItem' | 'list';

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

const defaultSearchRender: SearchConfig['render'] = (inputValue, path, prefixCls, fieldNames) => {
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

export type CascaderClassNamesType = SemanticClassNamesType<
  CascaderProps,
  SemanticName,
  { popup?: SemanticClassNames<PopupSemantic> }
>;

export type CascaderStylesType = SemanticStylesType<
  CascaderProps,
  SemanticName,
  { popup?: SemanticStyles<PopupSemantic> }
>;

export interface CascaderProps<
  OptionType extends DefaultOptionType = DefaultOptionType,
  ValueField extends keyof OptionType = keyof OptionType,
  Multiple extends boolean = boolean,
> extends Omit<
    RcCascaderProps<OptionType, ValueField, Multiple>,
    'checkable' | 'classNames' | 'styles'
  > {
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
  /** @deprecated Please use `onOpenChange` instead */
  onPopupVisibleChange?: (visible: boolean) => void;
  onOpenChange?: (visible: boolean) => void;
  /**
   * @since 5.13.0
   * @default "outlined"
   */
  variant?: Variant;
  classNames?: CascaderClassNamesType;
  styles?: CascaderStylesType;
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
    dropdownClassName,
    dropdownRender,
    onDropdownVisibleChange,
    onPopupVisibleChange,
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
      onPopupVisibleChange: 'onOpenChange',
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
  const [hashId, cssVarCls] = useSelectStyle(prefixCls, rootCls);
  const cascaderRootCls = useCSSVarCls(cascaderPrefixCls);
  useStyle(cascaderPrefixCls, cascaderRootCls);

  const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);

  const [variant, enableVariantCls] = useVariant('cascader', customVariant, bordered);

  // =================== No Found ====================
  const mergedNotFoundContent = notFoundContent || renderEmpty?.('Cascader') || (
    <DefaultRenderEmpty componentName="Cascader" />
  );

  const mergedPopupRender = usePopupRender(popupRender || dropdownRender);

  const mergedPopupMenuColumnStyle = popupMenuColumnStyle || dropdownMenuColumnStyle;

  const mergedOnOpenChange = onOpenChange || onPopupVisibleChange || onDropdownVisibleChange;

  // ==================== Search =====================
  const mergedShowSearch = React.useMemo(() => {
    if (!showSearch) {
      return showSearch;
    }

    let searchConfig: SearchConfig = {
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

  // =========== Merged Props for Semantic ==========
  const mergedProps: CascaderProps<any> = {
    ...props,
    variant,
    size: mergedSize,
    status: mergedStatus,
    disabled: mergedDisabled,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    CascaderClassNamesType,
    CascaderStylesType,
    CascaderProps<any>
  >(
    [contextClassNames, classNames],
    [contextStyles, styles],
    { props: mergedProps },
    {
      popup: {
        _default: 'root',
      },
    },
  );

  // =================== Dropdown ====================
  const mergedPopupStyle = { ...mergedStyles.popup?.root, ...dropdownStyle };

  // ============================ zIndex ============================
  const [zIndex] = useZIndex('SelectLike', mergedPopupStyle?.zIndex as number);

  const mergedPopupClassName = clsx(
    popupClassName || dropdownClassName,
    `${cascaderPrefixCls}-dropdown`,
    {
      [`${cascaderPrefixCls}-dropdown-rtl`]: mergedDirection === 'rtl',
    },
    rootClassName,
    rootCls,
    mergedClassNames.popup?.root,
    cascaderRootCls,
    hashId,
    cssVarCls,
  );

  // ==================== Render =====================
  return (
    <RcCascader
      prefixCls={prefixCls}
      className={clsx(
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
        mergedClassNames.root,
        rootCls,
        cascaderRootCls,
        hashId,
        cssVarCls,
      )}
      disabled={mergedDisabled}
      style={{ ...mergedStyles.root, ...contextStyle, ...style }}
      classNames={mergedClassNames}
      styles={mergedStyles}
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
      popupClassName={mergedPopupClassName}
      popupPrefixCls={customizePrefixCls || cascaderPrefixCls}
      popupStyle={{ ...mergedPopupStyle, zIndex }}
      popupRender={mergedPopupRender}
      popupMenuColumnStyle={mergedPopupMenuColumnStyle}
      onPopupVisibleChange={mergedOnOpenChange}
      choiceTransitionName={getTransitionName(rootPrefixCls, '', choiceTransitionName)}
      transitionName={getTransitionName(rootPrefixCls, 'slide-up', transitionName)}
      getPopupContainer={getPopupContainer || getContextPopupContainer}
      ref={ref}
    />
  );
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
const PurePanel = genPurePanel(Cascader, 'popupAlign', (props: any) => omit(props, ['visible']));

Cascader.SHOW_PARENT = SHOW_PARENT;
Cascader.SHOW_CHILD = SHOW_CHILD;
Cascader.Panel = CascaderPanel;
Cascader._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default Cascader;
