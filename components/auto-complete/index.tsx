/**
 * TODO: 4.0
 *
 * - Remove `dataSource`
 * - `size` not work with customizeInput
 * - CustomizeInput not feedback `ENTER` key since accessibility enhancement
 */

import * as React from 'react';
import classNames from 'classnames';
import type { BaseSelectRef } from 'rc-select';
import toArray from 'rc-util/lib/Children/toArray';
import omit from 'rc-util/lib/omit';
import { composeRef } from 'rc-util/lib/ref';

import { isValidElement } from '../_util/reactNode';
import type { InputStatus } from '../_util/statusUtils';
import warning from '../_util/warning';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigConsumer } from '../config-provider';
import type {
  BaseOptionType,
  DefaultOptionType,
  InternalSelectProps,
  RefSelectProps,
} from '../select';
import Select from '../select';

const { Option } = Select;

export interface DataSourceItemObject {
  value: string;
  text: string;
}
export type DataSourceItemType = DataSourceItemObject | React.ReactNode;

export interface AutoCompleteProps<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> extends Omit<
    InternalSelectProps<ValueType, OptionType>,
    'inputIcon' | 'loading' | 'mode' | 'optionLabelProp' | 'labelInValue'
  > {
  dataSource?: DataSourceItemType[];
  status?: InputStatus;
  /**
   * @deprecated `dropdownClassName` is deprecated which will be removed in next major version.
   *   Please use `popupClassName` instead.
   */
  dropdownClassName?: string;
  popupClassName?: string;
}

function isSelectOptionOrSelectOptGroup(child: any): Boolean {
  return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
}

function Input(
  props: {
    inputElement: React.ReactElement;
    onChange?: <T>(event: T) => {};
    className?: string;
  },
  ref: React.ForwardedRef<{ focus: () => void; blur: () => void }>,
) {
  let inputNode = props.inputElement || <input />;

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    blur: () => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    },
  }));

  inputNode = React.cloneElement(inputNode, {
    ...omit(props, ['inputElement']),
    ...inputNode.props,
    className: classNames(props.className, inputNode?.props?.className),
    ref: composeRef(
      inputRef,
      (inputNode as React.ComponentPropsWithRef<'input'>).ref as React.RefObject<HTMLInputElement>,
    ),
    onChange: (event: Event) => {
      if (props.onChange) {
        if (!event?.target) {
          const e = { target: { value: event } };
          props.onChange(e);
        } else {
          props.onChange(event);
        }
      }
    },
  });
  return inputNode;
}

const InputRef = React.forwardRef(Input);

const AutoComplete: React.ForwardRefRenderFunction<RefSelectProps, AutoCompleteProps> = (
  props,
  ref,
) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    popupClassName,
    dropdownClassName,
    children,
    dataSource,
  } = props;
  const childNodes: React.ReactElement[] = toArray(children);

  // ============================= Input =============================
  let customizeInput: React.ReactElement | undefined;

  if (
    childNodes.length === 1 &&
    isValidElement(childNodes[0]) &&
    !isSelectOptionOrSelectOptGroup(childNodes[0])
  ) {
    [customizeInput] = childNodes;
  }

  const getInputElement = customizeInput
    ? (): React.ReactElement => <InputRef inputElement={customizeInput!} />
    : undefined;

  // ============================ Options ============================
  let optionChildren: React.ReactNode;

  // [Legacy] convert `children` or `dataSource` into option children
  if (childNodes.length && isSelectOptionOrSelectOptGroup(childNodes[0])) {
    optionChildren = children;
  } else {
    optionChildren = dataSource
      ? dataSource.map((item) => {
          if (isValidElement(item)) {
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
              warning(
                false,
                'AutoComplete',
                '`dataSource` is only supports type `string[] | Object[]`.',
              );
              return undefined;
          }
        })
      : [];
  }

  warning(
    !('dataSource' in props),
    'AutoComplete',
    '`dataSource` is deprecated, please use `options` instead.',
  );

  warning(
    !dropdownClassName,
    'AutoComplete',
    '`dropdownClassName` is deprecated which will be removed in next major version. Please use `popupClassName` instead.',
  );

  warning(
    !customizeInput || !('size' in props),
    'AutoComplete',
    'You need to control style self instead of setting `size` when using customize input.',
  );

  return (
    <ConfigConsumer>
      {({ getPrefixCls }: ConfigConsumerProps) => {
        const prefixCls = getPrefixCls('select', customizePrefixCls);

        return (
          <Select
            ref={ref}
            {...omit(props, ['dataSource'])}
            prefixCls={prefixCls}
            dropdownClassName={popupClassName || dropdownClassName}
            className={classNames(`${prefixCls}-auto-complete`, className)}
            mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE as any}
            {...{
              // Internal api
              getInputElement,
            }}
          >
            {optionChildren}
          </Select>
        );
      }}
    </ConfigConsumer>
  );
};

const RefAutoComplete = React.forwardRef<RefSelectProps, AutoCompleteProps>(
  AutoComplete,
) as unknown as (<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>(
  props: React.PropsWithChildren<AutoCompleteProps<ValueType, OptionType>> & {
    ref?: React.Ref<BaseSelectRef>;
  },
) => React.ReactElement) & {
  Option: typeof Option;
};

RefAutoComplete.Option = Option;

export default RefAutoComplete;
