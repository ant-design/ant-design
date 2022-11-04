import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import classNames from 'classnames';
import * as React from 'react';
import type { DirectionType } from '../config-provider';
import type { SizeType } from '../config-provider/SizeContext';
import type { FormItemStatusContextProps } from '../form/context';
import { FormItemInputContext } from '../form/context';
import { cloneElement } from '../_util/reactNode';
import type { InputStatus } from '../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import { tuple } from '../_util/type';
import type { InputProps } from './Input';

const ClearableInputType = tuple('text', 'input');

function hasAddon(props: InputProps | ClearableInputProps) {
  return !!(props.addonBefore || props.addonAfter);
}

/** This basic props required for input and textarea. */
interface BasicProps {
  prefixCls: string;
  inputType: typeof ClearableInputType[number];
  value?: any;
  allowClear?: boolean;
  element: React.ReactElement;
  handleReset: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  direction?: DirectionType;
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
}

const ClearableLabeledInput: React.FC<ClearableInputProps> = props => {
  const {
    prefixCls,
    inputType,
    element,
    value,
    allowClear,
    style,
    direction,
    bordered,
    hidden,
    disabled,
    readOnly,
    suffix,
    status: customStatus,
    handleReset,
  } = props;
  const renderClearIcon = () => {
    const needClear = !disabled && !readOnly && value;
    const className = `${prefixCls}-clear-icon`;
    return (
      <CloseCircleFilled
        onClick={handleReset}
        // Do not trigger onBlur when clear input
        // https://github.com/ant-design/ant-design/issues/31200
        onMouseDown={e => e.preventDefault()}
        className={classNames(
          {
            [`${className}-hidden`]: !needClear,
            [`${className}-has-suffix`]: !!suffix,
          },
          className,
        )}
        role="button"
      />
    );
  };
  const renderTextAreaWithClearIcon = (statusContext: FormItemStatusContextProps) => {
    const { status: contextStatus, hasFeedback } = statusContext;
    if (!allowClear) {
      return cloneElement(element, { value });
    }
    const affixWrapperCls = classNames(
      `${prefixCls}-affix-wrapper`,
      `${prefixCls}-affix-wrapper-textarea-with-clear-btn`,
      getStatusClassNames(
        `${prefixCls}-affix-wrapper`,
        getMergedStatus(contextStatus, customStatus),
        hasFeedback,
      ),
      {
        [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
        [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
        // className will go to addon wrapper
        [`${props.className}`]: !hasAddon(props) && props.className,
      },
    );
    return (
      <span className={affixWrapperCls} style={style} hidden={hidden}>
        {cloneElement(element, { style: null, value })}
        {renderClearIcon()}
      </span>
    );
  };

  return (
    <FormItemInputContext.Consumer>
      {statusContext => {
        if (inputType === ClearableInputType[0]) {
          return renderTextAreaWithClearIcon(statusContext);
        }
      }}
    </FormItemInputContext.Consumer>
  );
};

export default ClearableLabeledInput;
