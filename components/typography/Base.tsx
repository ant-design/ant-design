import * as React from 'react';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import toArray from 'rc-util/lib/Children/toArray';
import copy from 'copy-to-clipboard';
import omit from 'omit.js';
import { withConfigConsumer, ConfigConsumerProps, configConsumerProps } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import warning from '../_util/warning';
import TransButton from '../_util/transButton';
import ResizeObserver from '../_util/resizeObserver';
import raf from '../_util/raf';
import Icon from '../icon';
import Tooltip from '../tooltip';
import Editable from './Editable';
import { measure } from './util';

export type BaseType = 'secondary' | 'danger' | 'warning';

export interface BaseProps {
  id?: string;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  editable?: boolean;
  extendable?: boolean; // Only works when ellipsis
  copyable?: boolean | string;
  onChange?: (value: string) => null;
  type?: BaseType;
  rows?: number;
  disabled?: boolean;

  // decorations
  code?: boolean;
  mark?: boolean;
  underline?: boolean;
  delete?: boolean;
  strong?: boolean;
}

function wrapperDecorations(
  { mark, code, underline, delete: del, strong }: BaseProps,
  content: React.ReactNode,
) {
  let currentContent = content;

  function wrap(needed: boolean | undefined, tag: string) {
    if (!needed) return;

    currentContent = React.createElement(tag, {
      children: currentContent,
    });
  }

  wrap(strong, 'strong');
  wrap(underline, 'u');
  wrap(del, 'del');
  wrap(code, 'code');
  wrap(mark, 'mark');

  return currentContent;
}

interface InternalBaseProps extends BaseProps {
  component: string;
}

interface BaseState {
  edit: boolean;
  copied: boolean;
  ellipsisText: string;
  ellipsisContent: React.ReactNode;
  isEllipsis: boolean;
  extended: boolean;
}

interface Locale {
  edit?: string;
  copy?: string;
  copySuccess?: string;
  extend?: string;
}

const ELLIPSIS_STR = '...';

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

  editIcon?: TransButton;
  content?: HTMLParagraphElement;
  copyId?: number;
  rafId?: number;
  // Locale
  extendStr?: string;
  copyStr?: string;
  copySuccessStr?: string;
  editStr?: string;

  state: BaseState = {
    edit: false,
    copied: false,
    ellipsisText: '',
    ellipsisContent: null,
    isEllipsis: false,
    extended: false,
  };

  componentDidMount() {
    this.resizeOnNextFrame();
  }

  componentDidUpdate(prevProps: BaseProps) {
    if (this.props.children !== prevProps.children || this.props.rows !== prevProps.rows) {
      this.resizeOnNextFrame();
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.copyId);
    raf.cancel(this.rafId);
  }

  // =============== Extend ===============
  onExtendClick = () => {
    this.setState({ extended: true });
  };

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
    const { children, copyable } = this.props;
    copy(typeof copyable === 'string' ? copyable : String(children));

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
  resizeOnNextFrame = () => {
    raf.cancel(this.rafId);
    this.rafId = raf(() => {
      // Do not bind `syncEllipsis`. It need for test usage on prototype
      this.syncEllipsis();
    });
  };

  syncEllipsis() {
    const { ellipsisText, isEllipsis, extended } = this.state;
    const { rows, children } = this.props;
    if (!rows || rows < 0 || !this.content || extended) return;

    warning(
      toArray(children).every((child: React.ReactNode) => typeof child === 'string'),
      '`ellipsis` for Typography should use string as children only.',
    );

    const { content, text, ellipsis } = measure(
      this.content,
      rows,
      children,
      this.renderOperations(),
      ELLIPSIS_STR,
    );
    if (ellipsisText !== text || isEllipsis !== ellipsis) {
      this.setState({ ellipsisText: text, ellipsisContent: content, isEllipsis: ellipsis });
    }
  }

  renderExtend() {
    const { extendable, prefixCls } = this.props;
    const { extended, isEllipsis } = this.state;
    if (!extendable || extended || !isEllipsis) return;

    return (
      <a className={`${prefixCls}-extend`} onClick={this.onExtendClick} aria-label={this.extendStr}>
        {this.extendStr}
      </a>
    );
  }

  renderEdit() {
    const { editable, prefixCls } = this.props;
    if (!editable) return;

    return (
      <Tooltip title={this.editStr}>
        <TransButton
          ref={this.setEditRef}
          className={`${prefixCls}-edit`}
          onClick={this.onEditClick}
          aria-label={this.editStr}
        >
          <Icon role="button" type="edit" />
        </TransButton>
      </Tooltip>
    );
  }

  renderCopy() {
    const { copied } = this.state;
    const { copyable, prefixCls } = this.props;
    if (!copyable) return;

    const title = copied ? this.copySuccessStr : this.copyStr;
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

  renderOperations() {
    return [this.renderExtend(), this.renderEdit(), this.renderCopy()].filter(node => node);
  }

  renderContent() {
    const { ellipsisContent, isEllipsis, extended } = this.state;
    const {
      component: Component,
      children,
      className,
      prefixCls,
      type,
      disabled,
      rows,
      ...restProps
    } = this.props;

    const textProps = omit(restProps, [
      'prefixCls',
      'editable',
      'copyable',
      'extendable',
      'mark',
      'underline',
      'mark',
      'code',
      'delete',
      'underline',
      'strong',
      ...configConsumerProps,
    ]);

    let textNode: React.ReactNode = children;

    if (rows && isEllipsis && !extended) {
      // We move full content to outer element to avoid repeat read the content by accessibility
      textNode = (
        <span title={String(children)} aria-hidden="true">
          {ellipsisContent}
          {ELLIPSIS_STR}
        </span>
      );
    }

    textNode = wrapperDecorations(this.props, textNode);

    return (
      <LocaleReceiver componentName="Text">
        {({ edit, copy: copyStr, copySuccess, extend }: Locale) => {
          this.editStr = edit;
          this.copyStr = copyStr;
          this.copySuccessStr = copySuccess;
          this.extendStr = extend;

          return (
            <ResizeObserver onResize={this.resizeOnNextFrame} disabled={!rows}>
              <Component
                className={classNames(prefixCls, className, {
                  [`${prefixCls}-${type}`]: type,
                  [`${prefixCls}-disabled`]: disabled,
                  [`${prefixCls}-ellipsis`]: rows,
                })}
                aria-label={isEllipsis ? String(children) : undefined}
                ref={this.setContentRef}
                {...textProps}
              >
                {textNode}
                {this.renderOperations()}
              </Component>
            </ResizeObserver>
          );
        }}
      </LocaleReceiver>
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
  prefixCls: 'typography',
})(Base);
