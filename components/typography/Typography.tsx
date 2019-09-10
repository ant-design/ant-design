import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

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
  setContentRef?: (node: HTMLElement) => void;
}

const Typography: React.SFC<InternalTypographyProps> = ({
  prefixCls: customizePrefixCls,
  component = 'article',
  className,
  'aria-label': ariaLabel,
  setContentRef,
  children,
  ...restProps
}) => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const Component = component as any;
      const prefixCls = getPrefixCls('typography', customizePrefixCls);

      return (
        <Component
          className={classNames(prefixCls, className)}
          aria-label={ariaLabel}
          ref={setContentRef}
          {...restProps}
        >
          {children}
        </Component>
      );
    }}
  </ConfigConsumer>
);

export default Typography;
