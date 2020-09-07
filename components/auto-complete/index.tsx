/**
 * TODO: 4.0
 * - remove `dataSource`
 * - `size` not work with customizeInput
 * - customizeInput not feedback `ENTER` key since accessibility enhancement
 */

import * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';
import { SelectProps as RcSelectProps } from 'rc-select';
import classNames from 'classnames';
import omit from 'omit.js';
import Select, { InternalSelectProps, OptionType } from '../select';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import devWarning from '../_util/devWarning';
import { isValidElement } from '../_util/reactNode';

const { Option } = Select;

const InternalSelect = Select as React.ComponentClass<RcSelectProps>;

export interface DataSourceItemObject {
  value: string;
  text: string;
}
export type DataSourceItemType = string | DataSourceItemObject;

export interface AutoCompleteProps
  extends Omit<
    InternalSelectProps<string>,
    'inputIcon' | 'loading' | 'mode' | 'optionLabelProp' | 'labelInValue'
  > {
  dataSource?: DataSourceItemType[];
}

function isSelectOptionOrSelectOptGroup(child: any): Boolean {
  return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
}

const AutoComplete: React.ForwardRefRenderFunction<Select, AutoCompleteProps> = (props, ref) => {
  const { prefixCls: customizePrefixCls, className, children, dataSource } = props;
  const childNodes: React.ReactElement[] = toArray(children);

  const selectRef = React.useRef<Select>();

  React.useImperativeHandle<Select, Select>(ref, () => selectRef.current!);

  // ============================= Input =============================
  let customizeInput: React.ReactElement;

  if (
    childNodes.length === 1 &&
    isValidElement(childNodes[0]) &&
    !isSelectOptionOrSelectOptGroup(childNodes[0])
  ) {
    [customizeInput] = childNodes;
  }

  const getInputElement = (): React.ReactElement => customizeInput;

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
              throw new Error('AutoComplete[dataSource] only supports type `string[] | Object[]`.');
          }
        })
      : [];
  }

  // ============================ Warning ============================
  React.useEffect(() => {
    devWarning(
      !('dataSource' in props),
      'AutoComplete',
      '`dataSource` is deprecated, please use `options` instead.',
    );

    devWarning(
      !customizeInput || !('size' in props),
      'AutoComplete',
      'You need to control style self instead of setting `size` when using customize input.',
    );
  }, []);

  return (
    <ConfigConsumer>
      {({ getPrefixCls }: ConfigConsumerProps) => {
        const prefixCls = getPrefixCls('select', customizePrefixCls);

        return (
          <InternalSelect
            ref={selectRef as any}
            {...omit(props, ['dataSource'])}
            prefixCls={prefixCls}
            className={classNames(`${prefixCls}-auto-complete`, className)}
            mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE as any}
            getInputElement={getInputElement}
          >
            {optionChildren}
          </InternalSelect>
        );
      }}
    </ConfigConsumer>
  );
};

const RefAutoComplete = React.forwardRef<Select, AutoCompleteProps>(AutoComplete);

type RefAutoComplete = typeof RefAutoComplete & {
  Option: OptionType;
};

(RefAutoComplete as RefAutoComplete).Option = Option;

export default RefAutoComplete as RefAutoComplete;
