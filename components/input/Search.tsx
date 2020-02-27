import * as React from 'react';
import classNames from 'classnames';
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import Input, { InputProps } from './Input';
import Button from '../button';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface SearchProps extends InputProps {
  inputPrefixCls?: string;
  onSearch?: (
    value: string,
    event?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  enterButton?: React.ReactNode;
  loading?: boolean;
}

export default class Search extends React.Component<SearchProps, any> {
  static defaultProps = {
    enterButton: false,
  };

  private input: Input;

  saveInput = (node: Input) => {
    this.input = node;
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, onSearch } = this.props;
    if (e && e.target && e.type === 'click' && onSearch) {
      onSearch((e as React.ChangeEvent<HTMLInputElement>).target.value, e);
    }
    if (onChange) {
      onChange(e);
    }
  };

  onMouseDown: React.MouseEventHandler<HTMLElement> = e => {
    if (document.activeElement === this.input.input) {
      e.preventDefault();
    }
  };

  onSearch = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const { onSearch, loading, disabled } = this.props;
    if (loading || disabled) {
      return;
    }
    if (onSearch) {
      onSearch(this.input.input.value, e);
    }
  };

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  renderLoading = (prefixCls: string) => {
    const { enterButton, size } = this.props;

    if (enterButton) {
      return (
        <Button className={`${prefixCls}-button`} type="primary" size={size} key="enterButton">
          <LoadingOutlined />
        </Button>
      );
    }
    return <LoadingOutlined className={`${prefixCls}-icon`} key="loadingIcon" />;
  };

  renderSuffix = (prefixCls: string) => {
    const { suffix, enterButton, loading } = this.props;

    if (loading && !enterButton) {
      return [suffix, this.renderLoading(prefixCls)];
    }

    if (enterButton) return suffix;

    const icon = (
      <SearchOutlined className={`${prefixCls}-icon`} key="searchIcon" onClick={this.onSearch} />
    );

    if (suffix) {
      return [
        React.isValidElement(suffix)
          ? React.cloneElement(suffix, {
              key: 'suffix',
            })
          : null,
        icon,
      ];
    }

    return icon;
  };

  renderAddonAfter = (prefixCls: string) => {
    const { enterButton, size, disabled, addonAfter, loading } = this.props;
    const btnClassName = `${prefixCls}-button`;

    if (loading && enterButton) {
      return [this.renderLoading(prefixCls), addonAfter];
    }

    if (!enterButton) return addonAfter;

    let button: React.ReactNode;
    const enterButtonAsElement = enterButton as React.ReactElement<any>;
    const isAntdButton =
      enterButtonAsElement.type &&
      (enterButtonAsElement.type as typeof Button).__ANT_BUTTON === true;
    if (isAntdButton || enterButtonAsElement.type === 'button') {
      button = React.cloneElement(enterButtonAsElement, {
        onMouseDown: this.onMouseDown,
        onClick: this.onSearch,
        key: 'enterButton',
        ...(isAntdButton
          ? {
              className: btnClassName,
              size,
            }
          : {}),
      });
    } else {
      button = (
        <Button
          className={btnClassName}
          type="primary"
          size={size}
          disabled={disabled}
          key="enterButton"
          onMouseDown={this.onMouseDown}
          onClick={this.onSearch}
        >
          {enterButton === true ? <SearchOutlined /> : enterButton}
        </Button>
      );
    }

    if (addonAfter) {
      return [
        button,
        React.isValidElement(addonAfter)
          ? React.cloneElement(addonAfter, {
              key: 'addonAfter',
            })
          : null,
      ];
    }

    return button;
  };

  renderSearch = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      inputPrefixCls: customizeInputPrefixCls,
      size,
      enterButton,
      className,
      ...restProps
    } = this.props;

    delete (restProps as any).onSearch;
    delete (restProps as any).loading;

    const prefixCls = getPrefixCls('input-search', customizePrefixCls);
    const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);

    let inputClassName;

    if (enterButton) {
      inputClassName = classNames(prefixCls, className, {
        [`${prefixCls}-rtl`]: direction === 'rtl',
        [`${prefixCls}-enter-button`]: !!enterButton,
        [`${prefixCls}-${size}`]: !!size,
      });
    } else {
      inputClassName = classNames(prefixCls, className, {
        [`${prefixCls}-rtl`]: direction === 'rtl',
      });
    }

    return (
      <Input
        onPressEnter={this.onSearch}
        {...restProps}
        size={size}
        prefixCls={inputPrefixCls}
        addonAfter={this.renderAddonAfter(prefixCls)}
        suffix={this.renderSuffix(prefixCls)}
        onChange={this.onChange}
        ref={this.saveInput}
        className={inputClassName}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderSearch}</ConfigConsumer>;
  }
}
