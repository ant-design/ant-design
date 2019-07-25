import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface BreadcrumbProps {
  separator?: React.ReactNode;
}

export default class BreadcrumbSeparator extends React.Component<BreadcrumbProps, any> {
  static defaultProps = {
    defaultSeparator: '/',
  };

  static propTypes = {
    defaultSeparator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  };

  renderSeparator = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { children, defaultSeparator } = this.props;
    const prefixCls = getPrefixCls('breadcrumb');

    return <span className={`${prefixCls}-separator`}>{children || defaultSeparator}</span>;
  };

  render() {
    return <ConfigConsumer>{this.renderSeparator}</ConfigConsumer>;
  }
}
