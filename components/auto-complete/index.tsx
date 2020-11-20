/**
 * TODO: 4.0
 * - remove `dataSource`
 * - `size` not work with customizeInput
 * - customizeInput not feedback `ENTER` key since accessibility enhancement
 */

import * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';
import classNames from 'classnames';
import omit from 'omit.js';
import Select, { InternalSelectProps, OptionType, RefSelectProps } from '../select';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import devWarning from '../_util/devWarning';
import { isValidElement } from '../_util/reactNode';

const { Option } = Select;

export interface DataSourceItemObject {
  value: string;
  text: string;
}
export type DataSourceItemType = DataSourceItemObject | React.ReactNode;

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
          <Select
            ref={ref}
            {...omit(props, ['dataSource'])}
            prefixCls={prefixCls}
            className={classNames(`${prefixCls}-auto-complete`, className)}
            mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE as any}
            getInputElement={getInputElement}
          >
            {optionChildren}
          </Select>
        );
      }}
    </ConfigConsumer>
  );
};

const RefAutoComplete = React.forwardRef<RefSelectProps, AutoCompleteProps>(AutoComplete);

type RefAutoCompleteWithOption = typeof RefAutoComplete & {
  Option: OptionType;
};

(RefAutoComplete as RefAutoCompleteWithOption).Option = Option;

export default RefAutoComplete as RefAutoCompleteWithOption;
