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

class Typography extends React.Component<InternalTypographyProps> {
  renderTypography = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      component = 'article',
      className,
      'aria-label': ariaLabel,
      setContentRef,
      children,
      ...restProps
    } = this.props;
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
  };

  render() {
    return <ConfigConsumer>{this.renderTypography}</ConfigConsumer>;
  }
}

export default Typography;
