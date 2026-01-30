import * as React from 'react';
import type { BaseSelectRef } from '@rc-component/select';
import { omit, toArray } from '@rc-component/util';
import { clsx } from 'clsx';

import type { SemanticType } from '../_util/hooks';
import { useMergeSemantic } from '../_util/hooks';
import type { InputStatus } from '../_util/statusUtils';
import { devUseWarning } from '../_util/warning';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import type {
  BaseOptionType,
  DefaultOptionType,
  InternalSelectProps,
  RefSelectProps,
  SelectPopupSemanticClassNames,
  SelectPopupSemanticStyles,
  SelectProps,
} from '../select';
import Select from '../select';

export type AutoCompleteSemanticType = {
  classNames: {
    root?: string;
    prefix?: string;
    input?: string;
    placeholder?: string;
    content?: string;
    popup?: SelectPopupSemanticClassNames;
  };
  styles: {
    root?: React.CSSProperties;
    prefix?: React.CSSProperties;
    input?: React.CSSProperties;
    placeholder?: React.CSSProperties;
    content?: React.CSSProperties;
    popup?: SelectPopupSemanticStyles;
  };
};

const { Option } = Select;

export interface DataSourceItemObject {
  value: string;
  text: string;
}

export type DataSourceItemType = DataSourceItemObject | React.ReactNode;

export type AutoCompleteClassNamesType = SemanticType<
  AutoCompleteProps,
  AutoCompleteSemanticType['classNames']
>;
export type AutoCompleteStylesType = SemanticType<
  AutoCompleteProps,
  AutoCompleteSemanticType['styles']
>;

export interface AutoCompleteProps<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> extends Omit<
    InternalSelectProps<ValueType, OptionType>,
    'loading' | 'mode' | 'optionLabelProp' | 'labelInValue'
  > {
  /** @deprecated Please use `options` instead */
  dataSource?: DataSourceItemType[];
  status?: InputStatus;
  /** @deprecated Please use `classNames.popup.root` instead */
  popupClassName?: string;
  /** @deprecated Please use `classNames.popup.root` instead */
  dropdownClassName?: string;
  /** @deprecated Please use `popupMatchSelectWidth` instead */
  dropdownMatchSelectWidth?: boolean | number;
  popupMatchSelectWidth?: boolean | number;
  styles?: AutoCompleteStylesType;
  // classNames?: AutoCompleteClassNamesType;
  /** @deprecated Please use `popupRender` instead */
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
  popupRender?: (menu: React.ReactElement) => React.ReactElement;
  /** @deprecated Please use `styles.popup.root` instead */
  dropdownStyle?: React.CSSProperties;
  /** @deprecated Please use `onOpenChange` instead */
  onDropdownVisibleChange?: (visible: boolean) => void;
  onOpenChange?: (visible: boolean) => void;
}

function isSelectOptionOrSelectOptGroup(child: any): boolean {
  return child?.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
}

const AutoComplete: React.ForwardRefRenderFunction<RefSelectProps, AutoCompleteProps> = (
  props,
  ref,
) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    popupClassName,
    dropdownClassName,
    children,
    dataSource,
    rootClassName,
    dropdownStyle,
    dropdownRender,
    popupRender,
    onDropdownVisibleChange,
    onOpenChange,
    styles,
    classNames,
  } = props;
  const childNodes: React.ReactElement[] = toArray(children);

  const mergedPopupRender = popupRender || dropdownRender;
  const mergedOnOpenChange = onOpenChange || onDropdownVisibleChange;

  // ============================= Input =============================
  let customizeInput: React.ReactElement | undefined;

  if (
    childNodes.length === 1 &&
    React.isValidElement(childNodes[0]) &&
    !isSelectOptionOrSelectOptGroup(childNodes[0])
  ) {
    [customizeInput] = childNodes;
  }

  const getInputElement = customizeInput ? (): React.ReactElement => customizeInput! : undefined;

  // ============================ Options ============================
  let optionChildren: React.ReactNode;

  // [Legacy] convert `children` or `dataSource` into option children
  if (childNodes.length && isSelectOptionOrSelectOptGroup(childNodes[0])) {
    optionChildren = children;
  } else {
    optionChildren = dataSource
      ? dataSource.map((item) => {
          if (React.isValidElement(item)) {
            return item;
          }
          switch (typeof item) {
            case 'string':
              return (
                <Option key={item} value={item}>
                  {item}
                </Option>
              );
            case 'object': {
              const { value: optionValue } = item as DataSourceItemObject;
              return (
                <Option key={optionValue} value={optionValue}>
                  {(item as DataSourceItemObject).text}
                </Option>
              );
            }
            default:
              return undefined;
          }
        })
      : [];
  }
  // ====================== Warning ======================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('AutoComplete');

    warning(
      !customizeInput || !('size' in props),
      'usage',
      'You need to control style self instead of setting `size` when using customize input.',
    );

    const deprecatedProps = {
      dropdownMatchSelectWidth: 'popupMatchSelectWidth',
      dropdownStyle: 'styles.popup.root',
      dropdownClassName: 'classNames.popup.root',
      popupClassName: 'classNames.popup.root',
      dropdownRender: 'popupRender',
      onDropdownVisibleChange: 'onOpenChange',
      dataSource: 'options',
    };

    Object.entries(deprecatedProps).forEach(([oldProp, newProp]) => {
      warning.deprecated(!(oldProp in props), oldProp, newProp);
    });
  }

  const { getPrefixCls } = React.useContext<ConfigConsumerProps>(ConfigContext);

  const prefixCls = getPrefixCls('select', customizePrefixCls);

  // =========== Merged Props for Semantic ===========
  const mergedProps: AutoCompleteProps = {
    ...props,
    dataSource,
    status: props.status,
    popupMatchSelectWidth: props.popupMatchSelectWidth || props.dropdownMatchSelectWidth,
    popupRender: mergedPopupRender,
    onOpenChange: mergedOnOpenChange,
  };

  // ========================= Style ==========================
  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    AutoCompleteClassNamesType,
    AutoCompleteStylesType,
    AutoCompleteProps
  >(
    [classNames],
    [styles],
    {
      props: mergedProps,
    },
    {
      popup: {
        _default: 'root',
      },
    },
  );

  const finalClassNames = React.useMemo(
    () => ({
      root: clsx(`${prefixCls}-auto-complete`, className, rootClassName, mergedClassNames.root, {
        [`${prefixCls}-customize`]: customizeInput,
      }),
      prefix: mergedClassNames.prefix,
      input: mergedClassNames.input,
      placeholder: mergedClassNames.placeholder,
      content: mergedClassNames.content,
      popup: {
        root: clsx(popupClassName, dropdownClassName, mergedClassNames.popup?.root),
        list: mergedClassNames.popup?.list,
        listItem: mergedClassNames.popup?.listItem,
      },
    }),
    [prefixCls, className, rootClassName, mergedClassNames, popupClassName, dropdownClassName],
  );

  const finalStyles = React.useMemo(
    () => ({
      root: { ...mergedStyles.root, ...style },
      input: mergedStyles.input,
      prefix: mergedStyles.prefix,
      placeholder: mergedStyles.placeholder,
      content: mergedStyles.content,
      popup: {
        root: { ...dropdownStyle, ...mergedStyles.popup?.root },
        list: mergedStyles.popup?.list,
        listItem: mergedStyles.popup?.listItem,
      },
    }),
    [mergedStyles, style, dropdownStyle],
  );

  return (
    <Select
      ref={ref}
      suffixIcon={null}
      {...omit(props, ['dataSource', 'dropdownClassName', 'popupClassName'])}
      prefixCls={prefixCls}
      classNames={finalClassNames}
      styles={finalStyles}
      mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE as SelectProps['mode']}
      popupRender={mergedPopupRender}
      onPopupVisibleChange={mergedOnOpenChange}
      {...{
        // Internal api
        getInputElement,
      }}
    >
      {optionChildren}
    </Select>
  );
};

const RefAutoComplete = React.forwardRef<RefSelectProps, AutoCompleteProps>(
  AutoComplete,
) as unknown as (<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>(
  props: React.PropsWithChildren<AutoCompleteProps<ValueType, OptionType>> &
    React.RefAttributes<BaseSelectRef>,
) => React.ReactElement) & {
  displayName?: string;
};

if (process.env.NODE_ENV !== 'production') {
  RefAutoComplete.displayName = 'AutoComplete';
}

export default RefAutoComplete;
