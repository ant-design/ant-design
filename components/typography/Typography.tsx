import classNames from 'classnames';
import { composeRef } from 'rc-util/lib/ref';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import warning from '../_util/warning';

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
  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  let mergedRef = ref;
  if (setContentRef) {
    warning(false, 'Typography', '`setContentRef` is deprecated. Please use `ref` instead.');
    mergedRef = composeRef(ref, setContentRef);
  }

  const Component = component as any;
  const prefixCls = getPrefixCls('typography', customizePrefixCls);
  const componentClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );
  return (
    <Component className={componentClassName} aria-label={ariaLabel} ref={mergedRef} {...restProps}>
      {children}
    </Component>
  );
};

const RefTypography = React.forwardRef(Typography);
if (process.env.NODE_ENV !== 'production') {
  RefTypography.displayName = 'Typography';
}

// es default export should use const instead of let
const ExportTypography = RefTypography as unknown as React.FC<TypographyProps>;

export default ExportTypography;
