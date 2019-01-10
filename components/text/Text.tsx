import * as React from 'react';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import omit from 'omit.js';
import { withConfigConsumer, ConfigConsumerProps } from '../config-provider';
import warning from '../_util/warning';
import Icon from '../icon';
import Tooltip from '../tooltip';
import Editable from './Editable';

export interface TextProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  editable?: boolean;
  onChange?: (value: string) => null;
}

interface TextState {
  edit: boolean;
}

class Text extends React.Component<TextProps & ConfigConsumerProps, TextState> {
  static getDerivedStateFromProps(nextProps: TextProps) {
    const { children, editable } = nextProps;

    warning(
      !editable || typeof children !== 'string',
      'When `editable` is enabled, the `children` of Text component should use string.',
    );

    return {};
  }

  state: TextState = {
    edit: false,
  };

  onEditClick = () => {
    this.setState({
      edit: true,
    });
  };

  onEditChange = (value: string) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }

    this.setState({
      edit: false,
    });
  };

  renderEdit() {
    const { editable, prefixCls } = this.props;
    if (!editable) return;

    return (
      <Tooltip title="edit">
        <Icon tabIndex={0} className={`${prefixCls}-edit`} type="edit" onClick={this.onEditClick} />
      </Tooltip>
    );
  }

  renderEditInput() {
    const { children } = this.props;
    return (
      <Editable value={typeof children === 'string' ? children : ''} onChange={this.onEditChange} />
    );
  }

  renderParagraph() {
    const { children, className, prefixCls, editable, ...restProps } = this.props;

    const textProps = omit(restProps, ['prefixCls', 'editable']);

    return (
      <p className={classNames(prefixCls, className)} {...textProps}>
        {children}
        {this.renderEdit()}
      </p>
    );
  }

  render() {
    const { edit } = this.state;

    if (edit) {
      return this.renderEditInput();
    }

    return this.renderParagraph();
  }
}

polyfill(Text);

export default withConfigConsumer<TextProps>({
  prefixCls: 'text',
})(Text);
