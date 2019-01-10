import * as React from 'react';
import classNames from 'classnames';
import { withConfigConsumer, ConfigConsumerProps } from '../config-provider';
// import LocaleReceiver from '../locale-provider/LocaleReceiver';

export interface TextProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

class Text extends React.Component<TextProps & ConfigConsumerProps, {}> {
  render() {
    const { children, className, prefixCls, ...restProps } = this.props;

    return (
      <p className={classNames(prefixCls, className)} {...restProps}>
        {children}
      </p>
    );
  }
}

export default withConfigConsumer<TextProps>({
  prefixCls: 'text',
})(Text);
