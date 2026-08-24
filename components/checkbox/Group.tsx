import * as React from 'react';
import { omit } from '@rc-component/util';
import { clsx } from 'clsx';

import type { HTMLAriaDataAttributes } from '../_util/aria-data-attrs';
import { useMergeSemantic, useSemanticRootStyle } from '../_util/hooks/useMergeSemantic';
import type { GenerateSemantic } from '../_util/hooks/useMergeSemantic/semanticType';
import { isNonNullable, isNumber, isString } from '../_util/is';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { CheckboxChangeEvent } from './Checkbox';
import Checkbox from './Checkbox';
import type { CheckboxGroupContext } from './GroupContext';
import GroupContext from './GroupContext';
import useStyle from './style';

export interface CheckboxOptionType<T = any> {
  label: React.ReactNode;
  value: T;
  style?: React.CSSProperties;
  className?: string; // 👈 5.25.0+
  disabled?: boolean;
  title?: string;
  id?: string;
  onChange?: (e: CheckboxChangeEvent) => void;
  required?: boolean;
}

export interface AbstractCheckboxGroupProps<T = any> extends HTMLAriaDataAttributes {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  options?: (CheckboxOptionType<T> | string | number)[];
  disabled?: boolean;
  style?: React.CSSProperties;
}

export type CheckboxGroupSemanticType = {
  classNames?: {
    root?: string;
    item?: string;
    itemIcon?: string;
    itemLabel?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    item?: React.CSSProperties;
    itemIcon?: React.CSSProperties;
    itemLabel?: React.CSSProperties;
  };
};

export type CheckboxGroupSemanticAllType<T = any> = GenerateSemantic<
  CheckboxGroupSemanticType,
  CheckboxGroupProps<T>
>;

export interface CheckboxGroupProps<T = any> extends AbstractCheckboxGroupProps<T> {
  name?: string;
  defaultValue?: T[];
  value?: T[];
  onChange?: (checkedValue: T[]) => void;
  children?: React.ReactNode;
  classNames?: CheckboxGroupSemanticAllType<T>['classNamesAndFn'];
  styles?: CheckboxGroupSemanticAllType<T>['stylesAndFn'];
}

type InternalCheckboxValueType = string | number | boolean;

const CheckboxGroup = React.forwardRef(
  <T extends InternalCheckboxValueType = InternalCheckboxValueType>(
    props: CheckboxGroupProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const {
      defaultValue,
      children,
      options = [],
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      classNames,
      styles,
      style,
      onChange,
      role = 'group',
      ...restProps
    } = props;
    const { getPrefixCls, direction } = React.useContext(ConfigContext);
    const contextDisabled = React.useContext(DisabledContext);
    const mergedDisabled = restProps.disabled ?? contextDisabled;

    const [value, setValue] = React.useState<T[]>(restProps.value || defaultValue || []);
    const [registeredValues, setRegisteredValues] = React.useState<T[]>([]);

    React.useEffect(() => {
      if ('value' in restProps) {
        setValue(restProps.value || []);
      }
    }, [restProps.value]);

    const memoizedOptions = React.useMemo(() => {
      return options
        .map((option) => {
          if (isString(option) || isNumber(option)) {
            return { label: option, value: option };
          }
          return option;
        })
        .filter(
          (item): item is CheckboxOptionType<T> => isNonNullable(item) && isNonNullable(item.value),
        );
    }, [options]);

    const cancelValue = (val: T) => {
      setRegisteredValues((prevValues) => prevValues.filter((v) => v !== val));
    };

    const registerValue: CheckboxGroupContext<T>['registerValue'] = (val) => {
      setRegisteredValues((prevValues) => [...prevValues, val]);
    };

    const toggleOption: CheckboxGroupContext<T>['toggleOption'] = (option) => {
      const optionIndex = value.indexOf(option.value);
      const newValue = [...value];
      if (optionIndex === -1) {
        newValue.push(option.value);
      } else {
        newValue.splice(optionIndex, 1);
      }
      if (!('value' in restProps)) {
        setValue(newValue);
      }
      onChange?.(
        newValue
          .filter((val) => registeredValues.includes(val))
          .sort((a, b) => {
            const indexA = memoizedOptions.findIndex((opt) => opt.value === a);
            const indexB = memoizedOptions.findIndex((opt) => opt.value === b);
            return indexA - indexB;
          }),
      );
    };

    const prefixCls = getPrefixCls('checkbox', customizePrefixCls);
    const groupPrefixCls = `${prefixCls}-group`;

    const rootCls = useCSSVarCls(prefixCls);
    const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

    const mergedProps: CheckboxGroupProps<T> = {
      ...props,
      options,
      value,
      disabled: mergedDisabled,
    };

    const styleRoot = useSemanticRootStyle(style);
    const [mergedClassNames, mergedStyles] = useMergeSemantic<
      CheckboxGroupSemanticAllType<T>['classNames'],
      CheckboxGroupSemanticAllType<T>['styles'],
      CheckboxGroupProps<T>
    >([classNames], [styles, styleRoot], {
      props: mergedProps,
    });

    const domProps = omit(restProps, ['value', 'disabled']);

    const childrenNode =
      Array.isArray(memoizedOptions) && memoizedOptions.length > 0
        ? memoizedOptions.map((option) => (
            <Checkbox
              prefixCls={prefixCls}
              key={option.value.toString()}
              disabled={'disabled' in option ? option.disabled : restProps.disabled}
              value={option.value}
              checked={value.includes(option.value)}
              onChange={option.onChange}
              className={clsx(`${groupPrefixCls}-item`, option.className)}
              style={option.style}
              title={option.title}
              id={option.id}
              required={option.required}
            >
              {option.label}
            </Checkbox>
          ))
        : children;

    const memoizedContext = React.useMemo<CheckboxGroupContext<any>>(
      () => ({
        toggleOption,
        value,
        disabled: restProps.disabled,
        name: restProps.name,
        classNames: {
          root: mergedClassNames.item,
          icon: mergedClassNames.itemIcon,
          label: mergedClassNames.itemLabel,
        },
        styles: {
          root: mergedStyles.item,
          icon: mergedStyles.itemIcon,
          label: mergedStyles.itemLabel,
        },
        // https://github.com/ant-design/ant-design/issues/16376
        registerValue,
        cancelValue,
      }),
      [
        toggleOption,
        value,
        restProps.disabled,
        restProps.name,
        mergedClassNames,
        mergedStyles,
        registerValue,
        cancelValue,
      ],
    );

    const classString = clsx(
      groupPrefixCls,
      {
        [`${groupPrefixCls}-rtl`]: direction === 'rtl',
      },
      className,
      rootClassName,
      mergedClassNames.root,
      cssVarCls,
      rootCls,
      hashId,
    );

    return (
      <div className={classString} style={mergedStyles.root} role={role} {...domProps} ref={ref}>
        <GroupContext.Provider value={memoizedContext}>{childrenNode}</GroupContext.Provider>
      </div>
    );
  },
);

export type { CheckboxGroupContext } from './GroupContext';
export { GroupContext };

export default CheckboxGroup as <T = any>(
  props: CheckboxGroupProps<T> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement;
