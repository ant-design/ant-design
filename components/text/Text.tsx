import * as React from 'react';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import * as copy from 'copy-to-clipboard';
import omit from 'omit.js';
import { withConfigConsumer, ConfigConsumerProps, configConsumerProps } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
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
  copyable?: boolean;
  onChange?: (value: string) => null;
}

interface TextState {
  edit: boolean;
  copied: boolean;
}

interface Locale {
  edit?: string;
  copy?: string;
  copySuccess?: string;
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
  copyId?: number;

  state: TextState = {
    edit: false,
    copied: false,
  };

  componentWillUnmount() {
    window.clearTimeout(this.copyId);
  }

  // ================ Edit ================
  onEditClick = () => {
    this.startEdit();
  };

  onEditChange = (value: string) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }

    this.triggerEdit(false);
  };

  onEditCancel = () => {
    this.triggerEdit(false);
  };

  // ================ Copy ================
  onCopyClick = () => {
    const { children } = this.props;
    copy(String(children));

    this.setState({ copied: true }, () => {
      this.copyId = window.setTimeout(() => {
        this.setState({ copied: false });
      }, 3000);
    });
  };

  setEditRef = (node: TransButton) => {
    this.editIcon = node;
  };

  startEdit() {
    this.triggerEdit(true);
  }

  triggerEdit = (edit: boolean) => {
    this.setState({ edit }, () => {
      if (!edit && this.editIcon) {
        this.editIcon.focus();
      }
    });
  };

  renderEdit() {
    const { editable, prefixCls } = this.props;
    if (!editable) return;

    return (
      <LocaleReceiver componentName="Text">
        {({ edit }: Locale) => {
          return (
            <Tooltip title={edit}>
              <TransButton
                ref={this.setEditRef}
                className={`${prefixCls}-edit`}
                onClick={this.onEditClick}
                aria-label={edit}
              >
                <Icon role="button" type="edit" />
              </TransButton>
            </Tooltip>
          );
        }}
      </LocaleReceiver>
    );
  }

  renderCopy() {
    const { copied } = this.state;
    const { copyable, prefixCls } = this.props;
    if (!copyable) return;

    return (
      <LocaleReceiver componentName="Text">
        {({ copy: copyTxt, copySuccess }: Locale) => {
          const title = copied ? copySuccess : copyTxt;
          return (
            <Tooltip title={title}>
              <TransButton
                className={classNames(`${prefixCls}-copy`, copied && `${prefixCls}-copy-success`)}
                onClick={this.onCopyClick}
                aria-label={title}
              >
                <Icon role="button" type={copied ? 'check' : 'copy'} />
              </TransButton>
            </Tooltip>
          );
        }}
      </LocaleReceiver>
    );
  }

  renderEditInput() {
    const { children, prefixCls } = this.props;
    return (
      <Editable
        value={typeof children === 'string' ? children : ''}
        onChange={this.onEditChange}
        onCancel={this.onEditCancel}
        prefixCls={prefixCls}
      />
    );
  }

  renderParagraph() {
    const { children, className, prefixCls, ...restProps } = this.props;

    const textProps = omit(restProps, [
      'prefixCls',
      'editable',
      'copyable',
      ...configConsumerProps,
    ]);

    return (
      <p className={classNames(prefixCls, className)} {...textProps}>
        {children}
        {this.renderEdit()}
        {this.renderCopy()}
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
