import classNames from 'classnames';
import type { BaseSelectRef } from 'rc-select';
import toArray from 'rc-util/lib/Children/toArray';
import omit from 'rc-util/lib/omit';
import { composeRef } from 'rc-util/lib/ref';
import * as React from 'react';
import genPurePanel from '../_util/PurePanel';
import { isValidElement } from '../_util/reactNode';
import type { InputStatus } from '../_util/statusUtils';
import warning from '../_util/warning';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import type {
  BaseOptionType,
  DefaultOptionType,
  InternalSelectProps,
  RefSelectProps,
  SelectProps,
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
    'loading' | 'mode' | 'optionLabelProp' | 'labelInValue'
  > {
  dataSource?: DataSourceItemType[];
  status?: InputStatus;
  popupClassName?: string;
  /** @deprecated Please use `popupClassName` instead */
  dropdownClassName?: string;
  /** @deprecated Please use `popupMatchSelectWidth` instead */
  dropdownMatchSelectWidth?: boolean | number;
  popupMatchSelectWidth?: boolean | number;
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
  ref: React.ForwardedRef<{ focus: () => void }>,
) {
  let inputNode = props.inputElement || <input />;

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  inputNode = React.cloneElement(inputNode, {
    ...omit(props, ['inputElement']),
    ...inputNode.props,
    className: classNames(props.className, inputNode?.props?.className),
    ref: composeRef(
      (inputNode as React.ComponentPropsWithRef<'input'>).ref as React.RefObject<HTMLInputElement>,
      inputRef,
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

  if (process.env.NODE_ENV !== 'production') {
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

    warning(
      !dropdownClassName,
      'AutoComplete',
      '`dropdownClassName` is deprecated, please use `popupClassName` instead.',
    );
  }

  const { getPrefixCls } = React.useContext<ConfigConsumerProps>(ConfigContext);

  const prefixCls = getPrefixCls('select', customizePrefixCls);

  return (
    <Select
      ref={ref}
      suffixIcon={null}
      {...omit(props, ['dataSource', 'dropdownClassName'])}
      prefixCls={prefixCls}
      popupClassName={popupClassName || dropdownClassName}
      className={classNames(`${prefixCls}-auto-complete`, className)}
      mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE as SelectProps['mode']}
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
  props: React.PropsWithChildren<AutoCompleteProps<ValueType, OptionType>> & {
    ref?: React.Ref<BaseSelectRef>;
  },
) => React.ReactElement) & {
  displayName?: string;
  Option: typeof Option;
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};

// We don't care debug panel
/* istanbul ignore next */
const PurePanel = genPurePanel(RefAutoComplete);

RefAutoComplete.Option = Option;
RefAutoComplete._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

if (process.env.NODE_ENV !== 'production') {
  RefAutoComplete.displayName = 'AutoComplete';
}

export default RefAutoComplete;
