import * as React from 'react';
import classNames from 'classnames';
import Input, { InputProps } from './Input';
import Icon from '../icon';
import Button from '../button';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface SearchProps extends InputProps {
  inputPrefixCls?: string;
  onSearch?: (
    value: string,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  enterButton?: boolean | React.ReactNode;
}

export default class Search extends React.Component<SearchProps, any> {
  static defaultProps = {
    enterButton: false,
  };

  private input: Input;

  saveInput = (node: Input) => {
    this.input = node;
  };

  onSearch = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const { onSearch } = this.props;
    if (onSearch) {
      onSearch(this.input.input.value, e);
    }
    this.input.focus();
  };

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  renderSuffix = (prefixCls: string) => {
    const { suffix, enterButton } = this.props;
    if (enterButton) return suffix;

    const node = (
      <Icon
        className={`${prefixCls}-icon`}
        type="search"
        key="searchIcon"
        onClick={this.onSearch}
      />
    );

    if (suffix) {
      let cloneSuffix = suffix;
      if (React.isValidElement(cloneSuffix) && !cloneSuffix.key) {
        cloneSuffix = React.cloneElement(cloneSuffix, {
          key: 'originSuffix',
        });
      }
      return [cloneSuffix, node];
    }

    return node;
  };

  renderAddonAfter = (prefixCls: string) => {
    const { enterButton, size, disabled, addonAfter } = this.props;
    if (!enterButton) return addonAfter;
    const btnClassName = `${prefixCls}-button`;

    let button: React.ReactNode;
    const enterButtonAsElement = enterButton as React.ReactElement<any>;
    if (enterButtonAsElement.type === Button || enterButtonAsElement.type === 'button') {
      button = React.cloneElement(enterButtonAsElement, {
        onClick: this.onSearch,
        key: 'enterButton',
        ...(enterButtonAsElement.type === Button
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
          onClick={this.onSearch}
        >
          {enterButton === true ? <Icon type="search" /> : enterButton}
        </Button>
      );
    }

    if (addonAfter) {
      return [button, addonAfter];
    }

    return button;
  };

  renderSearch = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      inputPrefixCls: customizeInputPrefixCls,
      size,
      enterButton,
      className,
      ...restProps
    } = this.props;

    delete (restProps as any).onSearch;

    const prefixCls = getPrefixCls('input-search', customizePrefixCls);
    const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);

    let inputClassName;

    if (enterButton) {
      inputClassName = classNames(prefixCls, className, {
        [`${prefixCls}-enter-button`]: !!enterButton,
        [`${prefixCls}-${size}`]: !!size,
      });
    } else {
      inputClassName = classNames(prefixCls, className);
    }

    return (
      <Input
        onPressEnter={this.onSearch}
        {...restProps}
        size={size}
        prefixCls={inputPrefixCls}
        addonAfter={this.renderAddonAfter(prefixCls)}
        suffix={this.renderSuffix(prefixCls)}
        ref={this.saveInput}
        className={inputClassName}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderSearch}</ConfigConsumer>;
  }
}
