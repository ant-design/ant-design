import * as React from 'react';
import classNames from 'classnames';
import RcCheckbox from 'rc-checkbox';
import { composeRef } from 'rc-util/lib/ref';

import { devUseWarning } from '../_util/warning';
import Wave from '../_util/wave';
import { TARGET_CLS } from '../_util/wave/interface';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import { FormItemInputContext } from '../form/context';
import RadioGroupContext, { RadioOptionTypeContext } from './context';
import type { RadioChangeEvent, RadioProps, RadioRef } from './interface';
import useStyle from './style';

const InternalRadio: React.ForwardRefRenderFunction<RadioRef, RadioProps> = (props, ref) => {
  const groupContext = React.useContext(RadioGroupContext);
  const radioOptionTypeContext = React.useContext(RadioOptionTypeContext);

  const { getPrefixCls, direction, radio } = React.useContext(ConfigContext);
  const innerRef = React.useRef<RadioRef>(null);
  const mergedRef = composeRef(ref, innerRef);
  const { isFormItemInput } = React.useContext(FormItemInputContext);

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Radio');

    warning(!('optionType' in props), 'usage', '`optionType` is only support in Radio.Group.');
  }

  const onChange = (e: RadioChangeEvent) => {
    props.onChange?.(e);
    groupContext?.onChange?.(e);
  };

  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    children,
    style,
    ...restProps
  } = props;
  const radioPrefixCls = getPrefixCls('radio', customizePrefixCls);

  const isButtonType = (groupContext?.optionType || radioOptionTypeContext) === 'button';
  const prefixCls = isButtonType ? `${radioPrefixCls}-button` : radioPrefixCls;

  // Style
  const [wrapSSR, hashId] = useStyle(radioPrefixCls);

  const radioProps: RadioProps = { ...restProps };

  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);

  if (groupContext) {
    radioProps.name = groupContext.name;
    radioProps.onChange = onChange;
    radioProps.checked = props.value === groupContext.value;
    radioProps.disabled = radioProps.disabled ?? groupContext.disabled;
  }

  radioProps.disabled = radioProps.disabled ?? disabled;
  const wrapperClassString = classNames(
    `${prefixCls}-wrapper`,
    {
      [`${prefixCls}-wrapper-checked`]: radioProps.checked,
      [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
      [`${prefixCls}-wrapper-rtl`]: direction === 'rtl',
      [`${prefixCls}-wrapper-in-form-item`]: isFormItemInput,
    },
    radio?.className,
    className,
    rootClassName,
    hashId,
  );

  return wrapSSR(
    <Wave component="Radio" disabled={radioProps.disabled}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        className={wrapperClassString}
        style={{ ...radio?.style, ...style }}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        <RcCheckbox
          {...radioProps}
          className={classNames(radioProps.className, !isButtonType && TARGET_CLS)}
          type="radio"
          prefixCls={prefixCls}
          ref={mergedRef}
        />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    </Wave>,
  );
};

const Radio = React.forwardRef<RadioRef, RadioProps>(InternalRadio);

if (process.env.NODE_ENV !== 'production') {
  Radio.displayName = 'Radio';
}

export default Radio;
