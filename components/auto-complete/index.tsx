/**
 * TODO: 4.0
 *
 * - Remove `dataSource`
 * - `size` not work with customizeInput
 * - CustomizeInput not feedback `ENTER` key since accessibility enhancement
 */

import classNames from 'classnames';
import type { BaseSelectRef } from 'rc-select';
import toArray from 'rc-util/lib/Children/toArray';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigConsumer } from '../config-provider';
import type {
  BaseOptionType,
  DefaultOptionType,
  InternalSelectProps,
  RefSelectProps,
} from '../select';
import Select from '../select';
import { isValidElement } from '../_util/reactNode';
import type { InputStatus } from '../_util/statusUtils';
import warning from '../_util/warning';

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
}

function isSelectOptionOrSelectOptGroup(child: any): Boolean {
  return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
}

const AutoComplete: React.ForwardRefRenderFunction<RefSelectProps, AutoCompleteProps> = (
  props,
  ref,
) => {
  const { prefixCls: customizePrefixCls, className, children, dataSource } = props;
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

  const getInputElement = customizeInput ? (): React.ReactElement => customizeInput! : undefined;

  // ============================ Options ============================
  let optionChildren: React.ReactNode;

  // [Legacy] convert `children` or `dataSource` into option children
  if (childNodes.length && isSelectOptionOrSelectOptGroup(childNodes[0])) {
    optionChildren = children;
  } else {
    optionChildren = dataSource
      ? dataSource.map(item => {
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
