import * as React from 'react';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';

import { ConfigContext } from '../config-provider';
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

export interface CheckboxGroupProps<T = any> extends AbstractCheckboxGroupProps<T> {
  name?: string;
  defaultValue?: T[];
  value?: T[];
  onChange?: (checkedValue: T[]) => void;
  children?: React.ReactNode;
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
      ...restProps
    } = props;
    const { getPrefixCls, direction } = React.useContext(ConfigContext);

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
    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

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
            className={`${groupPrefixCls}-item`}
            style={option.style}
            title={option.title}
            id={option.id}
            required={option.required}
          >
            {option.label}
          </Checkbox>
        ))
      : children;

    const context: CheckboxGroupContext<any> = {
      toggleOption,
      value,
      disabled: restProps.disabled,
      name: restProps.name,
      // https://github.com/ant-design/ant-design/issues/16376
      registerValue,
      cancelValue,
    };
    const classString = classNames(
      groupPrefixCls,
      {
        [`${groupPrefixCls}-rtl`]: direction === 'rtl',
      },
      className,
      rootClassName,
      cssVarCls,
      rootCls,
      hashId,
    );
    return wrapCSSVar(
      <div className={classString} style={style} {...domProps} ref={ref}>
        <GroupContext.Provider value={context}>{childrenNode}</GroupContext.Provider>
      </div>,
    );
  },
);

export type { CheckboxGroupContext } from './GroupContext';
export { GroupContext };

export default CheckboxGroup as <T = any>(
  props: CheckboxGroupProps<T> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement;
