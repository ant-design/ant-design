import * as React from 'react';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import omit from 'omit.js';
import { withConfigConsumer, ConfigConsumerProps, configConsumerProps } from '../config-provider';
import warning from '../_util/warning';
import TransButton from '../_util/transButton';
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
      !editable || typeof children === 'string',
      'When `editable` is enabled, the `children` of Text component should use string.',
    );

    return {};
  }

  editIcon?: TransButton;

  state: TextState = {
    edit: false,
  };

  onEditClick = () => {
    this.startEdit();
  };

  // onEditKeyDown = ({ keyCode }: React.KeyboardEvent) => {

  // }

  // onEditKeyUp = ({ keyCode }: React.KeyboardEvent) => {
  //   if (keyCode === KeyCode.ENTER) {
  //     this.startEdit();
  //   }
  // };

  onEditChange = (value: string) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }

    this.setState(
      {
        edit: false,
      },
      () => {
        if (this.editIcon) {
          this.editIcon.focus();
        }
      },
    );
  };

  setEditRef = (node: TransButton) => {
    this.editIcon = node;
  };

  startEdit() {
    this.setState({
      edit: true,
    });
  }

  renderEdit() {
    const { editable, prefixCls } = this.props;
    if (!editable) return;

    return (
      <Tooltip title="edit">
        <TransButton
          ref={this.setEditRef}
          className={`${prefixCls}-edit`}
          onClick={this.onEditClick}
        >
          <Icon role="button" type="edit" />
        </TransButton>
      </Tooltip>
    );
  }

  renderEditInput() {
    const { children, prefixCls } = this.props;
    return (
      <Editable
        value={typeof children === 'string' ? children : ''}
        onChange={this.onEditChange}
        prefixCls={prefixCls}
      />
    );
  }

  renderParagraph() {
    const { children, className, prefixCls, editable, ...restProps } = this.props;

    const textProps = omit(restProps, ['prefixCls', 'editable', ...configConsumerProps]);

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
