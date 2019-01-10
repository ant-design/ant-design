import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import { withConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Icon from '../icon';
import Tooltip from '../tooltip';

export interface TextProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  editable?: boolean;
}

class Text extends React.Component<TextProps & ConfigConsumerProps, {}> {
  renderEdit() {
    const { editable, prefixCls } = this.props;
    if (!editable) return;

    return (
      <Tooltip title="edit">
        <Icon className={`${prefixCls}-edit`} tabIndex={-1} type="edit" />
      </Tooltip>
    );
  }

  render() {
    const { children, className, prefixCls, editable, ...restProps } = this.props;

    const textProps = omit(restProps, ['prefixCls', 'editable']);

    return (
      <p className={classNames(prefixCls, className)} {...textProps}>
        {children}
        {this.renderEdit()}
      </p>
    );
  }
}

export default withConfigConsumer<TextProps>({
  prefixCls: 'text',
})(Text);
