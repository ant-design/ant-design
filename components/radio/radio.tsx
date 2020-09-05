import * as React from 'react';
import RcCheckbox from 'rc-checkbox';
import classNames from 'classnames';
import { RadioProps, RadioChangeEvent } from './interface';
import { ConfigContext } from '../config-provider';
import RadioGroupContext from './context';
import { composeRef } from '../_util/ref';
import devWarning from '../_util/devWarning';

const InternalRadio: React.ForwardRefRenderFunction<unknown, RadioProps> = (props, ref) => {
  const context = React.useContext(RadioGroupContext);
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const innerRef = React.useRef<HTMLElement>();
  const mergedRef = composeRef(ref, innerRef);

  React.useEffect(() => {
    devWarning(!('optionType' in props), 'Radio', '`optionType` is only support in Radio.Group.');
  }, []);

  const onChange = (e: RadioChangeEvent) => {
    if (props.onChange) {
      props.onChange(e);
    }

    if (context?.onChange) {
      context.onChange(e);
    }
  };

  const { prefixCls: customizePrefixCls, className, children, style, ...restProps } = props;
  const prefixCls = getPrefixCls('radio', customizePrefixCls);
  const radioProps: RadioProps = { ...restProps };
  if (context) {
    radioProps.name = context.name;
    radioProps.onChange = onChange;
    radioProps.checked = props.value === context.value;
    radioProps.disabled = props.disabled || context.disabled;
  }
  const wrapperClassString = classNames(
    {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: radioProps.checked,
      [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
      [`${prefixCls}-wrapper-rtl`]: direction === 'rtl',
    },
    className,
  );

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      className={wrapperClassString}
      style={style}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <RcCheckbox {...radioProps} prefixCls={prefixCls} ref={mergedRef as any} />
      {children !== undefined ? <span>{children}</span> : null}
    </label>
  );
};

const Radio = React.forwardRef<unknown, RadioProps>(InternalRadio);
Radio.displayName = 'Radio';

Radio.defaultProps = {
  type: 'radio',
};

export default Radio;
