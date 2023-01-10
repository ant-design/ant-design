import classNames from 'classnames';
import RcCheckbox from 'rc-checkbox';
import { composeRef } from 'rc-util/lib/ref';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import { FormItemInputContext } from '../form/context';
import warning from '../_util/warning';
import Wave from '../_util/wave';
import RadioGroupContext, { RadioOptionTypeContext } from './context';
import type { RadioChangeEvent, RadioProps } from './interface';

import useStyle from './style';

const InternalRadio: React.ForwardRefRenderFunction<HTMLElement, RadioProps> = (props, ref) => {
  const groupContext = React.useContext(RadioGroupContext);
  const radioOptionTypeContext = React.useContext(RadioOptionTypeContext);

  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const innerRef = React.useRef<HTMLElement>();
  const mergedRef = composeRef(ref, innerRef);
  const { isFormItemInput } = React.useContext(FormItemInputContext);

  warning(!('optionType' in props), 'Radio', '`optionType` is only support in Radio.Group.');

  const onChange = (e: RadioChangeEvent) => {
    props.onChange?.(e);
    groupContext?.onChange?.(e);
  };

  const {
    prefixCls: customizePrefixCls,
    className,
    children,
    style,
    disabled: customDisabled,
    ...restProps
  } = props;
  const radioPrefixCls = getPrefixCls('radio', customizePrefixCls);
  const prefixCls =
    (groupContext?.optionType || radioOptionTypeContext) === 'button'
      ? `${radioPrefixCls}-button`
      : radioPrefixCls;

  // Style
  const [wrapSSR, hashId] = useStyle(radioPrefixCls);

  const radioProps: RadioProps = { ...restProps };

  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);
  radioProps.disabled = customDisabled || disabled;

  if (groupContext) {
    radioProps.name = groupContext.name;
    radioProps.onChange = onChange;
    radioProps.checked = props.value === groupContext.value;
    radioProps.disabled = radioProps.disabled || groupContext.disabled;
  }
  const wrapperClassString = classNames(
    `${prefixCls}-wrapper`,
    {
      [`${prefixCls}-wrapper-checked`]: radioProps.checked,
      [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
      [`${prefixCls}-wrapper-rtl`]: direction === 'rtl',
      [`${prefixCls}-wrapper-in-form-item`]: isFormItemInput,
    },
    className,
    hashId,
  );

  /* eslint-disable jsx-a11y/label-has-associated-control */
  return wrapSSR(
    <Wave>
      <label
        className={wrapperClassString}
        style={style}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        <RcCheckbox
          {...radioProps}
          type="radio"
          prefixCls={prefixCls}
          ref={mergedRef}
          className={classNames(radioProps.className, 'antd-wave-target')}
        />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    </Wave>,
  );
  /* eslint-enable */
};

const Radio = React.forwardRef<unknown, RadioProps>(InternalRadio);

if (process.env.NODE_ENV !== 'production') {
  Radio.displayName = 'Radio';
}

export default Radio;
