import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import warning from '../_util/warning';
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

const Typography: React.RefForwardingComponent<{}, InternalTypographyProps> = (
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
    warning(false, 'Typography', '`setContentRef` is deprecated. Please use `ref` instead.');
    mergedRef = composeRef(ref, setContentRef);
  }

  return (
    <ConfigConsumer>
      {({ getPrefixCls }: ConfigConsumerProps) => {
        const Component = component as any;
        const prefixCls = getPrefixCls('typography', customizePrefixCls);

        return (
          <Component
            className={classNames(prefixCls, className)}
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

let RefTypography;

if (React.forwardRef) {
  RefTypography = React.forwardRef(Typography);
  RefTypography.displayName = 'Typography';
} else {
  class TypographyWrapper extends React.Component<TypographyProps, {}> {
    state = {};

    render() {
      return <Typography {...this.props} />;
    }
  }

  RefTypography = TypographyWrapper;
}

// es default export should use const instead of let
const ExportTypography = (RefTypography as unknown) as React.FC<TypographyProps>;

export default ExportTypography;
