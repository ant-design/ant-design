import * as React from 'react';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export default class BreadcrumbSeparator extends React.Component<any> {
  static __ANT_BREADCRUMB_SEPARATOR = true;

  renderSeparator = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { children } = this.props;
    const prefixCls = getPrefixCls('breadcrumb');

    return <span className={`${prefixCls}-separator`}>{children || '/'}</span>;
  };

  render() {
    return <ConfigConsumer>{this.renderSeparator}</ConfigConsumer>;
  }
}
