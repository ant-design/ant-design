import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import devWarning from '../_util/devWarning';
import { composeRef } from '../_util/ref';

export interface TypographyProps {
  id?: string;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  ['aria-label']?: string;
}

interface InternalTypographyProps extends TypographyProps {
  component?: string;
  /** @deprecated Use `ref` directly if using React 16 */
  setContentRef?: (node: HTMLElement) => void;
}

const Typography: React.ForwardRefRenderFunction<{}, InternalTypographyProps> = (
  {
    prefixCls: customizePrefixCls,
    component = 'article',
    className,
    'aria-label': ariaLabel,
    setContentRef,
    children,
    ...restProps
  },
  ref,
) => {
  let mergedRef = ref;

  if (setContentRef) {
    devWarning(false, 'Typography', '`setContentRef` is deprecated. Please use `ref` instead.');
    mergedRef = composeRef(ref, setContentRef);
  }

  return (
    <ConfigConsumer>
      {({ getPrefixCls, direction }: ConfigConsumerProps) => {
        const Component = component as any;
        const prefixCls = getPrefixCls('typography', customizePrefixCls);
        const componentClassName = classNames(prefixCls, className, {
          [`${prefixCls}-rtl`]: direction === 'rtl',
        });
        return (
          <Component
            className={componentClassName}
            aria-label={ariaLabel}
            ref={mergedRef}
            {...restProps}
          >
            {children}
          </Component>
        );
      }}
    </ConfigConsumer>
  );
};

const RefTypography = React.forwardRef(Typography);

RefTypography.displayName = 'Typography';

// es default export should use const instead of let
const ExportTypography = (RefTypography as unknown) as React.FC<TypographyProps>;

export default ExportTypography;
