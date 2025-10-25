import React, { useImperativeHandle, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useControlledState } from '@rc-component/util';
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import { clsx } from 'clsx';

import type { SemanticClassNames, SemanticStyles } from '../_util/hooks/useMergeSemantic';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import CheckableTag from './CheckableTag';
import useStyle from './style';

export type CheckableTagOption<CheckableTagValue> = {
  value: CheckableTagValue;
  label: ReactNode;
};

interface CheckableTagGroupSingleProps<CheckableTagValue> {
  mode?: 'radio';
  value?: CheckableTagValue | null;
  defaultValue?: CheckableTagValue | null;
  onChange?: (value: CheckableTagValue | null) => void;
}

interface CheckableTagGroupMultipleProps<CheckableTagValue> {
  mode: 'checkbox';
  value?: CheckableTagValue[];
  defaultValue?: CheckableTagValue[];
  onChange?: (value: CheckableTagValue[]) => void;
}

export type SemanticName = 'root' | 'item';

export type CheckableTagGroupProps<CheckableTagValue> = {
  // style
  prefixCls?: string;
  rootClassName?: string;
  classNames?: SemanticClassNames<SemanticName>;
  styles?: SemanticStyles<SemanticName>;
  options?: (CheckableTagOption<CheckableTagValue> | CheckableTagValue)[];
  disabled?: boolean;
} & (
  | CheckableTagGroupSingleProps<CheckableTagValue>
  | CheckableTagGroupMultipleProps<CheckableTagValue>
) &
  Pick<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style' | 'id' | 'role'> & {
    [key: `data-${string}`]: any;
    [key: `aria-${string}`]: any;
  };

export interface CheckableTagGroupRef {
  nativeElement: HTMLDivElement;
}

function CheckableTagGroup<CheckableTagValue extends string | number>(
  props: CheckableTagGroupProps<CheckableTagValue>,
  ref: React.Ref<CheckableTagGroupRef>,
) {
  const {
    id,

    prefixCls: customizePrefixCls,
    rootClassName,
    className,
    style,
    classNames,
    styles,

    disabled,
    options,
    value,
    defaultValue,
    onChange,
    mode,

    ...restProps
  } = props;

  const { getPrefixCls, direction } = useComponentConfig('tag');

  const prefixCls = getPrefixCls('tag', customizePrefixCls);
  const groupPrefixCls = `${prefixCls}-checkable-group`;

  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const mergedClassNames = classNames || {};
  const mergedStyles = styles || {};

  // =============================== Option ===============================
  const parsedOptions = useMemo(
    () =>
      (options || []).map((option) => {
        if (option && typeof option === 'object') {
          return option;
        }
        return {
          value: option,
          label: option,
        };
      }),
    [options],
  );

  // =============================== Values ===============================
  const [mergedValue, setMergedValue] = useControlledState(defaultValue, value);

  const handleChange = (checked: boolean, option: CheckableTagOption<CheckableTagValue>) => {
    let newValue: CheckableTagValue | CheckableTagValue[] | null = null;

    if (mode === 'checkbox') {
      const valueList = (mergedValue || []) as CheckableTagValue[];
      newValue = checked
        ? [...valueList, option.value]
        : valueList.filter((item) => item !== option.value);
    } else {
      if (checked) {
        newValue = option.value;
      } else {
        // Radio mode always have one value
        return;
      }
    }

    setMergedValue(newValue);
    onChange?.(newValue as any); // TS not support generic type in function call
  };

  // ================================ Refs ================================
  const divRef = React.useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    nativeElement: divRef.current!,
  }));

  // ================================ ARIA ================================
  const ariaProps = pickAttrs(restProps, {
    aria: true,
    data: true,
  });

  // =============================== Render ===============================
  return (
    <div
      {...ariaProps}
      className={clsx(
        groupPrefixCls,
        rootClassName,
        {
          [`${groupPrefixCls}-disabled`]: disabled,
          [`${groupPrefixCls}-rtl`]: direction === 'rtl',
        },
        hashId,
        cssVarCls,
        className,
        mergedClassNames.root,
      )}
      style={{
        ...mergedStyles.root,
        ...style,
      }}
      id={id}
      ref={divRef}
    >
      {parsedOptions.map((option) => (
        <CheckableTag
          key={option.value}
          className={clsx(`${groupPrefixCls}-item`, mergedClassNames.item)}
          style={mergedStyles.item}
          checked={
            mode === 'checkbox'
              ? ((mergedValue as CheckableTagValue[]) || []).includes(option.value)
              : mergedValue === option.value
          }
          onChange={(checked) => handleChange(checked, option)}
          disabled={disabled}
        >
          {option.label}
        </CheckableTag>
      ))}
    </div>
  );
}

const ForwardCheckableTagGroup = React.forwardRef(CheckableTagGroup) as (<
  CheckableTagValue extends string | number,
>(
  props: CheckableTagGroupProps<CheckableTagValue> & { ref?: React.Ref<CheckableTagGroupRef> },
) => React.ReactElement) & {
  displayName?: string;
};

if (process.env.NODE_ENV !== 'production') {
  ForwardCheckableTagGroup.displayName = 'CheckableTagGroup';
}

export default ForwardCheckableTagGroup;
