import * as React from 'react';
import omit from '@rc-component/util/lib/omit';
import cls from 'classnames';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks/useMergeSemantic';
import { useComponentConfig } from '../config-provider/context';
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

export interface AbstractCheckboxGroupProps<T = any> {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  options?: (CheckboxOptionType<T> | string | number)[];
  disabled?: boolean;
  style?: React.CSSProperties;
}

type SemanticName = 'root';

export type CheckboxGroupClassNamesType = SemanticClassNamesType<CheckboxGroupProps, SemanticName>;
export type CheckboxGroupStylesType = SemanticStylesType<CheckboxGroupProps, SemanticName>;

export interface CheckboxGroupProps<T = any> extends AbstractCheckboxGroupProps<T> {
  name?: string;
  defaultValue?: T[];
  value?: T[];
  onChange?: (checkedValue: T[]) => void;
  children?: React.ReactNode;
  classNames?: CheckboxGroupClassNamesType;
  styles?: CheckboxGroupStylesType;
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
      style,
      onChange,
      classNames,
      styles,
      ...restProps
    } = props;
    const {
      getPrefixCls,
      direction,
      className: contextClassName,
      style: contextStyle,
      classNames: contextClassNames,
      styles: contextStyles,
    } = useComponentConfig('checkbox');

    const [value, setValue] = React.useState<T[]>(restProps.value || defaultValue || []);
    const [registeredValues, setRegisteredValues] = React.useState<T[]>([]);

    React.useEffect(() => {
      if ('value' in restProps) {
        setValue(restProps.value || []);
      }
    }, [restProps.value]);

    const memoizedOptions = React.useMemo<CheckboxOptionType<T>[]>(
      () =>
        options.map<CheckboxOptionType<T>>((option: any) => {
          if (typeof option === 'string' || typeof option === 'number') {
            return { label: option, value: option };
          }
          return option;
        }),
      [options],
    );

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

    // =========== Merged Props for Semantic ==========
    const mergedProps = React.useMemo(() => {
      return {
        ...props,
        disabled: restProps.disabled,
      } as CheckboxGroupProps;
    }, [props, restProps.disabled]);

    const [mergedClassNames, mergedStyles] = useMergeSemantic<
      CheckboxGroupClassNamesType,
      CheckboxGroupStylesType,
      CheckboxGroupProps
    >(
      [contextClassNames as CheckboxGroupClassNamesType, classNames],
      [contextStyles as CheckboxGroupStylesType, styles],
      undefined,
      { props: mergedProps },
    );

    const domProps = omit(restProps, ['value', 'disabled']);

    const childrenNode = options.length
      ? memoizedOptions.map<React.ReactNode>((option) => (
          <Checkbox
            prefixCls={prefixCls}
            key={option.value.toString()}
            disabled={'disabled' in option ? option.disabled : restProps.disabled}
            value={option.value}
            checked={value.includes(option.value)}
            onChange={option.onChange}
            className={cls(`${groupPrefixCls}-item`, option.className)}
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
        // https://github.com/ant-design/ant-design/issues/16376
        registerValue,
        cancelValue,
      }),
      [toggleOption, value, restProps.disabled, restProps.name, registerValue, cancelValue],
    );

    const classString = cls(
      groupPrefixCls,
      {
        [`${groupPrefixCls}-rtl`]: direction === 'rtl',
      },
      contextClassName,
      className,
      mergedClassNames.root,
      rootClassName,
      cssVarCls,
      rootCls,
      hashId,
    );

    return (
      <div
        className={classString}
        style={{ ...mergedStyles.root, ...contextStyle, ...style }}
        {...domProps}
        ref={ref}
      >
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
