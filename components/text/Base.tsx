import * as React from 'react';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import * as copy from 'copy-to-clipboard';
import omit from 'omit.js';
import ResizeObserver from 'resize-observer-polyfill';
import { withConfigConsumer, ConfigConsumerProps, configConsumerProps } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import warning from '../_util/warning';
import TransButton from '../_util/transButton';
import raf from '../_util/raf';
import Icon from '../icon';
import Tooltip from '../tooltip';
import Editable from './Editable';
import { measure } from './util';

export type BaseType = 'secondary' | 'danger' | 'warning';

export interface BaseProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  editable?: boolean;
  copyable?: boolean;
  onChange?: (value: string) => null;
  type?: BaseType;
  disabled?: boolean;
  lines?: number;
}

interface InternalBaseProps extends BaseProps {
  component: string;
}

interface BaseState {
  edit: boolean;
  copied: boolean;
  ellipsisText: string;
  isEllipsis: boolean;
}

interface Locale {
  edit?: string;
  copy?: string;
  copySuccess?: string;
}

class Base extends React.Component<InternalBaseProps & ConfigConsumerProps, BaseState> {
  static defaultProps = {
    children: '',
  };

  static getDerivedStateFromProps(nextProps: BaseProps) {
    const { children, editable } = nextProps;

    warning(
      !editable || typeof children === 'string',
      'When `editable` is enabled, the `children` of Text component should use string.',
    );

    return {};
  }

  resizeObserver: ResizeObserver | null;
  editIcon?: TransButton;
  content?: HTMLParagraphElement;
  copyId?: number;
  rafId?: number;

  state: BaseState = {
    edit: false,
    copied: false,
    ellipsisText: '',
    isEllipsis: false,
  };

  componentDidMount() {
    this.resizeOnNextFrame();
    this.updateResizeObserverHook();
  }

  componentDidUpdate(prevProps: BaseProps) {
    if (this.props.children !== prevProps.children || this.props.lines !== prevProps.lines) {
      this.resizeOnNextFrame();
    }
    this.updateResizeObserverHook();
  }

  componentWillUnmount() {
    window.clearTimeout(this.copyId);
    raf.cancel(this.rafId);
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

  setContentRef = (node: HTMLParagraphElement) => {
    this.content = node;
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

  // ============== Ellipsis ==============
  updateResizeObserverHook() {
    const { lines } = this.props;
    if (!this.resizeObserver && lines && this.content) {
      // Add resize observer
      this.resizeObserver = new ResizeObserver(this.resizeOnNextFrame);
      this.resizeObserver.observe(this.content);
    } else if (this.resizeObserver && !lines) {
      // Remove resize observer
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  resizeOnNextFrame = () => {
    raf.cancel(this.rafId);
    this.rafId = raf(this.syncEllipsis);
  };

  syncEllipsis = () => {
    const { ellipsisText, isEllipsis } = this.state;
    const { lines, children, copyable, editable } = this.props;
    if (!lines || lines < 0 || !this.content) return;

    warning(typeof children === 'string', 'In ellipsis mode, `children` of Text must be a string.');

    let offset: number = 0;
    if (copyable) offset += 1;
    if (editable) offset += 1;

    const { text, ellipsis } = measure(String(children), lines, this.content, offset);
    if (ellipsisText !== text || isEllipsis !== ellipsis) {
      this.setState({ ellipsisText: text, isEllipsis: ellipsis });
    }
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
        {({ copy: copyText, copySuccess }: Locale) => {
          const title = copied ? copySuccess : copyText;
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

  renderContent() {
    const { ellipsisText, isEllipsis } = this.state;
    const {
      component: Component,
      children,
      className,
      prefixCls,
      type,
      disabled,
      lines,
      ...restProps
    } = this.props;

    const textProps = omit(restProps, [
      'prefixCls',
      'editable',
      'copyable',
      ...configConsumerProps,
    ]);

    let textNode: React.ReactNode = children;

    if (lines && isEllipsis) {
      // We move full content to outer element to avoid repeat read the content by accessibility
      textNode = (
        <span title={String(children)} aria-hidden="true">
          {ellipsisText}
        </span>
      );
    }

    return (
      <Component
        className={classNames(prefixCls, className, {
          [`${prefixCls}-${type}`]: type,
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-ellipsis`]: lines,
        })}
        aria-label={isEllipsis ? String(children) : undefined}
        ref={this.setContentRef}
        {...textProps}
      >
        {textNode}
        {this.renderEdit()}
        {this.renderCopy()}
      </Component>
    );
  }

  render() {
    const { edit } = this.state;

    if (edit) {
      return this.renderEditInput();
    }
    return this.renderContent();
  }
}

polyfill(Base);

export default withConfigConsumer<InternalBaseProps>({
  prefixCls: 'text',
})(Base);
