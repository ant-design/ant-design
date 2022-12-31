import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import classNames from 'classnames';
import * as React from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import type { SizeType } from '../config-provider/SizeContext';
import type { FormItemStatusContextProps } from '../form/context';
import { FormItemInputContext } from '../form/context';
import { cloneElement } from '../_util/reactNode';
import type { InputStatus } from '../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';

const ClearableInputType = ['text', 'input'] as const;

const hasAddon = (props: ClearableInputProps): boolean => !!(props.addonBefore || props.addonAfter);

/** This basic props required for input and textarea. */
interface BasicProps {
  prefixCls: string;
  inputType: typeof ClearableInputType[number];
  value?: any;
  allowClear?: boolean;
  element: React.ReactElement;
  handleReset: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  focused?: boolean;
  readOnly?: boolean;
  bordered: boolean;
  hidden?: boolean;
}

/** This props only for input. */
export interface ClearableInputProps extends BasicProps {
  size?: SizeType;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  triggerFocus?: () => void;
  status?: InputStatus;
  hashId?: string;
}

const ClearableLabeledInput: React.FC<ClearableInputProps> = (props) => {
  const {
    prefixCls,
    inputType,
    element,
    allowClear,
    className,
    style,
    bordered,
    hidden,
    status: customStatus,
    hashId,
    value,
    disabled,
    readOnly,
    suffix,
    handleReset,
  } = props;

  const statusContext = React.useContext<FormItemStatusContextProps>(FormItemInputContext);

  const { direction } = React.useContext<ConfigConsumerProps>(ConfigContext);

  const clearIcon = React.useMemo<React.ReactNode>(() => {
    const needClear = !disabled && !readOnly && value;
    const iconClassName = `${prefixCls}-clear-icon`;
    return (
      <CloseCircleFilled
        onClick={handleReset}
        // Do not trigger onBlur when clear input
        // https://github.com/ant-design/ant-design/issues/31200
        onMouseDown={(e) => e.preventDefault()}
        role="button"
        className={classNames(
          {
            [`${iconClassName}-hidden`]: !needClear,
            [`${iconClassName}-has-suffix`]: !!suffix,
          },
          iconClassName,
        )}
      />
    );
  }, [disabled, readOnly, value, prefixCls, suffix, handleReset]);

  const textAreaWithClearIcon = React.useMemo<React.ReactElement>(() => {
    const { status, hasFeedback } = statusContext;
    if (!allowClear) {
      return cloneElement(element, { value });
    }
    const affixWrapperCls = classNames(
      `${prefixCls}-affix-wrapper`,
      `${prefixCls}-affix-wrapper-textarea-with-clear-btn`,
      getStatusClassNames(
        `${prefixCls}-affix-wrapper`,
        getMergedStatus(status, customStatus),
        hasFeedback,
      ),
      {
        [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
        [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
        // className will go to addon wrapper
        [`${className}`]: !hasAddon(props) && className,
      },
      hashId,
    );
    return (
      <span className={affixWrapperCls} style={style} hidden={hidden}>
        {cloneElement(element, { style: null, value })}
        {clearIcon}
      </span>
    );
  }, [
    statusContext,
    allowClear,
    element,
    value,
    prefixCls,
    customStatus,
    direction,
    bordered,
    className,
    style,
    hidden,
    hashId,
    clearIcon,
    props.addonBefore,
    props.addonAfter,
  ]);

  return inputType === ClearableInputType[0] ? textAreaWithClearIcon : null;
};

export default ClearableLabeledInput;
